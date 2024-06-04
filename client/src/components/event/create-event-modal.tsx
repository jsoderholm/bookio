import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  createEvent,
  getAllEventsQueryOptions,
  loadingCreateEventQueryOptions,
} from "@/lib/api/event"
import { formatDateTimeRange } from "@/lib/utils"
import {
  IconAlignJustified,
  IconClock,
  IconLoader2,
  IconMapPin,
  IconPlus,
  IconUsers,
} from "@tabler/icons-react"
import { useForm } from "@tanstack/react-form"
import { useQueryClient } from "@tanstack/react-query"
import { zodValidator } from "@tanstack/zod-form-adapter"
import { toast } from "sonner"
import { createEventSchema } from "../../../../common/types/event"
import FieldInfo from "../field-info"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import EventDayPicker from "./event-day-picker"
import EventGroupCombobox from "./event-group-combobox"

interface CreateEventModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

const CreateEventModal = ({ isOpen, onOpenChange }: CreateEventModalProps) => {
  const queryClient = useQueryClient()
  const form = useForm({
    validatorAdapter: zodValidator,
    defaultValues: {
      name: "",
      description: "",
      location: "",
      dateRange: {
        from: new Date().toISOString(),
        to: new Date().toISOString(),
      },
    },
    onSubmit: async ({ value }) => {
      const existingEvents = await queryClient.ensureQueryData(
        getAllEventsQueryOptions,
      )

      // loading state
      queryClient.setQueryData(loadingCreateEventQueryOptions.queryKey, {
        event: value,
      })

      try {
        const newEvent = await createEvent({ value })

        queryClient.setQueryData(getAllEventsQueryOptions.queryKey, {
          ...existingEvents,
          events: [newEvent, ...existingEvents.events],
        })

        toast.success("Event has been created", {
          description: formatDateTimeRange(
            value.dateRange.from,
            value.dateRange.to,
          ),
        })

        form.reset()
        onOpenChange(false)
      } catch (_e) {
        toast.error("Failed to create new event", {
          description: "Please try again",
        })
      } finally {
        queryClient.setQueryData(loadingCreateEventQueryOptions.queryKey, {})
      }
    },
  })
  return (
    <Dialog modal={false} open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus className="w-4 h-4 mr-2" />
          <span>Add Event</span>
        </Button>
      </DialogTrigger>
      <DialogContent position="center" size="default">
        <DialogHeader>
          <DialogTitle>Add event</DialogTitle>
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
              onChange: createEventSchema.shape.name,
            }}
            children={({ state, name, handleBlur, handleChange }) => (
              <div className="grid grid-cols-8 items-center gap-4">
                <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
                  <Input
                    id={name}
                    name={name}
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Add title"
                  />
                  <FieldInfo state={state} />
                </div>
              </div>
            )}
          />
          <form.Field
            name="dateRange"
            validators={{ onChange: createEventSchema.shape.dateRange }}
            children={(field) => (
              <div className="grid grid-cols-8 items-center gap-4">
                <IconClock className="w-5 h-5 text-muted-foreground" />
                <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
                  <EventDayPicker field={field} />
                  <FieldInfo state={field.state} />
                </div>
              </div>
            )}
          />
          <form.Field
            name="description"
            validators={{ onChange: createEventSchema.shape.description }}
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
                    placeholder="Add description"
                  />
                  <FieldInfo state={state} />
                </div>
              </div>
            )}
          />
          <form.Field
            name="location"
            validators={{ onChange: createEventSchema.shape.location }}
            children={({ state, name, handleBlur, handleChange }) => (
              <div className="grid grid-cols-8 items-center gap-4">
                <IconMapPin className="w-5 h-5 text-muted-foreground" />
                <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
                  <Input
                    id={name}
                    name={name}
                    value={state.value}
                    onBlur={handleBlur}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Add location"
                    className="col-span-7 col-start-2"
                  />
                  <FieldInfo state={state} />
                </div>
              </div>
            )}
          />
          <div className="grid grid-cols-8 items-center gap-4">
            <IconUsers className="w-5 h-5 text-muted-foreground" />
            <EventGroupCombobox className="col-span-7 col-start-2" />
          </div>
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

export default CreateEventModal
