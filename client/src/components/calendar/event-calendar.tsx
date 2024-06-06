import type { BaseComponentProps } from "@/lib/common/types"
import { cn, getDaysOnPage } from "@/lib/utils"
import { useAppliedEventFilters } from "@/stores/event-filter-store"
import CalendarCellMonth from "./calendar-cell-month"

type EventCalendarProps = {} & BaseComponentProps

const EventCalendar = (props: EventCalendarProps) => {
  const filters = useAppliedEventFilters()
  const days = getDaysOnPage(filters)

  return (
    <div className={cn("grid grid-cols-7 h-full", props.className)}>
      {days.map((date) => (
        <CalendarCellMonth
          key={date.toString()}
          filters={filters}
          cellDate={date}
        />
      ))}
    </div>
  )
}

export default EventCalendar
