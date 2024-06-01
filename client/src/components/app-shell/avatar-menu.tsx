import { Avatar } from "../ui/avatar"

const AvatarMenu = () => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <Avatar className="w-10 h-10 bg-blue-100" />
      <div className="flex-col hidden sm:flex justify-center gap-y-1 h-11">
        <p className="text-sm font-medium leading-none trailing-none ">
          John Doe
        </p>
        <p className="text-sm leading-none text-muted-foreground trailing-none">
          m@example.com
        </p>
      </div>
    </div>
  )
}

export default AvatarMenu
