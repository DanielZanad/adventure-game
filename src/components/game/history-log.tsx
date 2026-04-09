import { HistoryEntry } from "@/components/game/history-entry"
import type { HistoryEntryData } from "@/components/game/types"

type HistoryLogProps = {
  entries: HistoryEntryData[]
}

export function HistoryLog({ entries }: HistoryLogProps) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-amber-500/20">
      {entries.map((entry, index) => (
        <HistoryEntry key={`${entry.command}-${index}`} entry={entry} />
      ))}
    </div>
  )
}
