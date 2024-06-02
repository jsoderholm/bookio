import { cn, getCalendarCellMonthStyling, isCellOnFirstRow } from "@/lib/utils"

interface CalendarCellMonthProps {
  activeDate: Date
  cellDate: Date
}

const CalendarCellMonth = ({
  activeDate,
  cellDate,
}: CalendarCellMonthProps) => {
  const isOnFirstRow = isCellOnFirstRow(activeDate, cellDate)

  return (
    <div
      className={cn(
        "flex flex-col gap-y-1 text-center",
        getCalendarCellMonthStyling(activeDate, cellDate),
      )}
    >
      {isOnFirstRow && <div>MON</div>}
      <p>{cellDate.getDate()}</p>
    </div>
  )
}

export default CalendarCellMonth
