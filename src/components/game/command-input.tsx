import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CommandInputProps = {
  placeholder: string
  submitLabel: string
  value: string
  disabled?: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}

export function CommandInput({
  placeholder,
  submitLabel,
  value,
  disabled = false,
  onChange,
  onSubmit,
}: CommandInputProps) {
  return (
    <div className="flex w-full mt-auto pt-4 border-t border-amber-500/30">
      <form
        className="flex w-full items-center space-x-2"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
      >
        <span className="text-amber-500 font-bold text-xl">{">"}</span>
        <Input
          className="flex-1 bg-transparent border-none text-amber-400 placeholder:text-amber-500/30 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg rounded-none"
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          autoFocus
        />
        <Button
          type="submit"
          disabled={disabled}
          className="bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold rounded-sm px-6"
        >
          {submitLabel}
        </Button>
      </form>
    </div>
  )
}
