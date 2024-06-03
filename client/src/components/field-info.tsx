import type { FieldApi } from "@tanstack/react-form"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.touchedErrors ? (
        <p className="text-sm text-destructive">
          {field.state.meta.touchedErrors}
        </p>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  )
}

export default FieldInfo
