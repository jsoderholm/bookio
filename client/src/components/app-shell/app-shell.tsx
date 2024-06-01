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
      <div className="flex-1 p-4 mt-24">{children}</div>
    </div>
  )
}

export default AppShell
