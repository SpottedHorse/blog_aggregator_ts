import { fetchFeed } from "src/lib/rss";

export async function handlerAgg(cmdName: string, ...args: string[]){
  const feedURL = 'https://www.wagslane.dev/index.xml';
  const resp = await fetchFeed(feedURL);
  console.log(await resp);
}