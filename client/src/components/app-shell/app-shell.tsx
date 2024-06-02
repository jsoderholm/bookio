import Sidebar from "./sidebar"
import TopBar from "./top-bar"

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <TopBar />
      <div className="flex-1 mt-20 sm:mt-20">{children}</div>
    </div>
  )
}

export default AppShell
