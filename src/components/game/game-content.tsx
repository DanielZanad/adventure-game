import { CommandInput } from "@/components/game/command-input"
import { HistoryLog } from "@/components/game/history-log"
import type { HistoryEntryData } from "@/components/game/types"

type GameContentProps = {
  historyEntries: HistoryEntryData[]
  commandPlaceholder: string
  commandSubmitLabel: string
  commandValue: string
  commandDisabled?: boolean
  onCommandChange: (value: string) => void
  onCommandSubmit: () => void
}

export function GameContent({
  historyEntries,
  commandPlaceholder,
  commandSubmitLabel,
  commandValue,
  commandDisabled,
  onCommandChange,
  onCommandSubmit,
}: GameContentProps) {
  return (
    <div className="flex flex-1 flex-col p-4 bg-zinc-950/50">
      <HistoryLog entries={historyEntries} />
      <CommandInput
        placeholder={commandPlaceholder}
        submitLabel={commandSubmitLabel}
        value={commandValue}
        disabled={commandDisabled}
        onChange={onCommandChange}
        onSubmit={onCommandSubmit}
      />
    </div>
  )
}
