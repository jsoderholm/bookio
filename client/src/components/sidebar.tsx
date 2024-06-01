import {
  IconCalendar,
  IconLogout,
  IconUsers,
  type TablerIcon,
} from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"

type SidebarItemProps = {
  title: string
  to: string
  icon: TablerIcon
}

const SidebarItem = ({ to, title, icon: Icon }: SidebarItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          to={to}
          className="flex items-center justify-center transition-colors rounded-sm h-11 w-11 text-muted-foreground hover:text-primary md:h-8 md:w-8"
          activeProps={{ className: "bg-white text-primary" }}
        >
          <Icon className="w-5 h-5" />
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  )
}

const Sidebar = () => {
  return (
    <aside className="sticky inset-y-0 left-0 z-10 flex-col hidden w-24 h-screen border-r sm:flex">
      <nav className="flex flex-col items-center h-full px-8 gap-y-4 sm:py-5">
        <img src="/logo.svg" alt="Acme Inc" className="w-full" />
        <Separator className="my-10" />
        <SidebarItem title="Calendar" to="/" icon={IconCalendar} />
        <SidebarItem title="Groups" to="/groups" icon={IconUsers} />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="mt-auto transition-colors rounded-sm text-muted-foreground hover:text-foreground md:h-8 md:w-8"
            >
              <a href="/api/logout">
                <IconLogout className="w-5 h-5" />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
}

export default Sidebar
