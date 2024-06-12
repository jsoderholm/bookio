import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { groupQueries } from "@/lib/query/group-queries"
import { cn } from "@/lib/utils"
import { IconX } from "@tabler/icons-react"
import type { FieldApi } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"
import { Command as CommandPrimitive } from "cmdk"
import { useCallback, useRef, useState } from "react"
import type { CreateEvent } from "../../../common/types/event"
import type { GroupMini } from "../../../common/types/group"
import { Badge } from "./ui/badge"

interface GroupComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  field: Pick<
    FieldApi<CreateEvent, "groups">,
    "name" | "handleChange" | "state" | "handleBlur"
  >
}

export function GroupMultiselect({ className, field }: GroupComboboxProps) {
  const { state, handleChange } = field
  const inputRef = useRef<HTMLInputElement>(null)
  const { data, error } = useQuery(groupQueries.list())
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<GroupMini[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleUnselect = useCallback((group: GroupMini) => {
    setSelected((prev) => prev.filter((s) => s.id !== group.id))
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev]
              newSelected.pop()
              return newSelected
            })
          }
        }
        if (e.key === "Escape") {
          input.blur()
        }
      }
    },
    [],
  )

  if (error) return `An error occurred: ${error.message}` ?? []

  const selectables =
    data?.groups.filter((group) => !selected.includes(group)) ?? []

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={cn("overflow-visible bg-transparent", className)}
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ">
        <div className="flex flex-wrap gap-1">
          {selected.map((group) => {
            return (
              <Badge key={group.id} variant="secondary">
                {group.name}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(group)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(group)}
                  type="button"
                >
                  <IconX className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            disabled={selectables.length === 0}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((group) => {
                  return (
                    <CommandItem
                      key={group.id}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue("")
                        handleChange([...state.value, group.id])
                        setSelected((prev) => [...prev, group])
                      }}
                      className={"cursor-pointer"}
                    >
                      {group.name}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}

export default GroupMultiselect
