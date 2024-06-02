import { cn, getCalendarCellMonthStyling, isCellOnFirstRow } from "@/lib/utils"
import { isToday } from "date-fns"
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
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-y-1 text-center p-2",
        getCalendarCellMonthStyling(activeDate, cellDate),
      )}
    >
      {isOnFirstRow && <p className="font-semibold text-xs">MON</p>}
      <Badge
        variant={cellDateIsToday ? "default" : "transparent"}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          cellDateIsToday && "text-white",
        )}
      >
        {cellDate.getDate()}
      </Badge>
    </div>
  )
}

export default CalendarCellMonth
