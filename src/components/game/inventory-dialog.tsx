import { ShelvingUnit } from "lucide-react"

import { InventorySlot } from "@/components/game/inventory-slot"
import type { InventoryItem } from "@/components/game/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type InventoryDialogProps = {
  items: InventoryItem[]
  emptySlots: number
  weightLabel: string
}

export function InventoryDialog({
  items,
  emptySlots,
  weightLabel,
}: InventoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-12 border-amber-500/50 text-amber-500 hover:bg-amber-500/20 hover:text-amber-400 cursor-pointer"
        >
          <ShelvingUnit size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-2 border-amber-500 text-amber-500 font-mono sm:max-w-md shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-xl uppercase tracking-widest border-b border-amber-500/30 pb-2">
            Inventory
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-3 py-4">
          {items.map((item) => (
            <InventorySlot key={item.label} item={item} />
          ))}
          {Array.from({ length: emptySlots }).map((_, index) => (
            <InventorySlot key={`empty-${index}`} />
          ))}
        </div>
        <div className="text-xs text-amber-500/60 mt-2">{weightLabel}</div>
      </DialogContent>
    </Dialog>
  )
}
