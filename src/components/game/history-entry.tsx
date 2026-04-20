import { useEffect, useMemo, useState } from "react"

import type { HistoryEntryData } from "@/components/game/types"

type HistoryEntryProps = {
  entry: HistoryEntryData
}

export function HistoryEntry({ entry }: HistoryEntryProps) {
  const [visibleText, setVisibleText] = useState(entry.animate ? "" : entry.result)

  const shouldAnimate = Boolean(entry.animate && entry.result.length > 0)
  const animationDelay = useMemo(() => {
    if (entry.animationDelayMs !== undefined) {
      return entry.animationDelayMs
    }

    if (!entry.command) {
      return 0
    }

    const estimatedDuration = entry.command.length * 24 + 120
    return Math.min(650, estimatedDuration)
  }, [entry.animationDelayMs, entry.command])

  useEffect(() => {
    if (!shouldAnimate) {
      setVisibleText(entry.result)
      return
    }

    let index = 0
    setVisibleText("")

    const timeoutId = window.setTimeout(() => {
      const intervalId = window.setInterval(() => {
        index += 1
        setVisibleText(entry.result.slice(0, index))

        if (index >= entry.result.length) {
          window.clearInterval(intervalId)
        }
      }, 24)

      return () => window.clearInterval(intervalId)
    }, animationDelay)

    return () => window.clearTimeout(timeoutId)
  }, [animationDelay, entry.result, shouldAnimate])

  const toneClass =
    entry.tone === "secondary" ? "text-amber-400" : "text-amber-500/70"
  const isComplete = visibleText.length >= entry.result.length

  return (
    <div className={toneClass}>
      {entry.command && (
        <span className="text-amber-600 font-bold">{">"} {entry.command}</span>
      )}
      <p className="mt-1">
        {visibleText}
        {shouldAnimate && !isComplete && (
          <span className="animate-pulse text-amber-500">|</span>
        )}
      </p>
    </div>
  )
}
