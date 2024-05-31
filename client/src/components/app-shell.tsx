import { Link } from "@tanstack/react-router"

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <>
      <div className="p-2 flex justify-between max-w-2xl m-auto">
        <h1 className="text-2xl font-bold">Bookio</h1>
        <div className="flex gap-2 ">
          <Link to="/" className="[&.active]:font-bold">
            Calendar
          </Link>
          <Link to="/groups" className="[&.active]:font-bold">
            Groups
          </Link>
        </div>
      </div>
      <div className="p-2 max-w-2xl ">{children}</div>
    </>
  )
}

export default AppShell
