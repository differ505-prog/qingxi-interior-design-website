import {
  getTrackChapters,
  inferChapterFromTrack,
  inferTrackFromText,
  normalizeSiteCategory,
  normalizeTagList,
  normalizeTrack,
} from "./content-taxonomy";

export interface BlogCatalogPost {
  title: string;
  slug: string;
  date: string;
  summary: string;
  siteCategory: string;
  category: string;
  track: string;
  chapter: string;
  tags: string[];
  coverImage: string;
}

export const DEFAULT_BLOG_COVER_IMAGE =
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200";

export const staticBlogPosts: BlogCatalogPost[] = [
  {
    title: "奠定老屋重生的基礎：拆除與泥作的進場順序與施作細節",
    slug: "old-house-renovation-demolition-and-masonry-sequence",
    date: "2026-06-22",
    summary:
      "整理老屋翻新基礎工程中拆除與泥作的正確進場邏輯，從防護、拆除、清運檢查到砌磚、打底與防水，幫助建立更穩定的施工順序觀念。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "基礎工程",
    tags: ["老屋翻新", "基礎工程", "拆除工程", "泥作工程", "防水", "施工順序"],
    coverImage: "/images/blog/old-house-demolition-masonry-cover.png",
  },
  {
    title: "啟動老屋翻新之前：精準盤點屋況的 5 個核心判斷點",
    slug: "old-house-condition-assessment-guide",
    date: "2026-06-18",
    summary:
      "整理老屋翻新啟動前最該優先確認的五個屋況判斷點，從結構、防水、水電到採光與隔音，幫助預算與設計決策更有依據。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "現況判讀",
    tags: ["老屋翻新", "屋況盤點", "結構防水", "水電管線", "採光通風", "隔音"],
    coverImage: "/images/blog/old-house-condition-assessment-cover.png",
  },
  {
    title: "客廳局部改造預算怎麼抓？天花板、地板與家具的費用拆解與取捨",
    slug: "living-room-partial-renovation-budget",
    date: "2026-06-17",
    summary:
      "拆解客廳局部改造的預算分配邏輯，從天花板、地板到家具更新，整理硬裝、軟裝與隱形成本的取捨思路。",
    siteCategory: "裝修預算",
    category: "裝修預算",
    track: "老屋翻新系",
    chapter: "預算拆解",
    tags: ["客廳", "局部翻新", "裝修預算", "天花板", "地板", "家具"],
    coverImage: "/images/blog/living-room-budget-cover.png",
  },
  {
    title: "畫出家的神經系統——全屋開關與插座的最適定位",
    slug: "whole-house-switch-socket-positioning",
    date: "2025-11-12",
    summary:
      "整理全屋開關與插座定位原則，從生活動線、家具尺寸到常見錯誤，幫助裝修前先把隱蔽工程規劃清楚。",
    siteCategory: "水電照明",
    category: "水電照明",
    track: "水電照明系",
    chapter: "插座開關",
    tags: ["插座", "開關", "迴路", "動線", "家具尺寸"],
    coverImage: "/images/blog/插座被沙發遮蓋住.png",
  },
];

export function mapContentfulBlogPosts(items: any[]): BlogCatalogPost[] {
  return items.map((item) => {
    const fields = item.fields ?? {};
    const title = String(fields.title ?? "");
    const summary = String(fields.summary ?? "");
    const rawCategory = String(fields.category ?? fields.siteCategory ?? "");
    const track =
      normalizeTrack(String(fields.track ?? "")) ||
      inferTrackFromText(rawCategory, title, summary);
    const chapter =
      String(fields.chapter ?? "").trim() ||
      inferChapterFromTrack(track, rawCategory, title, summary) ||
      getTrackChapters(track)[0] ||
      "";
    const siteCategory = normalizeSiteCategory(rawCategory) || normalizeSiteCategory(track) || rawCategory.trim();
    const tags = Array.from(
      new Set(
        [
          ...normalizeTagList(fields.tags),
          siteCategory,
          track,
          chapter,
        ].filter(Boolean),
      ),
    );

    return {
      title,
      slug: String(fields.slug ?? ""),
      date: new Date(String(fields.date ?? "")).toISOString().split("T")[0],
      summary,
      siteCategory,
      category: siteCategory,
      track,
      chapter,
      tags,
      coverImage: fields.coverImage?.fields?.file?.url
        ? `https:${fields.coverImage.fields.file.url}`
        : DEFAULT_BLOG_COVER_IMAGE,
    };
  });
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
