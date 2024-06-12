import type { Post } from "../../../../common/types/post"
import { Avatar } from "../ui/avatar"
import { Skeleton } from "../ui/skeleton"

type PostProps = {
  post: Post
}

const PostComponent = ({ post }: PostProps) => {
  return (
    <div className="grid grid-cols-8 p-6">
      <div className="flex justify-center">
        <Avatar className="w-10 h-10 bg-blue-100" />
      </div>
      <div className="col-span-7 col-start-2 items-start justify-center flex flex-col gap-y-1">
        <p className=" font-medium ">{post.authorId}</p>
      </div>
      <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
        <p className="text-sm text-muted-foreground">{post.text}</p>
      </div>
    </div>
  )
}

export const PostSkeleton = () => {
  return (
    <div className="grid grid-cols-8 p-6">
      <div className="flex justify-center">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
      <div className="col-span-7 col-start-2 items-start justify-center flex flex-col gap-y-1">
        <Skeleton className="w-1/3 h-5" />
      </div>
      <div className="col-span-7 col-start-2 flex flex-col gap-y-2">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-4/5 h-3" />
      </div>
    </div>
  )
}

export default PostComponent
