import { Key, Scroll } from "lucide-react"
import { invoke } from "@tauri-apps/api/core"
import { useEffect, useMemo, useState } from "react"

import { GameContent } from "@/components/game/game-content"
import { GameShell } from "@/components/game/game-shell"
import { GameSidebar } from "@/components/game/game-sidebar"
import { IntroModal } from "@/components/game/intro-modal"
import type {
  BackendMapNode,
  CommandResponse,
  GameInitResponse,
  GameSnapshot,
  HistoryEntryData,
  InventoryItem,
  MapNodeData,
} from "@/components/game/types"

const inventoryIcons = {
  "Rusted Key": Key,
  "Torn Note": Scroll,
} as const

function toInventoryItems(snapshot: GameSnapshot | null): InventoryItem[] {
  if (!snapshot) {
    return []
  }

  return snapshot.inventory.map((label) => ({
    label,
    icon: inventoryIcons[label as keyof typeof inventoryIcons] ?? Scroll,
  }))
}

function toMapNodeData(node: BackendMapNode): MapNodeData {
  const variantMap = {
    Current: "current",
    Explored: "explored",
    Unexplored: "unexplored",
    Danger: "danger",
  } as const

  return {
    id: node.id,
    label: node.status === "Current" ? "You" : node.name,
    variant: variantMap[node.status],
    x: node.x,
    y: node.y,
  }
}

function App() {
  const [snapshot, setSnapshot] = useState<GameSnapshot | null>(null)
  const [historyEntries, setHistoryEntries] = useState<HistoryEntryData[]>([])
  const [commandValue, setCommandValue] = useState("")
  const [introText, setIntroText] = useState("")
  const [isIntroOpen, setIsIntroOpen] = useState(false)
  const [isBusy, setIsBusy] = useState(true)

  useEffect(() => {
    let isMounted = true

    const loadGame = async () => {
      try {
        const response = await invoke<GameInitResponse>("init_game")

        if (!isMounted) {
          return
        }

        setSnapshot(response.snapshot)
        setIntroText(response.intro_text)
        setIsIntroOpen(Boolean(response.intro_text))
      } catch {
        if (!isMounted) {
          return
        }

        setHistoryEntries([
          {
            result: "Failed to initialize the game session.",
            tone: "secondary",
          },
        ])
      } finally {
        if (isMounted) {
          setIsBusy(false)
        }
      }
    }

    void loadGame()

    return () => {
      isMounted = false
    }
  }, [])

  const inventoryItems = useMemo(() => toInventoryItems(snapshot), [snapshot])
  const mappedNodes = useMemo(
    () => snapshot?.map_nodes.map(toMapNodeData) ?? [],
    [snapshot]
  )

  const mapTopRow = mappedNodes
    .filter((node) => node.y === 0)
    .sort((left, right) => left.x - right.x)
  const mapBottomRow = mappedNodes
    .filter((node) => node.y === 1)
    .sort((left, right) => left.x - right.x)

  const handleCommandSubmit = async () => {
    const trimmedCommand = commandValue.trim()
    if (!trimmedCommand) {
      return
    }

    setIsBusy(true)

    try {
      const response = await invoke<CommandResponse>("submit_command", {
        input: trimmedCommand,
      })

      setSnapshot(response.snapshot)
      setHistoryEntries((currentEntries) => {
        const nextEntries: HistoryEntryData[] = [...currentEntries]

        response.messages.forEach((message, index) => {
          nextEntries.push({
            command: index === 0 ? trimmedCommand : undefined,
            result: message,
            tone: index === 0 ? "primary" : "secondary",
          })
        })

        return nextEntries
      })
      setCommandValue("")
    } catch {
      setHistoryEntries((currentEntries) => [
        ...currentEntries,
        {
          command: trimmedCommand,
          result: "The command could not be processed.",
          tone: "secondary",
        },
      ])
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <>
      <GameShell
        sidebar={
          <GameSidebar
            inventoryItems={inventoryItems}
            emptyInventorySlots={Math.max(0, 8 - inventoryItems.length)}
            inventoryWeightLabel={snapshot?.inventory_weight_label ?? "Weight: 0/8"}
            mapTopRow={mapTopRow}
            mapBottomRow={mapBottomRow}
            mapSectorLabel={
              snapshot
                ? `Sector: ${snapshot.current_room_name}`
                : "Sector: loading..."
            }
            mapStatusLabel={isBusy ? "[ Processing ]" : "[ Signal Stable ]"}
          />
        }
        content={
          <GameContent
            historyEntries={historyEntries}
            commandPlaceholder="What will you do?"
            commandSubmitLabel={isBusy ? "WAIT" : "EXECUTE"}
            commandValue={commandValue}
            commandDisabled={isBusy || !snapshot || isIntroOpen}
            onCommandChange={setCommandValue}
            onCommandSubmit={() => void handleCommandSubmit()}
          />
        }
      />
      <IntroModal
        isOpen={isIntroOpen}
        text={introText}
        onClose={() => setIsIntroOpen(false)}
      />
    </>
  )
}

export default App
