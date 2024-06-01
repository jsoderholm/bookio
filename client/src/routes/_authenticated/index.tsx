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
import { cn } from "@/lib/utils"
import { IconChevronUp } from "@tabler/icons-react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

function Component() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isOpen, setIsOpen] = useState(false)

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
        <Calendar mode="range" selected={date} onSelect={setDate} />
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
      <div className="grid grid-cols-7 flex-1 radius-md">
        {Array.from({ length: 42 })
          .map((_, i) => i + 1)
          .map((e, i) => (
            <div
              key={e}
              className={cn(
                "p-4 border-b border-r",
                i % 2 === 0 ? "bg-muted" : "",
              )}
            >
              {i + 1}
            </div>
          ))}
      </div>
    </div>
  )
}

export const Route = createFileRoute("/_authenticated/")({
  component: Component,
})
