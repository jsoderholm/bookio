import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { IconCalendar, IconLogout, IconUsers } from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

const CommandMenu = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    if (open) {
      const down = (e: KeyboardEvent) => {
        if (e.key === "g" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          navigate({ to: "/groups" })
          setOpen(false)
        }
        if (e.key === "c" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          navigate({ to: "/" })
          setOpen(false)
        }
      }

      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, navigate])

  return (
    <div>
      <p className="flex items-center text-md text-muted-foreground gap-x-2">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-sm">⌘</span>
        </kbd>
        <kbd className="pointer-events-none inline-flex h-7 select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-sm">J</span>
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem>
              <IconCalendar
                onSelect={() => {
                  navigate({ to: "/groups" })
                  setOpen(false)
                }}
                className="w-4 h-4 mr-2"
              />
              <span>Calendar</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => {
                navigate({ to: "/groups" })
                setOpen(false)
              }}
            >
              <IconUsers className="w-4 h-4 mr-2" />
              <span>Groups</span>
              <CommandShortcut>⌘G</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem>
              <IconLogout className="w-4 h-4 mr-2" />
              <a href="/api/logout">
                <span>Logout</span>
              </a>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default CommandMenu
