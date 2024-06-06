import { Badge } from "@/components/ui/badge"
import { cn, getCalendarCellMonthStyling, getCurrentMonth } from "@/lib/utils"
import type { EventFilter } from "@/stores/event-filter-store"
import { isSameMonth, isToday } from "date-fns"
import type { CalendarEvent } from "../../../../../common/types/event"
import EventBadge from "../event-badge"

interface CalendarCellMonthProps {
  filters: EventFilter
  cellDate: Date
  events?: CalendarEvent[]
}

const CalendarCellMonth = ({
  filters,
  cellDate,
  events,
}: CalendarCellMonthProps) => {
  const { firstDay } = filters
  const currentMonth = getCurrentMonth(firstDay)
  const cellDateIsToday = isToday(cellDate)
  const notInActiveMonth = !isSameMonth(cellDate, currentMonth)

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-2 bg-neutral dark:bg-background",
        getCalendarCellMonthStyling(filters, cellDate),
      )}
    >
      <Badge
        variant={cellDateIsToday ? "default" : "transparent"}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          cellDateIsToday && "text-white",
        )}
      >
        <p
          className={cn(
            notInActiveMonth && "text-muted-foreground font-normal",
          )}
        >
          {cellDate.getDate()}
        </p>
      </Badge>
      {events && events.length > 0 && (
        <div className="flex flex-col w-full gap-y-1">
          {events.map((event) => (
            <EventBadge key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CalendarCellMonth
