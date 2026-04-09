import { Map as MapIcon } from "lucide-react"

import type { MapNodeData } from "@/components/game/types"
import { MapRoomNode } from "@/components/game/map-room-node"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type MapDialogProps = {
  topRow: MapNodeData[]
  bottomRow: MapNodeData[]
  sectorLabel: string
  statusLabel: string
}

export function MapDialog({
  topRow,
  bottomRow,
  sectorLabel,
  statusLabel,
}: MapDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-12 border-amber-500/50 text-amber-500 hover:bg-amber-500/20 hover:text-amber-400 cursor-pointer"
        >
          <MapIcon size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-950 border-2 border-amber-500 text-amber-500 font-mono sm:max-w-lg shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        <DialogHeader>
          <DialogTitle className="text-xl uppercase tracking-widest border-b border-amber-500/30 pb-2">
            Local Map
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="flex items-center space-x-4">
            {topRow[0] && <MapRoomNode {...topRow[0]} />}
            <div className="w-8 h-px bg-zinc-700" />
            {topRow[1] && <MapRoomNode {...topRow[1]} />}
            <div className="w-8 h-px bg-amber-500/50" />
            {topRow[2] && <MapRoomNode {...topRow[2]} />}
          </div>

          <div className="flex space-x-12 pr-24">
            <div className="w-px h-8 bg-zinc-700" />
            <div className="w-px h-8 bg-amber-500/50" />
          </div>

          <div className="flex items-center space-x-4">
            {bottomRow[0] && <MapRoomNode {...bottomRow[0]} />}
            <div className="w-8 h-px bg-zinc-700" />
            {bottomRow[1] && <MapRoomNode {...bottomRow[1]} />}
          </div>
        </div>

        <div className="text-xs text-amber-500/60 mt-2 flex justify-between">
          <span>{sectorLabel}</span>
          <span>{statusLabel}</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
