import {
  type EventFilter,
  useAppliedEventFilters,
} from "@/stores/event-filter-store"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { millisecondsInSecond } from "date-fns/constants"
import type { CreateEvent } from "../../../../common/types/event"
import { getAllEvents, getEvent } from "../api/event"

export const eventQueries = {
  all: () => ["events"],
  lists: () => [...eventQueries.all(), "list"],
  list: (filters: EventFilter) => ({
    queryKey: [...eventQueries.lists(), filters],
    queryFn: () => getAllEvents({ filters }),
  }),
  details: () => [...eventQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...eventQueries.details(), id],
      queryFn: () => getEvent({ id }),
      staleTime: millisecondsInSecond * 20,
    }),
}

export const useFilteredEvents = () => {
  const applied = useAppliedEventFilters()
  return useSuspenseQuery(eventQueries.list(applied))
}

export const loadingCreateEventQueryOptions = queryOptions<{
  event?: CreateEvent
}>({
  queryKey: ["create-event"],
  queryFn: async () => {
    return {}
  },
  staleTime: Number.POSITIVE_INFINITY,
})
