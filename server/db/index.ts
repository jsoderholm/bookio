import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { commentRelations, comments } from "./schema/comments"
import { events, eventRelations } from "./schema/events"
import { groupRelations, groups } from "./schema/groups"
import {
  eventsOnGroups,
  eventsOnGroupsRelations,
  usersOnGroups,
  usersOnGroupsRelations,
} from "./schema/junctions"
import { postRelations, posts } from "./schema/posts"
import { userRelations, users } from "./schema/users"

const queryClient = postgres(process.env.DATABASE_URL!)
export const db = drizzle(queryClient, {
  schema: {
    posts,
    postRelations,
    events,
    eventRelations,
    groups,
    groupRelations,
    users,
    userRelations,
    comments,
    commentRelations,
    eventsOnGroups,
    eventsOnGroupsRelations,
    usersOnGroups,
    usersOnGroupsRelations,
  },
})
