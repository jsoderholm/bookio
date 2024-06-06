import CommandMenu from "@/components/command-menu"
import CreateEventModal from "@/components/event/create-event-modal"
import { Button } from "@/components/ui/button"
import type { BaseComponentProps } from "@/lib/common/types"
import { cn, getCurrentMonth, getFirstDayOfCalendar } from "@/lib/utils"
import {
  useAppliedEventFilters,
  useEventFilterActions,
} from "@/stores/event-filter-store"
import {
  IconAlignCenter,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import { useState } from "react"

type CalendarHeaderProps = {} & BaseComponentProps

const CalendarHeader = (props: CalendarHeaderProps) => {
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false)
  const filters = useAppliedEventFilters()
  const { addFilter } = useEventFilterActions()

  return (
    <div className={cn("flex items-center justify-between", props.className)}>
      <div className="flex items-center">
        <Button
          size="icon"
          variant="outline"
          className="mr-4"
          onClick={() =>
            addFilter({
              ...filters,
              firstDay: getFirstDayOfCalendar(filters, false),
            })
          }
        >
          <IconChevronLeft />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            addFilter({
              ...filters,
              firstDay: getFirstDayOfCalendar(filters, true),
            })
          }
        >
          <IconChevronRight />
        </Button>
        <h1 className="text-3xl font-bold ml-4">
          {getCurrentMonth(filters.firstDay).toLocaleDateString("en-US", {
            month: "long",
          })}
          &nbsp;
          {filters.firstDay.getFullYear()}
        </h1>
      </div>
      <div className="flex items-center gap-x-4">
        <Button
          variant="outline"
          onClick={() => addFilter({ ...filters, firstDay: new Date() })}
        >
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
