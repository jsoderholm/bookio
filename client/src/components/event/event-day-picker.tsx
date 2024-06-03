import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { FieldApi } from "@tanstack/react-form"
import { format } from "date-fns"
import type { CreateEvent } from "../../../../common/types/event"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
interface EventDayPickerProps {
  field: Pick<
    FieldApi<CreateEvent, "dateRange">,
    "name" | "handleChange" | "state" | "handleBlur"
  >
}

const EventDayPicker = ({ field }: EventDayPickerProps) => {
  const { from, to } = field.state.value

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !field.state.value && "text-muted-foreground",
          )}
        >
          {from ? (
            to ? (
              <>
                {format(from, "LLL dd, y")} - {format(to, "LLL dd, y")}
              </>
            ) : (
              format(from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          id={field.name}
          onDayBlur={field.handleBlur}
          defaultMonth={new Date(field.state.value.from)}
          selected={{
            from: new Date(field.state.value.from),
            to: new Date(field.state.value.to),
          }}
          onSelect={(dateRange) => {
            field.handleChange({
              from: (dateRange?.from ?? new Date()).toISOString(),
              to: (dateRange?.to ?? new Date()).toISOString(),
            })
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EventDayPicker
