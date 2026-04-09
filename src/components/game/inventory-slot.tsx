import type { InventoryItem } from "@/components/game/types"

type InventorySlotProps = {
  item?: InventoryItem
}

export function InventorySlot({ item }: InventorySlotProps) {
  if (!item) {
    return (
      <div className="aspect-square border border-zinc-800 bg-zinc-950 flex items-center justify-center opacity-50">
        <span className="text-zinc-700 text-xs">- empty -</span>
      </div>
    )
  }

  const Icon = item.icon

  return (
    <div className="aspect-square flex flex-col items-center justify-center border border-amber-500/40 bg-zinc-900 hover:bg-amber-500/10 cursor-pointer transition-colors">
      <Icon size={28} className="mb-1" />
      <span className="text-[10px] uppercase">{item.label}</span>
    </div>
  )
}
