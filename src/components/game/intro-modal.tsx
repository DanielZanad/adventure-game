import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

type IntroModalProps = {
  isOpen: boolean
  text: string
  onClose: () => void
}

export function IntroModal({ isOpen, text, onClose }: IntroModalProps) {
  const [visibleText, setVisibleText] = useState("")

  useEffect(() => {
    if (!isOpen) {
      setVisibleText("")
      return
    }

    let index = 0
    const intervalId = window.setInterval(() => {
      index += 1
      setVisibleText(text.slice(0, index))

      if (index >= text.length) {
        window.clearInterval(intervalId)
      }
    }, 24)

    return () => window.clearInterval(intervalId)
  }, [isOpen, text])

  if (!isOpen) {
    return null
  }

  const isComplete = visibleText.length >= text.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-2xl border-2 border-amber-500 bg-zinc-950 p-6 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        <div className="mb-4 border-b border-amber-500/30 pb-2 text-xl uppercase tracking-widest">
          Beginning
        </div>
        <div className="min-h-40 whitespace-pre-line text-sm leading-7 text-amber-300">
          {visibleText}
          {!isComplete && <span className="animate-pulse text-amber-500">|</span>}
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            disabled={!isComplete}
            className="bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold rounded-sm px-6"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
