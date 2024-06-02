import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  IconAlignJustified,
  IconClock,
  IconMapPin,
  IconPlus,
  IconUsers,
} from "@tabler/icons-react"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import EventDayPicker from "./event-day-picker"
import EventGroupCombobox from "./event-group-combobox"

const CreateEventModal = () => {
  return (
    <Dialog modal={false}>
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-8 items-center gap-4">
            <Input
              id="name"
              placeholder="Add title"
              className="col-span-7 col-start-2"
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <IconClock className="w-5 h-5 text-muted-foreground" />
            <div className="col-span-7 col-start-2">
              <EventDayPicker />
            </div>
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <IconMapPin className="w-5 h-5 text-muted-foreground" />
            <Input
              id="location"
              placeholder="Add location"
              className="col-span-7 col-start-2"
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <IconAlignJustified className="w-5 h-5 text-muted-foreground" />
            <Input
              id="description"
              placeholder="Add description"
              className="col-span-7 col-start-2"
            />
          </div>
          <div className="grid grid-cols-8 items-center gap-4">
            <IconUsers className="w-5 h-5 text-muted-foreground" />
            <EventGroupCombobox className="col-span-7 col-start-2" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateEventModal
