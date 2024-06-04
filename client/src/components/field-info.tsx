import type { FieldState } from "@tanstack/react-form"

function FieldInfo<T>({
  state,
}: {
  state: FieldState<T>
}) {
  return (
    <>
      {state.meta.touchedErrors ? (
        <p className="text-sm text-destructive">{state.meta.touchedErrors}</p>
      ) : null}
      {state.meta.isValidating ? "Validating..." : null}
    </>
  )
}

export default FieldInfo
