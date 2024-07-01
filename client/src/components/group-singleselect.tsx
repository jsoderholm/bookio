import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { groupQueries } from "@/lib/query/group-queries"
import { cn } from "@/lib/utils"
import type { FieldState, Updater } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"

interface GroupSingleselectProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  handleChange: (updater: Updater<string>) => void
  state: FieldState<string>
}

const GroupSingleselect = ({
  className,
  handleChange,
  state,
}: GroupSingleselectProps) => {
  const { data, error } = useQuery(groupQueries.list())

  if (error) return `An error has occurred: ${error.message}`
  return (
    <Select onValueChange={handleChange} value={state.value}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Select a group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Groups</SelectLabel>
          {data?.groups.map((group) => (
            <SelectItem key={group.id} value={group.id.toString()}>
              {group.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default GroupSingleselect
