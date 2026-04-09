import type { InventoryItem, MapNodeData } from "@/components/game/types"
import { InventoryDialog } from "@/components/game/inventory-dialog"
import { MapDialog } from "@/components/game/map-dialog"

type GameSidebarProps = {
  inventoryItems: InventoryItem[]
  emptyInventorySlots: number
  inventoryWeightLabel: string
  mapTopRow: MapNodeData[]
  mapBottomRow: MapNodeData[]
  mapSectorLabel: string
  mapStatusLabel: string
}

export function GameSidebar({
  inventoryItems,
  emptyInventorySlots,
  inventoryWeightLabel,
  mapTopRow,
  mapBottomRow,
  mapSectorLabel,
  mapStatusLabel,
}: GameSidebarProps) {
  return (
    <div className="w-16 h-full flex flex-col p-2 space-y-4 border-r-2 border-amber-500/50 bg-zinc-900/50">
      <InventoryDialog
        items={inventoryItems}
        emptySlots={emptyInventorySlots}
        weightLabel={inventoryWeightLabel}
      />
      <MapDialog
        topRow={mapTopRow}
        bottomRow={mapBottomRow}
        sectorLabel={mapSectorLabel}
        statusLabel={mapStatusLabel}
      />
    </div>
  )
}
