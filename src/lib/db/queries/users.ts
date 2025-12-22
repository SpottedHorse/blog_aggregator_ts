import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const result = await db.select().from(users).where(eq(users.name, name));
  return firstOrUndefined(result);
}

export async function getAllUsers() {
  const result = await db.select().from(users)
  return result
}

//TRUNCATE the user table
export async function truncateUsers() {
  // const userTable = await db.select().from(users)
  // console.log(await userTable)
  const result = await db.delete(users).returning();
  return result
}