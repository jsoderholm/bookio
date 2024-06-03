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
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "../ui/button"

interface EventGroupComboboxProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

const EventGroupCombobox = (props: EventGroupComboboxProps) => {
  const [selectedStatus, setSelectedStatus] = useState<Group | null>(null)
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("justify-start", props.className)}
          >
            {selectedStatus ? (
              <>{selectedStatus.label}</>
            ) : (
              <p className="text-muted-foreground font-normal">Add groups</p>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? (
            <>{selectedStatus.label}</>
          ) : (
            <p className="text-muted-foreground font-normal">Add groups</p>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

type Group = {
  value: string
  label: string
}

const statuses: Group[] = [
  {
    value: "group-a",
    label: "This",
  },
  {
    value: "group-b",
    label: "is",
  },
  {
    value: "group-c",
    label: "not",
  },
  {
    value: "group-d",
    label: "implemented",
  },
  {
    value: "group-e",
    label: "yet",
  },
]

function StatusList({
  setOpen,
  setSelectedStatus,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Group | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null,
                )
                setOpen(false)
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
export default EventGroupCombobox
