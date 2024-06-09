import CreatePostForm from "@/components/groups/create-post-form"
import GroupsSidebar from "@/components/groups/groups-sidebar"
import Post, { PostSkeleton } from "@/components/groups/post"
import { groupQueries } from "@/lib/query/group-queries"
import {
  loadingCreatePostQueryOptions,
  postQueries,
} from "@/lib/query/post-queries"
import { useQuery } from "@tanstack/react-query"

import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_authenticated/groups")({
  component: Component,
})

function Component() {
  const { data, isPending, error } = useQuery(postQueries.list())
  const { data: loadingCreatePost } = useQuery(loadingCreatePostQueryOptions)
  const { data: groups } = useQuery(groupQueries.list())

  if (error) return `An error occurred: ${error.message}`
  return (
    <div className="flex h-full">
      <GroupsSidebar />
      <div className="flex-1 gap-4 p-4">
        <CreatePostForm />
        {loadingCreatePost?.post && <PostSkeleton />}
        {isPending
          ? Array.from({ length: 5 }, (_, i) => i + 1).map((e) => (
              <PostSkeleton key={e} />
            ))
          : data.posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </div>
  )
}
