import { readConfig } from "src/config";
import { addFeed, getFeeds } from "src/lib/db/queries/feeds";
import type { SelectUser, SelectFeed, InsertFeed } from "../lib/db/schema";
import { selectUser, getUser, getUserByID } from "src/lib/db/queries/users";

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (args.length != 2) {
    throw new Error(`usage: ${cmdName} <name> <url>`);
  }
  const name = args[0]
  const feedURL = args[1]
  const currentUser = readConfig().currentUserName
  // console.log(`---handlerAddFeed---\nname: ${name}\nfeedURL: ${feedURL}\ncurrentUser: ${currentUser}\n`)
  const addedFeed: InsertFeed = await addFeed(name, feedURL, currentUser)
  // console.log(`addedFeed: ${addedFeed}`)
  const user: SelectUser = await getUser(currentUser)
  // console.log(`user: ${user}`)
  
  printFeed(addedFeed, user)
}

async function printFeed(feed: InsertFeed, user: SelectUser) {
  // console.log(`Feed: ${JSON.stringify(feed, null, 2)}\n\nUser: ${JSON.stringify(user, null, 2)}`);
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user?.name}`);
}

export async function handlerFeeds() {
  const feedsTable = await getFeeds();
  for (const feed of feedsTable) {
    const user = await getUserByID(feed.userId)
    console.log(`Name: ${feed.name}\nURL: ${feed.url}\nUser: ${user?.name}\n`)
  }
}