import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createGroup } from "@/lib/api/group"
import type { BaseComponentProps } from "@/lib/common/types"
import {
  groupQueries,
  loadingCreateGroupQueryOptions,
} from "@/lib/query/group-queries"
import {
  IconAlignJustified,
  IconLoader2,
  IconPlus,
  IconUsers,
  IconX,
} from "@tabler/icons-react"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { toast } from "sonner"
import { createGroupSchema } from "../../../../common/types/group"
import FieldInfo from "../field-info"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type CreateGroupModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
} & BaseComponentProps

const CreateGroupModal = ({ isOpen, onOpenChange }: CreateGroupModalProps) => {
  const queryClient = useQueryClient()

  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      name: "",
      description: "",
    },
    onSubmit: async ({ value }) => {
      const existingGroups = await queryClient.ensureQueryData(
        groupQueries.list(),
      )

      queryClient.setQueryData(loadingCreateGroupQueryOptions.queryKey, {
        group: value,
      })

      try {
        const newGroup = await createGroup({ value })

        queryClient.setQueryData(groupQueries.list().queryKey, {
          ...existingGroups,
          groups: [newGroup, ...existingGroups.groups],
        })

        toast.success("Group has been created")
        form.reset()
        onOpenChange(false)
      } catch (_e) {
        toast.error("Failed to create new group", {
          description: "Please try again",
        })
      } finally {
        queryClient.setQueryData(loadingCreateGroupQueryOptions.queryKey, {})
      }
    },
  })
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 p-0">
          <IconPlus className="h-4 w-4" />
          <span className="sr-only">Create group</span>
        </Button>
      </DialogTrigger>
      <DialogContent position="center" size="default" withCloseButton={false}>
        <DialogHeader>
          <div className="flex justify-between ">
            <DialogTitle>Create group</DialogTitle>
            <DialogClose asChild>
              <IconX className="cursor-pointer w-5 h-5 text-muted-foreground transition-opacity hover:opacity-70" />
            </DialogClose>
          </div>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.Field
            name="name"
            validators={{
              onChange: createGroupSchema.shape.name,
            }}
            children={({ state, name, handleBlur, handleChange }) => (
              <div className="grid grid-cols-8 items-center gap-4">
                <IconUsers className="w-5 h-5 text-muted-foreground" />
                <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
                  <Input
                    id={name}
                    name={name}
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Group name"
                  />
                  <FieldInfo state={state} />
                </div>
              </div>
            )}
          />
          <form.Field
            name="description"
            validators={{
              onChange: createGroupSchema.shape.description,
            }}
            children={({ state, name, handleBlur, handleChange }) => (
              <div className="grid grid-cols-8 items-center gap-4">
                <IconAlignJustified className="w-5 h-5 text-muted-foreground" />
                <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
                  <Input
                    id={name}
                    name={name}
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Group description"
                  />
                  <FieldInfo state={state} />
                </div>
              </div>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <DialogFooter>
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting && (
                    <IconLoader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Save changes
                </Button>
              </DialogFooter>
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroupModal
