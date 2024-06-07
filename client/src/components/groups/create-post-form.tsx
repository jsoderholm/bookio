import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createPost } from "@/lib/api/post"
import {
  loadingCreatePostQueryOptions,
  postQueries,
} from "@/lib/query/post-queries"
import { IconChartBar, IconLoader2, IconPhotoPlus } from "@tabler/icons-react"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { toast } from "sonner"
import { createPostSchema } from "../../../../common/types/post"

const CreatePostForm = () => {
  const queryClient = useQueryClient()

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      text: "",
    },
    onSubmit: async ({ value }) => {
      const existingPosts = await queryClient.ensureQueryData(
        postQueries.list(),
      )

      queryClient.setQueryData(loadingCreatePostQueryOptions.queryKey, {
        post: value,
      })

      try {
        const newPost = await createPost({ value })

        queryClient.setQueryData(postQueries.list().queryKey, {
          ...existingPosts,
          posts: [newPost, ...existingPosts.posts],
        })

        toast.success("Post has been created")
        form.reset()
      } catch (_e) {
      } finally {
        queryClient.setQueryData(loadingCreatePostQueryOptions.queryKey, {})
      }
    },
  })
  return (
    <form
      className="grid grid-cols-8 gap-4 p-6 border rounded-md mt-8"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="text"
        validators={{
          onChange: createPostSchema.shape.text,
        }}
        children={({ state, name, handleBlur, handleChange }) => (
          <div className="grid grid-cols-8 col-span-8">
            <div className="flex justify-center">
              <Avatar className="w-10 h-10 bg-blue-100" />
            </div>
            <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
              <Textarea
                id={name}
                name={name}
                value={state.value}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="What do you want to say?"
                className="col-span-7 col-start-2"
              />
            </div>
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <div className="col-span-7 col-start-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <IconPhotoPlus className="w-5 h-5 text-muted-foreground cursor-pointer transition-opacity hover:opacity-70" />
                <IconChartBar className="w-5 h-5 text-muted-foreground cursor-pointer transition-opacity hover:opacity-70" />
              </div>
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting && (
                  <IconLoader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Create post
              </Button>
            </div>
          </div>
        )}
      />
    </form>
  )
}

export default CreatePostForm
