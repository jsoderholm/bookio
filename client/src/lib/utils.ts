import type { EventFilter } from "@/stores/event-filter-store"
import { type ClassValue, clsx } from "clsx"
import {
  addDays,
  addMonths,
  addWeeks,
  eachDayOfInterval,
  getDay,
  getDaysInMonth,
  getMonth,
  isAfter,
  isBefore,
  isSameMonth,
  isSunday,
  setDate,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns"
import { daysInWeek } from "date-fns/constants"
import { DateTime } from "luxon"
import { twMerge } from "tailwind-merge"
import { LARGE_MONTH_PAGE, SMALL_MONTH_PAGE } from "./common/constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstDayOfTheMonth(date: Date) {
  return setDate(date, 1)
}

export function getLastDayOfTheMonth(date: Date) {
  const daysInMonth = getNumberOfDaysInMonth(date)
  return setDate(date, daysInMonth)
}

export function getNumberOfDaysInMonth(date: Date) {
  return getDaysInMonth(date)
}

export function getStartOfFirstWeek(date: Date) {
  const firstDayOfTheMonth = getFirstDayOfTheMonth(date)
  const dayOfTheWeek = getDay(firstDayOfTheMonth)
  return subDays(firstDayOfTheMonth, dayOfTheWeek % daysInWeek)
}

export function getEndOfFirstWeek(date: Date) {
  const startOfFirstWeek = getStartOfFirstWeek(date)
  return addDays(startOfFirstWeek, daysInWeek - 1)
}

export function getFirstWeekOnPage(date: Date) {
  const startOfFirstWeek = getStartOfFirstWeek(date)
  const endOfFirstWeek = getEndOfFirstWeek(date)
  return eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfFirstWeek,
  })
}

export function getFifthSaturdayOnPage(date: Date) {
  const endOfFirstWeek = getEndOfFirstWeek(date)
  return addWeeks(endOfFirstWeek, 4)
}

export function getSecondToLastSaturdayOnPage(firstDay: Date) {
  const currentMonth = getCurrentMonth(firstDay)
  const isLargePage = isLargePageSize(currentMonth)
  const endOfFirstWeek = getEndOfFirstWeek(currentMonth)

  if (isLargePage) {
    return addWeeks(endOfFirstWeek, 4)
  }

  return addWeeks(endOfFirstWeek, 3)
}

export function isLargePageSize(firstDay: Date) {
  const pageSize = getPageSize({ firstDay, range: "month" })
  return pageSize === LARGE_MONTH_PAGE
}

export function isCellInFirstColumn(cellDate: Date) {
  return isSunday(cellDate)
}

export function isCellOnFirstRow(activeDate: Date, cellDate: Date) {
  const endOfFirstWeek = getEndOfFirstWeek(activeDate)
  return isBefore(cellDate, endOfFirstWeek)
}

export function getCalendarCellMonthStyling(firstDay: Date, cellDate: Date) {
  const currentMonth = getCurrentMonth(firstDay)
  const secondToLastSaturdayOnPage = getSecondToLastSaturdayOnPage(currentMonth)

  const isOnLastRow = isAfter(cellDate, secondToLastSaturdayOnPage)
  const isNotInActiveMonth = !isSameMonth(cellDate, currentMonth)
  const cellInFirstColumn = isCellInFirstColumn(cellDate)

  return cn(
    "border-r border-t",
    isNotInActiveMonth && "text-muted-foreground",
    cellInFirstColumn && "border-l",
    isOnLastRow && "border-b",
  )
}

export function getDayOfTheWeek(date: Date) {
  const dayString = date.toLocaleString("en-US", { weekday: "short" })
  return dayString.toUpperCase()
}

export function getLocalDateTimeISO(date: string) {
  const utcDate = DateTime.fromISO(date).toLocal().toISO()
  if (!utcDate) {
    throw new Error("invalid date")
  }
  return utcDate
}

export function formatDateTimeRange(from: string, to: string) {
  const startDate = DateTime.fromISO(from).toLocal()
  const endDate = DateTime.fromISO(to).toLocal()

  if (!startDate.isValid || !endDate.isValid) {
    throw new Error("invalid date")
  }

  const formattedStart = startDate.toLocaleString(DateTime.DATE_FULL)
  const formattedEnd = endDate.toLocaleString(DateTime.DATE_FULL)

  if (startDate.hasSame(endDate, "day")) {
    return formattedStart
  }

  return `${formattedStart} - ${formattedEnd}`
}

export function getPageSize({ firstDay, range }: EventFilter): number {
  // Case 1: Range is "month"
  if (range === "month") {
    const currentMonth = getCurrentMonth(firstDay)
    const fifthSaturday = getFifthSaturdayOnPage(currentMonth)
    const lastDayOfTheMonth = getLastDayOfTheMonth(currentMonth)
    // Check if the fifth saturday on the page is before the end of the month
    const isBeforeEndOfMonth = isBefore(fifthSaturday, lastDayOfTheMonth)
    return isBeforeEndOfMonth ? LARGE_MONTH_PAGE : SMALL_MONTH_PAGE
  }

  // Case 2: Range is "week"
  return daysInWeek
}

export function getEndOfPage({ firstDay, range }: EventFilter) {
  const pageSize = getPageSize({ firstDay, range })
  return addDays(firstDay, pageSize - 1)
}

export function getCurrentMonth(firstDay: Date): Date {
  // Get the first saturday of the current page, guaranteed to be in the current month
  const firstSaturday = addDays(firstDay, 6)
  const currentMonth = addMonths(firstSaturday, 0)
  console.table({ firstSaturday, currentMonth })
  return currentMonth
}

export function getDaysOnPage({ firstDay, range }: EventFilter) {
  const endOfPage = getEndOfPage({ firstDay, range })
  return eachDayOfInterval({
    start: firstDay,
    end: endOfPage,
  })
}

export function getFirstDayOfCalendar(
  filters: EventFilter,
  increment: boolean,
) {
  const { firstDay, range } = filters

  if (range === "week") {
    if (increment) {
      return addWeeks(firstDay, 1)
    }
    return subWeeks(firstDay, 1)
  }

  // Get the first saturday of the current page and the current month on the calendar
  const firstSaturday = addDays(firstDay, 6)
  const currentMonth = getMonth(firstSaturday)

  console.table({ firstSaturday, currentMonth })

  if (increment) {
    // Get the month that will be displayed on the next page
    const nextMonth = addMonths(firstSaturday, 1)
    const startOfFirstWeek = getStartOfFirstWeek(nextMonth)
    console.table({ nextMonth, startOfFirstWeek })
    return startOfFirstWeek
  }

  const previousMonth = subMonths(firstSaturday, 1)
  const startOfFirstWeek = getStartOfFirstWeek(previousMonth)
  return startOfFirstWeek
}
