import {
  IconCalendar,
  IconLogout,
  IconMenu,
  IconUsers,
} from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet"
import AvatarMenu from "./avatar-menu"
import { ModeToggle } from "./mode-toggle"
import Notifications from "./notifications"

const TopBar = () => {
  return (
    <nav className="fixed top-0 z-10 left-0 right-0 flex items-center justify-between sm:justify-end h-20 sm:h-20 px-4 border-b sm:ml-20 bg-background ">
      <Sheet>
        <SheetTrigger className="block sm:hidden" asChild>
          <Button size="icon" variant="ghost">
            <IconMenu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <img src="/logo-full.svg" alt="Acme Inc" className="w-1/2 mb-6" />
          </SheetHeader>
          <div className="flex flex-col space-y-6 ">
            <Separator />
            <Link
              to="/"
              className="flex items-center gap-x-2  w-full font-medium text-lg text-muted-foreground "
              activeProps={{ className: "text-primary" }}
            >
              <IconCalendar className="w-6 h-6" />
              <p className="leading-none">Calendar</p>
            </Link>
            <Link
              to="/groups"
              className="flex items-center gap-x-2  w-full font-medium text-lg text-muted-foreground "
              activeProps={{ className: "text-primary" }}
            >
              <IconUsers className="w-6 h-6" />
              <p className="leading-none">Groups</p>
            </Link>
            <Separator />
            <a
              href="/api/logout"
              className="flex items-center gap-x-2 w-full font-medium text-lg text-muted-foreground "
            >
              <IconLogout className="w-6 h-6" />
              <p className="leading-none">Logout</p>
            </a>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex sm:space-x-6 space-x-4 items-center justify-center h-full">
        <Notifications />
        <ModeToggle />
        <Separator
          orientation="vertical"
          className="my-auto h-1/2 hidden sm:block"
        />
        <AvatarMenu />
      </div>
    </nav>
  )
}

export default TopBar
