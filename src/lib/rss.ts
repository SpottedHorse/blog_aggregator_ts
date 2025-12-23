import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  // console.log('starting fetch...\n')
  const resp = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
      accept: "application/rss+xml"
    },
  });
  if (!resp.ok) {
    throw new Error(`failed to fetch feed: ${resp.status} ${resp.statusText}`);
  }

  const respText = await resp.text()
  const parser = new XMLParser();
  let jObj = parser.parse(respText)

  const channel = jObj.rss?.channel

  if (!channel) {
    throw new Error(`channel field missing from response`)
  }
  if (!channel.title) {
    throw new Error(`title field missing from response`)
  }
  // const title = jObj.channel.title
  if (!channel.link) {
    throw new Error(`link field missing from response`)
  }
  // const link = jObj.channel.link
  if (!channel.description) {
    throw new Error(`description field missing from response`)
  }
  // const description = jObj.channel.description
  const items: any[] = Array.isArray(channel.item) ? channel.item : [channel.item];

  const rssItems: RSSItem[] = []

  for (const item of items) {
    if (!item.title || !item.link || !item.description || !item.pubDate){
      continue
    }

    rssItems.push({
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate
    });
    
  };
  
  const rss: RSSFeed = {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: rssItems,
    }
  }
  return rss
}
