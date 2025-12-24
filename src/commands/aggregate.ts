import { fetchFeed } from "../lib/rss";
import { readConfig } from "src/config";
import { addFeed } from "src/lib/db/queries/feeds";
import type { SelectUser, SelectFeed, InsertFeed } from "../lib/db/schema";
import { selectUser, getUser } from "src/lib/db/queries/users";

export async function handlerAgg(_: string) {
  const feedURL = "https://www.wagslane.dev/index.xml";

  const feedData = await fetchFeed(feedURL);
  const feedDataStr = JSON.stringify(feedData, null, 2);
  console.log(feedDataStr);
}

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

async function printFeed(feedEntry: InsertFeed, userEntry: SelectUser) {
  console.log(`Feed: ${JSON.stringify(feedEntry, null, 2)}\n\nUser: ${JSON.stringify(userEntry, null, 2)}`);
}