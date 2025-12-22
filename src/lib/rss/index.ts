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
  
  const resp = await fetch(feedURL, {
    method: "GET",
    mode: "cors",
    headers: {
      "User-Agent": "gator",
    },
  });

  console.log(resp.text())

  const parser = new XMLParser();

  let jObj = parser.parse(await resp.text())

  if (!jObj.channel) {
    throw new Error(`channel field missing from response`)
  }
  if (!jObj.channel.title) {
    throw new Error(`title field missing from response`)
  }
  const title = jObj.channel.title
  if (!jObj.channel.link) {
    throw new Error(`link field missing from response`)
  }
  const link = jObj.channel.link
  if (!jObj.channel.description) {
    throw new Error(`description field missing from response`)
  }
  const description = jObj.channel.description

  const items: RSSItem[] = []

  if (jObj.item) {
    for (const item of jObj.item) {
      if (item.title && item.link && item.description && item.pubDate){
        items.push(item as RSSItem);
      };
    };
  };

  let res: RSSFeed = {
    channel: {
      title: title,
      link: link,
      description:description,
      item: items,
    }
  }
  return res
}