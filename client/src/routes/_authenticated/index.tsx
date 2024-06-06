import CalendarHeader from "@/components/calendar/calendar-header"
import CalendarSidebar from "@/components/calendar/calendar-sidebar"
import EventCalendar from "@/components/calendar/event-calendar"
import { createFileRoute } from "@tanstack/react-router"

function Component() {
  return (
    <div className="flex h-full">
      <CalendarSidebar className="hidden xl:block" />
      <div className="flex flex-col gap-y-6 flex-1 mx-6 my-4 rounded-md overflow-y-auto">
        <CalendarHeader />
        <EventCalendar />
      </div>
    </div>
  )
}

export const Route = createFileRoute("/_authenticated/")({
  component: Component,
})
