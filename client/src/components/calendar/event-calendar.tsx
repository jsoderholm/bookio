import { getDaysOnPage } from "@/lib/utils"
import CalendarCellMonth from "./calendar-cell-month"

interface EventCalendarProps {
  activeMonth: Date
}

const EventCalendar = ({ activeMonth }: EventCalendarProps) => {
  const days = getDaysOnPage(activeMonth)

  return (
    <div className="grid grid-cols-7 h-full">
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
