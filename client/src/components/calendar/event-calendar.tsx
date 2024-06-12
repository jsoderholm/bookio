import type { BaseComponentProps } from "@/lib/common/types"
import { eventQueries } from "@/lib/query/event-queries"
import { cn, getDaysOnPage } from "@/lib/utils"
import { useAppliedEventFilters } from "@/stores/event-filter-store"
import type { CalendarEvent } from "../../../../common/types/event"
import QuerySuspense from "../suspense/query-suspense"
import CalendarCellMonth from "./month/calendar-cell-month"

function EventCalendar() {
  const applied = useAppliedEventFilters()
  return (
    <QuerySuspense query={{ ...eventQueries.list(applied) }}>
      {(data) => <EventCalendarComponent events={data.events} />}
    </QuerySuspense>
  )
}

type EventCalendarProps = { events: CalendarEvent[] } & BaseComponentProps

const EventCalendarComponent = ({ events, ...rest }: EventCalendarProps) => {
  const filters = useAppliedEventFilters()
  const days = getDaysOnPage(filters)
  const eventsMap = new Map<string, CalendarEvent[]>(Object.entries(days))

  events.forEach((event) => {
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
      <div className={cn("grid grid-cols-7 flex-1", rest.className)}>
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

export default EventCalendar
