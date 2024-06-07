import { queryOptions } from "@tanstack/react-query"
import { millisecondsInSecond } from "date-fns/constants"
import type { CreatePost } from "../../../../common/types/post"
import { getPost, getPosts } from "../api/post"

export const postQueries = {
  all: () => ["posts"],
  lists: () => [...postQueries.all(), "list"],
  list: () =>
    queryOptions({
      queryKey: [...postQueries.lists()],
      queryFn: () => getPosts(),
    }),
  details: () => [...postQueries.all(), "detail"],
  detail: (id: number) =>
    queryOptions({
      queryKey: [...postQueries.details(), id],
      queryFn: () => getPost({ id }),
      staleTime: millisecondsInSecond * 20,
    }),
}

export const loadingCreatePostQueryOptions = queryOptions<{
  post?: CreatePost
}>({
  queryKey: ["create-post"],
  queryFn: async () => {
    return {}
  },
  staleTime: Number.POSITIVE_INFINITY,
})
