import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface ErrorMessageProps {
  title: string
  description: string
  actionText?: string
  actionHref?: string
  onAction?: () => void
}

export function ErrorMessage({ title, description, actionText, actionHref, onAction }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-4">{description}</p>
      {actionText && (actionHref || onAction) && (
        <Button
          onClick={onAction}
          {...(actionHref && !onAction ? { asChild: true } : {})}
        >
          {actionHref && !onAction ? <Link href={actionHref}>{actionText}</Link> : actionText}
        </Button>
      )}
    </div>
  )
}

