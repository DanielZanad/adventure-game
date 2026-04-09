import { Skull } from "lucide-react"

import { cn } from "@/lib/utils"

type MapRoomNodeProps = {
  label?: string
  variant: "unexplored" | "explored" | "danger" | "current"
}

export function MapRoomNode({ label, variant }: MapRoomNodeProps) {
  if (variant === "danger") {
    return (
      <div className="w-16 h-12 border border-red-500/50 flex items-center justify-center text-red-500">
        <Skull size={20} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "w-16 h-12 flex items-center justify-center",
        variant === "unexplored" && "border border-zinc-700",
        variant === "explored" &&
          "border border-amber-500/50 bg-zinc-900",
        variant === "current" &&
          "border-2 border-amber-400 bg-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.4)] animate-pulse"
      )}
    >
      {variant === "unexplored" && <span className="text-zinc-700">?</span>}
      {variant === "explored" && <span className="text-xs">{label}</span>}
      {variant === "current" && (
        <span className="text-xs font-bold text-amber-300">{label ?? "You"}</span>
      )}
    </div>
  )
}
