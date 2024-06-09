import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useMediaQuery } from "@/hooks/use-media-query"
import { groupQueries } from "@/lib/query/group-queries"
import { cn } from "@/lib/utils"
import type { FieldApi, FieldState, Updater } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import type { GroupMini } from "../../../common/types/group"
import type { CreatePost } from "../../../common/types/post"
import { Button } from "./ui/button"

interface GroupComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  state: FieldState<string>
  handleChange: (updater: Updater<string>) => void
}
interface GroupComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  field: Pick<
    FieldApi<CreatePost, "groupId">,
    "name" | "handleChange" | "state" | "handleBlur"
  >
}

const GroupCombobox = ({
  state,
  handleChange,
  className,
}: GroupComboboxProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { data, error } = useQuery(groupQueries.list())

  if (error) return `An error occurred: ${error.message}`

  console.log(state.value)
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className={cn("justify-start", className)}>
            {state.value ? state.value : "Add group"}
            {state.value ? (
              <>{state.value}</>
            ) : (
              <p className="text-muted-foreground font-normal">Add groups</p>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <StatusList
            setOpen={setOpen}
            handleChange={handleChange}
            groups={data?.groups}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {state.value ? (
            <>{state.value}</>
          ) : (
            <p className="text-muted-foreground font-normal">Add groups</p>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} handleChange={handleChange} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  handleChange,
  groups,
}: {
  setOpen: (open: boolean) => void
  handleChange: (updater: Updater<string>) => void
  groups?: GroupMini[]
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter groups..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {groups?.map((group) => (
            <CommandItem
              key={group.id}
              value={group.id.toString()}
              onSelect={(value) => {
                handleChange(() => value)
                setOpen(false)
              }}
            >
              {group.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
export default GroupCombobox
