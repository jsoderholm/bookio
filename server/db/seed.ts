import { faker } from "@faker-js/faker"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import type { z } from "zod"
import { type insertUserSchema, users } from "./schema/users"

const queryClient = postgres(process.env.DATABASE_URL!, { max: 1 })

const db = drizzle(queryClient, { logger: true })

type UserToBeInserted = z.infer<typeof insertUserSchema>

const generateUserRows = (count: number): UserToBeInserted[] => {
  const rows: UserToBeInserted[] = []

  for (let i = 0; i < count; i++) {
    rows.push({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      profilePicture: faker.image.avatar(),
      createdAt: faker.date.past(),
    })
  }
  return rows
}

async function seed() {
  console.info("seeding database")
  console.time("database has been seeded")

  // database teardown
  await db.delete(users)

  // database setup
  const newUserRows = generateUserRows(20)
  await db.insert(users).values(newUserRows).returning()
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.info("seeding done!")
    process.exit(0)
  })
