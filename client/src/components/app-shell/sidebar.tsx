import {
  IconArrowLeftFromArc,
  IconCalendar,
  IconUsers,
} from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const Sidebar = () => {
  return (
    <aside className="sticky inset-y-0 left-0 z-10 flex-col hidden w-24 h-screen pb-4 border-r bg-neutral dark:bg-background sm:flex">
      <div className="flex items-center justify-center aspect-square">
        <img src="/logo-small.svg" alt="Acme Inc" className="w-12" />
      </div>
      <Separator className="w-1/2 mx-auto" />
      <div className="flex flex-col items-center mt-6 gap-y-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/"
              className="flex items-center justify-center w-12 h-12 transition-colors rounded-sm text-muted-foreground hover:text-primary "
              activeProps={{
                className: "text-primary bg-white dark:bg-muted border",
              }}
            >
              <IconCalendar className="w-6 h-6" />
              <span className="sr-only">Calendar</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Calendar</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/groups"
              className="flex items-center justify-center w-12 h-12 transition-colors rounded-sm text-muted-foreground hover:text-primary "
              activeProps={{
                className: "text-primary bg-white dark:bg-muted border",
              }}
            >
              <IconUsers className="w-6 h-6" />
              <span className="sr-only">Groups</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Groups</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center justify-center w-full mt-auto">
        <Button
          size="icon"
          variant="ghost"
          className="w-11 h-11 text-muted-foreground hover:text-primary"
        >
          <IconArrowLeftFromArc className="w-6 h-6" />
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar
