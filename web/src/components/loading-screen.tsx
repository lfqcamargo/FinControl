import { Loader2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold">Carregando...</h2>
          <p className="text-sm text-muted-foreground">
            Verificando autenticação
          </p>
        </div>
      </div>
    </div>
  )
}
