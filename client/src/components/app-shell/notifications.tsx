import { IconBell } from "@tabler/icons-react"
import { Button } from "../ui/button"

const Notifications = () => {
  return (
    <Button variant="ghost" size="icon" className="relative">
      <IconBell className="w-6 h-6 transition-all" />
      <span className="sr-only">Toggle theme</span>
      <span className="absolute flex w-2 h-2 rounded-full bg-primary right-1 top-1" />
    </Button>
  )
}

export default Notifications
