import { IconLoader2 } from "@tabler/icons-react"

function QuerySuspenseLoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <IconLoader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  )
}

export default QuerySuspenseLoadingFallback
