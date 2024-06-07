import {
  groupQueries,
  loadingCreateGroupQueryOptions,
} from "@/lib/query/group-queries"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"
import CreateGroupModal from "./create-group-modal"

const GroupsSidebar = () => {
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false)

  const { data, isPending, error } = useQuery(groupQueries.list())
  const { data: loadingCreateGroup } = useQuery(loadingCreateGroupQueryOptions)

  if (error) return `An error occurred: ${error.message}`

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
            {loadingCreateGroup?.group && (
              <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <Skeleton className="h-2 w-2 rounded-full translate-y-1" />
                <div className="space-y-2">
                  <Skeleton className="w-full h-5" />
                  <Skeleton className="w-full h-3" />
                </div>
              </div>
            )}
            {isPending
              ? Array.from({ length: 5 }, (_, i) => i + 1).map((e) => (
                  <div
                    key={e}
                    className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <Skeleton className="h-2 w-2 rounded-full translate-y-1" />
                    <div className="space-y-2">
                      <Skeleton className="w-full h-5" />
                      <Skeleton className="w-full h-3" />
                    </div>
                  </div>
                ))
              : data.groups.map((group) => (
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

export default GroupsSidebar
