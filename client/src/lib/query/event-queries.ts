import { queryOptions } from "@tanstack/react-query"
import { millisecondsInSecond } from "date-fns/constants"
import { getAllEvents, getEvent } from "../api/event"

export const eventQueries = {
  all: () => ["events"],
  lists: () => [...eventQueries.all(), "list"],
  list: (from: string) =>
    queryOptions({
      queryKey: [...eventQueries.lists(), from],
      queryFn: () => getAllEvents({ from }),
    }),
  details: () => [...eventQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...eventQueries.details(), id],
      queryFn: () => getEvent({ id }),
      staleTime: millisecondsInSecond * 20,
    }),
}
