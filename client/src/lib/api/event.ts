import { queryOptions } from "@tanstack/react-query"
import type { CreateEvent } from "../../../../common/types/event"
import { api } from "./api"

export async function getAllEvents() {
  const res = await api.events.$get()
  if (!res.ok) {
    throw new Error("server error")
  }

  const events = await res.json()

  return events
}

export const getAllEventsQueryOptions = queryOptions({
  queryKey: ["get-all-events"],
  queryFn: getAllEvents,
  staleTime: 1000 * 60 * 5,
})

export async function createEvent({ value }: { value: CreateEvent }) {
  const res = await api.events.$post({ json: value })
  if (!res.ok) {
    throw new Error("server error")
  }

  const newEvent = await res.json()
  return newEvent
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

export async function deleteEvent({ id }: { id: number }) {
  const res = await api.events[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error("server error")
  }
}
