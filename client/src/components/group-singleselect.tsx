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
import type { FieldApi } from "@tanstack/react-form"
import { useQuery } from "@tanstack/react-query"
import type { CreatePost } from "../../../common/types/post"

interface GroupSingleselectProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  field: Pick<
    FieldApi<CreatePost, "groupId">,
    "name" | "handleChange" | "state" | "handleBlur"
  >
}

const GroupSingleselect = ({ className, field }: GroupSingleselectProps) => {
  const { data, error } = useQuery(groupQueries.list())

  if (error) return `An error has occurred: ${error.message}`
  return (
    <Select onValueChange={field.handleChange} value={field.state.value}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Select a group" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Groups</SelectLabel>
          {data?.groups.map((group) => (
            <SelectItem key={group.id} value={group.name}>
              {group.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default GroupSingleselect
