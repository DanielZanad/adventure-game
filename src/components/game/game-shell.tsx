import type { ReactNode } from "react"

type GameShellProps = {
  sidebar: ReactNode
  content: ReactNode
}

export function GameShell({ sidebar, content }: GameShellProps) {
  return (
    <div className="h-screen flex justify-center items-center bg-zinc-950 text-amber-500 font-mono">
      <div className="w-3/4 h-3/4 flex flex-col justify-center">
        <div className="w-full h-full flex border-2 border-amber-500 bg-black shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          {sidebar}
          {content}
        </div>
      </div>
    </div>
  )
}
