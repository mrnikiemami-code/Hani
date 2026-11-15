import { apiGet } from "@/lib/hani/api";
import type { HomeFeed } from "../domain/home-feed";

export async function getHomeFeed(locale: string): Promise<HomeFeed | null> {
  const feed = await apiGet<HomeFeed>(
    `/market/v1/home?locale=${encodeURIComponent(locale)}`
  );

  if (!feed) {
    return null;
  }

  return {
    ...feed,
    tours: {
      ...feed.tours,
      items: feed.tours.items.filter(
        (item) => !item.title.includes("???") && !item.title.includes("�")
      )
    },
    visas: feed.visas.filter(
      (item) => !item.name.includes("???") && !item.name.includes("�")
    ),
    blog: {
      ...feed.blog,
      items: feed.blog.items.filter(
        (item) => !item.title.includes("???") && !item.title.includes("�")
      )
    },
    travelogues: {
      ...feed.travelogues,
      items: feed.travelogues.items.filter(
        (item) => !item.title.includes("???") && !item.title.includes("�")
      )
    }
  };
}
