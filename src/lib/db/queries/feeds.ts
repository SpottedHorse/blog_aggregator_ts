import { db } from "..";
import { users, feeds } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function addFeed(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}