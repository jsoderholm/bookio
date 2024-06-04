import CalendarCellMonth from "@/components/calendar/calendar-cell-month"
import CommandMenu from "@/components/command-menu"
import CreateEventModal from "@/components/event/create-event-modal"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, getDaysOnPage } from "@/lib/utils"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
} from "@tabler/icons-react"
import { createFileRoute } from "@tanstack/react-router"
import { addMonths, subMonths } from "date-fns"
import { useState } from "react"

function Component() {
  const [date, setDate] = useState<Date | undefined>()
  const [isOpen, setIsOpen] = useState(true)
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  return (
    <div className="flex h-full">
      <div className="space-y-6 p-4 border-r hidden xl:block">
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
          selected={date}
          onSelect={(date) => {
            setCurrentMonth(date ?? new Date())
            setDate(date)
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
                      isOpen && "rotate-180 ",
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
      <div className="flex flex-col gap-y-6 flex-1 mx-6 my-4 rounded-md overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              size="icon"
              variant="outline"
              className="mr-4"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            >
              <IconChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            >
              <IconChevronRight />
            </Button>
            <h1 className="text-3xl font-bold ml-4">
              {currentMonth.toLocaleDateString("en-US", { month: "long" })}
              &nbsp;
              {currentMonth.getFullYear()}
            </h1>
          </div>
          <div className="flex items-center gap-x-4">
            <Button
              variant="outline"
              onClick={() => setCurrentMonth(new Date())}
            >
              Today
            </Button>
            <CommandMenu setCreateEventModalOpen={setCreateEventModalOpen} />
            <CreateEventModal
              isOpen={createEventModalOpen}
              onOpenChange={setCreateEventModalOpen}
            />
          </div>
        </div>
        <CalendarComponent currentMonth={currentMonth} />
      </div>
    </div>
  )
}

function CalendarComponent({ currentMonth }: { currentMonth: Date }) {
  const days = getDaysOnPage(currentMonth)

  return (
    <div className="grid grid-cols-7 h-full">
      {days.map((date) => (
        <CalendarCellMonth
          key={date.toString()}
          activeDate={currentMonth}
          cellDate={date}
        />
      ))}
    </div>
  )
}

export const Route = createFileRoute("/_authenticated/")({
  component: Component,
})
