import type { BaseComponentProps } from "@/lib/common/types"
import { eventQueries } from "@/lib/query/event-queries"
import { cn, getDaysOnPage, getStartOfFirstWeek } from "@/lib/utils"
import { useActiveMonth } from "@/stores/calendar-store"
import { useQuery } from "@tanstack/react-query"
import CalendarCellMonth from "./calendar-cell-month"

type EventCalendarProps = {} & BaseComponentProps

const EventCalendar = (props: EventCalendarProps) => {
  const activeMonth = useActiveMonth()
  const days = getDaysOnPage(activeMonth)
  const firstDay = getStartOfFirstWeek(activeMonth)

  const { data } = useQuery(eventQueries.list(firstDay.toISOString()))
  console.info(data)

  return (
    <div className={cn("grid grid-cols-7 h-full", props.className)}>
      {days.map((date) => (
        <CalendarCellMonth
          key={date.toString()}
          activeDate={activeMonth}
          cellDate={date}
        />
      ))}
    </div>
  )
}

export default EventCalendar
