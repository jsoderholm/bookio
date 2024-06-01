import { Avatar } from "./ui/avatar"
import { Separator } from "./ui/separator"

const TopBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-end h-24 px-4 ml-24 space-x-6 bg-white border-b ">
      <Separator orientation="vertical" className="my-auto h-1/2" />
      <div className="flex items-center justify-center space-x-3">
        <Avatar className="w-10 h-10 bg-blue-100" />
        <div className="flex flex-col justify-center gap-y-1 h-11">
          <p className="text-sm font-medium leading-none trailing-none ">
            Sofia Davis
          </p>
          <p className="text-sm leading-none text-muted-foreground trailing-none">
            m@example.com
          </p>
        </div>
      </div>
    </nav>
  )
}

export default TopBar
