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
import { cn, getStartOfFirstWeek } from "@/lib/utils"
import {
  useAppliedEventFilters,
  useEventFilterActions,
} from "@/stores/event-filter-store"
import { IconChevronUp } from "@tabler/icons-react"
import { useState } from "react"
import { Separator } from "../ui/separator"

type CalendarSidebarProps = {} & BaseComponentProps

const CalendarSidebar = ({ className }: CalendarSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true)
  const filters = useAppliedEventFilters()
  const { addFilter } = useEventFilterActions()

  return (
    <div className={cn("space-y-6 p-4 border-r", className)}>
      <Tabs defaultValue="month" className="flex">
        <TabsList className="grid-cols-3 flex-1">
          <TabsTrigger className="w-full" value="day">
            Day
          </TabsTrigger>
          <TabsTrigger className="w-full" value="week">
            Week
          </TabsTrigger>
          <TabsTrigger className="w-full" value="month">
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
