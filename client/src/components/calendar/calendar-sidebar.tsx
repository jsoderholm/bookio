import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { BaseComponentProps } from "@/lib/common/types"
import { cn, getCurrentMonth, getStartOfFirstWeek } from "@/lib/utils"
import {
  type EventFilter,
  useAppliedEventFilters,
  useEventFilterActions,
} from "@/stores/event-filter-store"
import { IconChevronUp } from "@tabler/icons-react"
import { addDays, isSameMonth, isWithinInterval, startOfWeek } from "date-fns"
import { useState } from "react"
import { Separator } from "../ui/separator"

type CalendarSidebarProps = {} & BaseComponentProps

const CalendarSidebar = ({ className }: CalendarSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const filters = useAppliedEventFilters()
  const { addFilter } = useEventFilterActions()

  function handleAddFilter(
    filters: EventFilter,
    newRange: EventFilter["range"],
  ) {
    const { firstDay, range } = filters
    if (newRange === range) {
      return
    }

    const currentlyDisplayedMonth = getCurrentMonth(firstDay)
    const currentDate = new Date()
    const sameMonth = isSameMonth(currentlyDisplayedMonth, currentDate)

    if (newRange === "week") {
      if (sameMonth) {
        const startOfCurrentWeek = startOfWeek(currentDate)
        addFilter({
          firstDay: startOfCurrentWeek,
          range: newRange,
        })
        return
      }
      const start = startOfWeek(currentlyDisplayedMonth)
      addFilter({
        firstDay: start,
        range: newRange,
      })
      return
    }

    if (newRange === "month") {
      const todaysDateInCurrentWeek = isWithinInterval(currentDate, {
        start: firstDay,
        end: addDays(firstDay, 6),
      })
      if (todaysDateInCurrentWeek) {
        addFilter({
          firstDay: getStartOfFirstWeek(currentDate),
          range: newRange,
        })
        return
      }

      const wednesday = addDays(firstDay, 3)
      addFilter({
        firstDay: getStartOfFirstWeek(wednesday),
        range: newRange,
      })
    }
  }

  return (
    <div className={cn("space-y-6 p-4 border-r", className)}>
      <Tabs defaultValue="month" className="flex">
        <TabsList className="grid-cols-3 flex-1">
          <TabsTrigger className="w-full" value="day">
            Day
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="week"
            onClick={() => handleAddFilter(filters, "week")}
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="month"
            onClick={() => handleAddFilter(filters, "month")}
          >
            Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Calendar
        mode="single"
        onSelect={(date) => {
          addFilter({
            ...filters,
            firstDay: getStartOfFirstWeek(date ?? new Date()),
          })
        }}
      />
      <Separator />
      <div className="w-full">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className=" space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-4">
            <h3 className="text-sm font-semibold">My Calendars</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0">
                <IconChevronUp
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-4">
            <div className="flex items-center gap-x-4 px-4 font-mono text-sm">
              <Checkbox className="w-4 h-4" />
              @bookio/calendar
            </div>
            <div className="flex items-center gap-x-4 px-4  font-mono text-sm">
              <Checkbox className="w-4 h-4" />
              @bookio/groups
            </div>
            <div className="flex items-center gap-x-4 px-4  font-mono text-sm">
              <Checkbox className="w-4 h-4" />
              @bookio/home
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

export default CalendarSidebar
