import {
  getTrackChapters,
  inferChapterFromTrack,
  inferSubchapterFromTrack,
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
  subchapter?: string;
  tags: string[];
  coverImage: string;
}

export const DEFAULT_BLOG_COVER_IMAGE =
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200";

export const staticBlogPosts: BlogCatalogPost[] = [
  {
    title: "水電更新與迴路重整：老屋翻新無法妥協的隱蔽工程與安全基準",
    slug: "old-house-rewiring-and-electrical-safety",
    date: "2026-07-02",
    summary:
      "面對老屋翻新，判斷翻新範圍最關鍵的指標往往是看不見的水電管線。隨著生活型態改變與高功率家電普及，20 年前的電路早已無法負荷現代需求。本文拆解水電更新與迴路重整的必要性，帶您看懂隱蔽工程為何是居住安全的基石。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "現況判讀",
    subchapter: "水電安全",
    tags: ["老屋翻新", "水電更新", "迴路重整", "隱蔽工程", "用電安全", "基礎工程"],
    coverImage: "/images/blog/old-house-condition-assessment-cover.png",
  },
  {
    slug: "old-house-renovation-scope-guide",
    title: "老屋翻新範圍怎麼抓？從屋況盤點到關鍵判斷點的完整評估指南",
    summary: "老屋翻新宛如一場資源分配的考驗，面對有限的預算與修繕項目，該如何界定翻新範圍？本文帶您梳理「基礎工程優先」、「生活軌跡盤點」與「預算收斂」三大核心判斷點，幫助您釐清必做與選做項目，找回面對老屋改造的安定感。",
    coverImage: "/images/blog/old-house-renovation-scope-guide-cover.png",
    category: "知識分享",
    track: "老屋翻新系",
    chapter: "現況判讀",
    subchapter: "翻新範圍",
    siteCategory: "老屋翻新",
    tags: ["範圍評估", "基礎工程", "預算分配", "格局更動"],
    date: "2026-06-29T22:30:00.000Z",
  },
  {
    title: "老屋翻新驗收重點怎麼看？最容易忽略的重點整理",
    slug: "old-house-renovation-acceptance-checklist",
    date: "2026-06-29",
    summary:
      "老屋翻新的完工驗收，不僅是檢視視覺美感，更是確認未來居住安全的關鍵防線。本文整理水路、防水、電工、泥作與木作驗收時最容易忽略的重點，幫助建立清晰的檢視邏輯。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "完工避雷",
    subchapter: "驗收重點",
    tags: ["老屋翻新", "完工驗收", "防水測試", "電箱迴路", "泥作平整", "系統櫃五金"],
    coverImage: "/images/blog/old-house-renovation-acceptance-checklist-cover.png",
  },
  {
    title: "老屋翻新格局怎麼調才順？從結構、採光到動線的空間重整邏輯",
    slug: "old-house-layout-strategy",
    date: "2026-06-25",
    summary:
      "整理老屋翻新格局重整時最關鍵的三個判斷維度，從結構邊界、採光通風到生活動線，幫助在工程前期建立更安穩的空間重整邏輯。",
    siteCategory: "格局動線",
    category: "格局動線",
    track: "老屋翻新系",
    chapter: "空間重整",
    subchapter: "格局調整",
    tags: ["老屋翻新", "格局動線", "空間重整", "採光通風", "生活動線", "結構判讀"],
    coverImage: "/images/blog/old-house-layout-strategy-cover.png",
  },
  {
    title: "智能居家系統建置指南：從平台生態到設備協定，回歸生活場景的決策心法",
    slug: "smart-home-system-ecosystem-guide",
    date: "2026-06-23",
    summary:
      "整理智能居家規劃中平台生態、設備協定與底層配電的決策重點，從跨平台整合到單一品牌深度生態，幫助回到真正的生活場景判斷。",
    siteCategory: "智能家居",
    category: "智能家居",
    track: "水電照明系",
    chapter: "智能控制",
    subchapter: "語音整合",
    tags: ["智能家居", "Apple Home", "Aqara", "Zigbee", "Thread", "智能控制"],
    coverImage: "/images/blog/smart-home-system-ecosystem-guide-cover.png",
  },
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
    subchapter: "拆除泥作",
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
    subchapter: "屋況盤點",
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
    subchapter: "預算分級",
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
    subchapter: "插座迴路",
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
    const subchapter =
      String(fields.subchapter ?? "").trim() ||
      inferSubchapterFromTrack(track, chapter, rawCategory, title, summary);
    const tags = Array.from(
      new Set(
        [
          ...normalizeTagList(fields.tags),
          siteCategory,
          track,
          chapter,
          subchapter,
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
      subchapter,
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
