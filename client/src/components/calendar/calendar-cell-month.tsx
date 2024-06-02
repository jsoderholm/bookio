import {
  cn,
  getCalendarCellMonthStyling,
  getDayOfTheWeek,
  isCellOnFirstRow,
} from "@/lib/utils"
import { isSameMonth, isToday } from "date-fns"
import { Badge } from "../ui/badge"

interface CalendarCellMonthProps {
  activeDate: Date
  cellDate: Date
}

const CalendarCellMonth = ({
  activeDate,
  cellDate,
}: CalendarCellMonthProps) => {
  const isOnFirstRow = isCellOnFirstRow(activeDate, cellDate)
  const cellDateIsToday = isToday(cellDate)
  const dayOfTheWeek = getDayOfTheWeek(cellDate)
  const notInActiveMonth = !isSameMonth(cellDate, activeDate)

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-2",
        getCalendarCellMonthStyling(activeDate, cellDate),
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
