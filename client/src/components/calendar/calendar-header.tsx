import CommandMenu from "@/components/command-menu"
import CreateEventModal from "@/components/event/create-event-modal"
import { Button } from "@/components/ui/button"
import type { BaseComponentProps } from "@/lib/common/types"
import { cn } from "@/lib/utils"
import { useActiveMonth, useCalendarActions } from "@/stores/calendar-store"
import {
  IconAlignCenter,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import { addMonths, subMonths } from "date-fns"
import { useState } from "react"

type CalendarHeaderProps = {} & BaseComponentProps

const CalendarHeader = (props: CalendarHeaderProps) => {
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false)
  const activeMonth = useActiveMonth()
  const { setActiveMonth } = useCalendarActions()

  return (
    <div className={cn("flex items-center justify-between", props.className)}>
      <div className="flex items-center">
        <Button
          size="icon"
          variant="outline"
          className="mr-4"
          onClick={() => setActiveMonth(subMonths(activeMonth, 1))}
        >
          <IconChevronLeft />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() => setActiveMonth(addMonths(activeMonth, 1))}
        >
          <IconChevronRight />
        </Button>
        <h1 className="text-3xl font-bold ml-4">
          {activeMonth.toLocaleDateString("en-US", { month: "long" })}
          &nbsp;
          {activeMonth.getFullYear()}
        </h1>
      </div>
      <div className="flex items-center gap-x-4">
        <Button variant="outline" onClick={() => setActiveMonth(new Date())}>
          Today
        </Button>
        <CommandMenu setCreateEventModalOpen={setCreateEventModalOpen} />
        <Button size="icon" variant="outline">
          <IconAlignCenter className="w-6 h-6 text-muted-foreground" />
        </Button>
        <CreateEventModal
          isOpen={createEventModalOpen}
          onOpenChange={setCreateEventModalOpen}
        />
      </div>
    </div>
  )
}

export default CalendarHeader
