interface ErrorProps {
  error: string | undefined
}

export function InputError({ error }: ErrorProps) {
  return (
    <p className="min-h-[10px] pl-1 mb-2 text-[10px] text-destructive">
      {error ?? '\u00A0'}
    </p>
  )
}
