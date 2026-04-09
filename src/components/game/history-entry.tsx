import type { HistoryEntryData } from "@/components/game/types"

type HistoryEntryProps = {
  entry: HistoryEntryData
}

export function HistoryEntry({ entry }: HistoryEntryProps) {
  const toneClass =
    entry.tone === "secondary" ? "text-amber-400" : "text-amber-500/70"

  return (
    <div className={toneClass}>
      {entry.command && (
        <span className="text-amber-600 font-bold">{">"} {entry.command}</span>
      )}
      <p className="mt-1">{entry.result}</p>
    </div>
  )
}
