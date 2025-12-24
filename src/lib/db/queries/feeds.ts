import { db } from "..";
import { feeds, users } from "../schema";
import { selectUser } from "./users";


export async function addFeed(name: string, feedURL: string, user_name: string) {
  const userUUID = await selectUser(user_name)
  // console.log(`userUUID: ${userUUID.id}\n`)
  const [result] = await db.insert(feeds).values({ name, url: feedURL, userId: userUUID.id }).returning();
  return result;
}
