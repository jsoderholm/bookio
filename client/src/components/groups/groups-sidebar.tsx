import { groupQueries } from "@/lib/query/group-queries"
import { cn } from "@/lib/utils"
import { useState } from "react"
import type { GroupMini } from "../../../../common/types/group"
import QuerySuspense from "../suspense/query-suspense"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import CreateGroupModal from "./create-group-modal"

interface SidebarProps {
  data: GroupMini[]
}

const Sidebar = ({ data }: SidebarProps) => {
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false)

  return (
    <div className="flex flex-col border-r p-4">
      <Card className={cn("w-[275px] h-1/2")}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Groups</CardTitle>
            <CreateGroupModal
              isOpen={createGroupModalOpen}
              onOpenChange={setCreateGroupModalOpen}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-4">
            {data.map((group) => (
              <div
                key={group.id}
                className="grid items-start pb-4 last:mb-0 last:pb-0"
              >
                <div className="space-y-1 col-span-full">
                  <p className="text-sm font-medium leading-none">
                    {group.name}
                  </p>
                  {group.description && (
                    <p className="text-sm text-muted-foreground">
                      {group.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GroupsSidebar() {
  return (
    <QuerySuspense query={{ ...groupQueries.list() }}>
      {(data) => <Sidebar data={data.groups} />}
    </QuerySuspense>
  )
}

export default GroupsSidebar
