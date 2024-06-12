import type { EventFilter } from "@/stores/event-filter-store"
import type { CreateEvent } from "../../../../common/types/event"
import { api } from "./api"

export async function getAllEvents({ filters }: { filters: EventFilter }) {
  const res = await api.events[":from"].$get({
    param: { from: filters.firstDay.toISOString() },
  })

  if (!res.ok) {
    throw new Error("server error")
  }

  const events = await res.json()
  return events
}

export async function getEvent({ id }: { id: number }) {
  const res = await api.events[":id{[0-9]+}"].$get({
    param: { id: id.toString() },
  })
  if (!res.ok) {
    throw new Error("server error")
  }

  const event = await res.json()
  return event
}

export async function createEvent({ value }: { value: CreateEvent }) {
  const res = await api.events.$post({ json: value })
  if (!res.ok) {
    throw new Error("server error")
  }

  const newEvent = await res.json()
  return newEvent
}

export async function deleteEvent({ id }: { id: number }) {
  const res = await api.events[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error("server error")
  }
}
