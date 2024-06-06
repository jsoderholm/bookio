import {
  cn,
  getCalendarCellMonthStyling,
  getCurrentMonth,
  getDayOfTheWeek,
  isCellOnFirstRow,
} from "@/lib/utils"
import { isSameMonth, isToday } from "date-fns"
import { Badge } from "../ui/badge"

interface CalendarCellMonthProps {
  firstDay: Date
  cellDate: Date
}

const CalendarCellMonth = ({ firstDay, cellDate }: CalendarCellMonthProps) => {
  const currentMonth = getCurrentMonth(firstDay)
  const isOnFirstRow = isCellOnFirstRow(currentMonth, cellDate)
  const cellDateIsToday = isToday(cellDate)
  const dayOfTheWeek = getDayOfTheWeek(cellDate)
  const notInActiveMonth = !isSameMonth(cellDate, currentMonth)

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-2",
        getCalendarCellMonthStyling(currentMonth, cellDate),
      )}
    >
      {isOnFirstRow && <p className="font-semibold text-xs">{dayOfTheWeek}</p>}
      <Badge
        variant={cellDateIsToday ? "default" : "transparent"}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          cellDateIsToday && "text-white",
        )}
      >
        <p className={cn(notInActiveMonth && "text-muted-foreground")}>
          {cellDate.getDate()}
        </p>
      </Badge>
    </div>
  )
}

export default CalendarCellMonth
