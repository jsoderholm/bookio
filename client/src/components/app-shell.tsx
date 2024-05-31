import Sidebar from "./sidebar"

type AppShellProps = {
  children: React.ReactNode
}

const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  )
}

export default AppShell
