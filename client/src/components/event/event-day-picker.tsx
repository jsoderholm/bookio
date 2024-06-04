import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn, formatDateTimeRange } from "@/lib/utils"
import type { FieldApi } from "@tanstack/react-form"
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
  const { state, name, handleChange, handleBlur } = field

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !state.value && "text-muted-foreground",
          )}
        >
          {formatDateTimeRange(state.value.from, state.value.to)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          id={name}
          onDayBlur={handleBlur}
          defaultMonth={new Date(state.value.from)}
          selected={{
            from: new Date(state.value.from),
            to: new Date(state.value.to),
          }}
          onSelect={(dateRange, day) => {
            const { from, to } = dateRange ?? {}
            const fromDate = from ? from : day
            const toDate = to ? to : day

            handleChange({
              from: fromDate.toISOString(),
              to: toDate.toISOString(),
            })
          }}
          numberOfMonths={2}
          min={0}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EventDayPicker
