export interface BlogCatalogPost {
  title: string;
  slug: string;
  date: string;
  summary: string;
  category: string;
  coverImage: string;
}

export const DEFAULT_BLOG_COVER_IMAGE =
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200";

export const staticBlogPosts: BlogCatalogPost[] = [
  {
    title: "客廳局部改造預算怎麼抓？天花板、地板與家具的費用拆解與取捨",
    slug: "living-room-partial-renovation-budget",
    date: "2026-06-17",
    summary:
      "拆解客廳局部改造的預算分配邏輯，從天花板、地板到家具更新，整理硬裝、軟裝與隱形成本的取捨思路。",
    category: "裝修預算",
    coverImage: "/images/blog/living-room-budget-cover.png",
  },
  {
    title: "畫出家的神經系統——全屋開關與插座的最適定位",
    slug: "whole-house-switch-socket-positioning",
    date: "2025-11-12",
    summary:
      "整理全屋開關與插座定位原則，從生活動線、家具尺寸到常見錯誤，幫助裝修前先把隱蔽工程規劃清楚。",
    category: "水電篇",
    coverImage: "/images/blog/插座被沙發遮蓋住.png",
  },
];

export function mapContentfulBlogPosts(items: any[]): BlogCatalogPost[] {
  return items.map((item) => ({
    title: String(item.fields.title ?? ""),
    slug: String(item.fields.slug ?? ""),
    date: new Date(String(item.fields.date ?? "")).toISOString().split("T")[0],
    summary: String(item.fields.summary ?? ""),
    category: String(item.fields.category ?? ""),
    coverImage: item.fields.coverImage?.fields?.file?.url
      ? `https:${item.fields.coverImage.fields.file.url}`
      : DEFAULT_BLOG_COVER_IMAGE,
  }));
}

export function mergeBlogPosts<T extends { slug: string; date: string }>(posts: T[]): T[] {
  return Array.from(new Map(posts.map((post) => [post.slug, post])).values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getStaticBlogPost(slug: string): BlogCatalogPost {
  const post = staticBlogPosts.find((entry) => entry.slug === slug);
  if (!post) {
    throw new Error(`找不到靜態文章資料：${slug}`);
  }
  return post;
}
