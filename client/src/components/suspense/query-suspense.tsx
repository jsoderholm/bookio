import { ErrorBoundary } from "@sentry/react"
import {
  QueryErrorResetBoundary,
  type UseSuspenseQueryOptions,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { Suspense } from "react"
import QuerySuspenseErrorFallback from "./query-suspense-error-fallback"
import QuerySuspenseLoadingFallback from "./query-suspense-loading-fallback"

interface QuerySuspenseProps<T> {
  query: UseSuspenseQueryOptions<T>
  children: (data: T) => React.ReactNode
  loader?: React.ReactNode
}

function InnerComponent<T>({ query, children }: QuerySuspenseProps<T>) {
  const { data } = useSuspenseQuery(query)
  return children(data)
}

function QuerySuspense<T>({ query, children, loader }: QuerySuspenseProps<T>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallback={({ resetError }) => (
            <QuerySuspenseErrorFallback retry={resetError} />
          )}
        >
          <Suspense
            fallback={loader ? loader : <QuerySuspenseLoadingFallback />}
          >
            <InnerComponent query={query}>{children}</InnerComponent>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default QuerySuspense
