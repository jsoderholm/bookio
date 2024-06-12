import { Button } from "../ui/button"

interface QuerySuspenseErrorFallbackProps {
  retry: () => void
}

function QuerySuspenseErrorFallback({
  retry,
}: QuerySuspenseErrorFallbackProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col gap-y-4">
        <p className="text-xl text-muted-foreground text-center">
          Something went wrong...
        </p>
        <Button onClick={() => retry()}>Retry</Button>
      </div>
    </div>
  )
}

export default QuerySuspenseErrorFallback
