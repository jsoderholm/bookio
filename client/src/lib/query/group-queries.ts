import { queryOptions } from "@tanstack/react-query"
import { millisecondsInSecond } from "date-fns/constants"
import type { CreateGroup } from "../../../../common/types/group"
import { getGroup, getGroups } from "../api/group"

export const groupQueries = {
  all: () => ["groups"],
  lists: () => [...groupQueries.all(), "list"],
  list: () => ({
    queryKey: [...groupQueries.lists()],
    queryFn: () => getGroups(),
  }),
  details: () => [...groupQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...groupQueries.details(), id],
      queryFn: () => getGroup({ id }),
      staleTime: millisecondsInSecond * 20,
    }),
}

export const loadingCreateGroupQueryOptions = queryOptions<{
  group?: CreateGroup
}>({
  queryKey: ["create-group"],
  queryFn: async () => {
    return {}
  },
  staleTime: Number.POSITIVE_INFINITY,
})
