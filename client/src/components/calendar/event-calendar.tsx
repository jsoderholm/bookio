import type { BaseComponentProps } from "@/lib/common/types"
import { useFilteredEvents } from "@/lib/query/event-queries"
import { cn, getDaysOnPage } from "@/lib/utils"
import { useAppliedEventFilters } from "@/stores/event-filter-store"
import { IconLoader2 } from "@tabler/icons-react"
import { toast } from "sonner"
import type { CalendarEvent } from "../../../../common/types/event"
import CalendarCellMonth from "./month/calendar-cell-month"

type EventCalendarProps = {} & BaseComponentProps

const EventCalendar = (props: EventCalendarProps) => {
  const filters = useAppliedEventFilters()
  const days = getDaysOnPage(filters)
  const eventsMap = new Map<string, CalendarEvent[]>(Object.entries(days))

  const { data, error } = useFilteredEvents()

  if (data) {
    data.events.forEach((event) => {
      const date = new Date(event.startDate)
      const events = eventsMap.get(date.toISOString())
      if (events) {
        events.push(event)
      }
    })
    return (
      <div className="h-full flex flex-col">
        <div className="grid grid-cols-7 font-medium border-t border-r border-l rounded-t-lg">
          <div className="flex items-center justify-center border-r py-4">
            SUN
          </div>
          <div className="flex items-center justify-center border-r">MON</div>
          <div className="flex items-center justify-center border-r">TUE</div>
          <div className="flex items-center justify-center border-r">WED</div>
          <div className="flex items-center justify-center border-r">THU</div>
          <div className="flex items-center justify-center border-r">FRI</div>
          <div className="flex items-center justify-center">SAT</div>
        </div>
        <div className={cn("grid grid-cols-7 flex-1", props.className)}>
          {Object.keys(days).map((date) => (
            <CalendarCellMonth
              key={date.toString()}
              filters={filters}
              cellDate={new Date(date)}
              events={eventsMap.get(date)}
            />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return toast.error("error")
  }

  return (
    <div className="flex items-center justify-center h-full">
      <IconLoader2 className="w-6 h-w-6 animate-spin text-primary" />
    </div>
  )
}

export default EventCalendar
