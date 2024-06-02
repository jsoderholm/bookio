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
import type { BaseComponentProps } from "@/lib/common/types"
import { cn } from "@/lib/utils"
import {
  IconCalendar,
  IconLogout,
  IconPlus,
  IconUsers,
} from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState } from "react"

type CommandMenuProps = {} & BaseComponentProps

const CommandMenu = ({ className }: CommandMenuProps) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
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
        if (e.key === "e" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
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
      <kbd
        style={{
          boxShadow:
            "inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4)",
          background: "linear-gradient(-225deg, #d5dbe4, #f8f8f8)",
          height: "28px",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
        className={cn(
          " pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
          className,
        )}
      >
        <span className="text-sm">⌘</span>
      </kbd>
      <kbd
        style={{
          boxShadow:
            "inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px rgba(30, 35, 90, 0.4)",
          background: "linear-gradient(-225deg, #d5dbe4, #f8f8f8)",
          height: "28px",
          paddingLeft: "0.5rem",
          paddingRight: "0.5rem",
        }}
        className={cn(
          "ml-4 pointer-events-none inline-flex select-none items-center gap-1 rounded border bg-muted px-2 font-mono text-[10px] font-medium text-muted-foreground opacity-100",
          className,
        )}
      >
        <span className="text-sm">K</span>
      </kbd>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Actions">
            <CommandItem>
              <IconPlus className="w-4 h-4 mr-2" />
              <span>Add event</span>
              <CommandShortcut>⌘E</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
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
          <CommandGroup>
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
