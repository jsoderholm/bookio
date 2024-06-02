import { type ClassValue, clsx } from "clsx"
import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  getDay,
  getDaysInMonth,
  isBefore,
  setDate,
  subDays,
} from "date-fns"
import { daysInWeek } from "date-fns/constants"
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

export function getPageSize(date: Date) {
  const fifthSaturday = getFifthSaturdayOnPage(date)
  const lastDayOfTheMonth = getLastDayOfTheMonth(date)
  // Check if the fifth saturday on the page is before the end of the month
  const isBeforeEndOfMonth = isBefore(fifthSaturday, lastDayOfTheMonth)
  return isBeforeEndOfMonth ? LARGE_MONTH_PAGE : SMALL_MONTH_PAGE
}

export function getEndOfPage(date: Date) {
  const startOfFirstWeek = getStartOfFirstWeek(date)
  const pageSize = getPageSize(date)
  return addDays(startOfFirstWeek, pageSize - 1)
}

export function getDaysOnPage(date: Date) {
  const startOfFirstWeek = getStartOfFirstWeek(date)
  const endOfPage = getEndOfPage(date)
  return eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfPage,
  })
}

export function getBorderClasses(index: number, date: Date) {
  const pageSize = getPageSize(date)

  let classes = ""

  if (index % daysInWeek === 1) {
    classes += "border-l"
  }

  if (index > pageSize - daysInWeek) {
    classes += " border-b"
  }
  return classes
}

export function getWeekDay(day: number) {
  if (day === 0) {
    return "SUN"
  }
  if (day === 1) {
    return "MON"
  }
  if (day === 2) {
    return "TUE"
  }
  if (day === 3) {
    return "WED"
  }
  if (day === 4) {
    return "THU"
  }
  if (day === 5) {
    return "FRI"
  }
  return "SAT"
}
