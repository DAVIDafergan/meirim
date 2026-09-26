import { NextResponse } from "next/server";

// HaRav Natan Yisrael's channel, resolved from
// youtube.com/@נתן-ישראל-ק6ק via the page's canonical channel URL.
// If the handle/channel ever changes, re-resolve the UC... id the same way
// (view-source on the channel page, look for "externalId") and update this.
const CHANNEL_ID = "UCGrX0_mgX6wD1-1cwaG3QTw";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export type YoutubeVideo = {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  publishedAt: string;
  isShort: boolean;
};

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  "#39": "'",
};

function decodeEntities(s: string): string {
  return s.replace(/&(#\d+|#x[0-9a-f]+|[a-z0-9]+);/gi, (m, code: string) => {
    if (code.startsWith("#x")) return String.fromCodePoint(parseInt(code.slice(2), 16));
    if (code.startsWith("#")) return String.fromCodePoint(parseInt(code.slice(1), 10));
    return ENTITIES[code.toLowerCase()] ?? m;
  });
}

function parseFeed(xml: string): YoutubeVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries.map((entry) => {
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? "";
    const rawTitle =
      entry.match(/<media:title>([^<]*)<\/media:title>/)?.[1] ??
      entry.match(/<title>([^<]*)<\/title>/)?.[1] ??
      "";
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    const thumbnail =
      entry.match(/<media:thumbnail url="([^"]+)"/)?.[1] ??
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1] ?? "";
    const isShort = link.includes("/shorts/");
    return {
      id: videoId,
      title: decodeEntities(rawTitle),
      url: link || `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail,
      publishedAt,
      isShort,
    };
  });
}

export async function GET() {
  try {
    // YouTube's channel RSS is public and unauthenticated, but rate-limits
    // aggressive polling - an hour of caching is more than enough for a
    // "latest lessons" strip that isn't time-critical.
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`YouTube feed responded ${res.status}`);
    const xml = await res.text();
    const videos = parseFeed(xml).slice(0, 8);
    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}
