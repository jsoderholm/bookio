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
          className="flex h-11 w-11 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-primary md:h-8 md:w-8"
          activeProps={{ className: "bg-white text-primary" }}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  )
}

const Sidebar = () => {
  return (
    <aside className="sticky h-screen inset-y-0 left-0 z-10 hidden w-24 flex-col border-r sm:flex">
      <nav className="flex flex-col h-full items-center gap-y-4 px-8 sm:py-5">
        <img src="/logo.svg" alt="Acme Inc" className="w-full" />
        <Separator className="my-10" />
        <SidebarItem title="Calendar" to="/" icon={IconCalendar} />
        <SidebarItem title="Groups" to="/groups" icon={IconUsers} />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="mt-auto rounded-sm text-muted-foreground  transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <a href="/api/logout">
                <IconLogout className="h-5 w-5" />
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
