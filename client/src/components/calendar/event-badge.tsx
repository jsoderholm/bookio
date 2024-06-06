import { formatDateTimeRange } from "@/lib/utils"
import {
  IconAlignJustified,
  IconDotsVertical,
  IconMapPin,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react"
import type { CalendarEvent } from "../../../../common/types/event"
import { Badge } from "../ui/badge"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"
import { Separator } from "../ui/separator"

interface EventBadgeProps {
  event: CalendarEvent
}

const EventBadge = ({ event }: EventBadgeProps) => {
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Badge
          variant="eventBadge"
          className="flex h-6 gap-x-2 items-center cursor-pointer"
        >
          <Separator
            orientation="vertical"
            className="bg-primary w-1 rounded-sm h-full"
          />
          <p className="text-black">{event.name}</p>
        </Badge>
      </DialogTrigger>
      <DialogContent position="center" size="default" withCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-end gap-x-3">
            <IconPencil className="w-5 h-5 text-muted-foreground transition-opacity hover:opacity-70 cursor-pointer" />
            <IconTrash className="w-5 h-5 text-muted-foreground transition-opacity hover:opacity-70 cursor-pointer" />
            <IconDotsVertical className="w-5 h-5 text-muted-foreground transition-opacity hover:opacity-70 cursor-pointer" />
            <DialogClose asChild>
              <IconX className="cursor-pointer w-5 h-5 text-muted-foreground transition-opacity hover:opacity-70" />
            </DialogClose>
          </div>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-8 items-center gap-4">
            <div className="bg-primary w-4 h-4 rounded-sm " />
            <div className="col-span-6 col-start-2 flex flex-col gap-y-1">
              <h2 className="text-2xl trailing-none">{event.name}</h2>
            </div>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <div className="col-span-6 col-start-2 flex flex-col ">
              <p className="text-sm">
                {formatDateTimeRange(
                  new Date(event.startDate).toISOString(),
                  new Date(event.endDate).toISOString(),
                )}
              </p>
            </div>
          </div>
          {event.description && (
            <div className="grid grid-cols-8 items-center gap-4">
              <IconAlignJustified className="w-5 h-5 text-muted-foreground" />
              <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
                <p className="text-sm">{event.description}</p>
              </div>
            </div>
          )}
          {event.location && (
            <div className="grid grid-cols-8 items-center gap-4">
              <IconMapPin className="w-5 h-5 text-muted-foreground" />
              <div className="col-span-7 col-start-2 flex flex-col gap-y-1">
                <p className="text-sm">{event.location}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EventBadge
