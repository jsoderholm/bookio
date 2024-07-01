import { IconLogout } from "@tabler/icons-react"
import { Avatar } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

const AvatarMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center justify-center space-x-3">
          <Avatar className="w-10 h-10 bg-blue-100" />
          <div className="flex-col hidden sm:flex items-start justify-center gap-y-1 h-11">
            <p className="text-sm font-medium leading-none trailing-none ">
              John Doe
            </p>
            <p className="text-sm leading-none text-muted-foreground trailing-none">
              mail@example.com
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4 mt-2">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a href="/api/logout" className="flex items-center cursor-pointer">
            <IconLogout className="w-4 h-4 mr-2" />
            <span>Logout</span>
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarMenu
