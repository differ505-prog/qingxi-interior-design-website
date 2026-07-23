import {
  getTrackChapters,
  inferChapterFromTrack,
  inferSubchapterFromTrack,
  inferTrackFromText,
  normalizeSiteCategory,
  normalizeTagList,
  normalizeTrack,
} from "./content-taxonomy";
import { SITE_NAME, SITE_ORIGIN } from "./site-metadata";

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
  editorialRefreshStamp?: string;
}

interface StaticBlogArticlePageOptions {
  publishedTime?: string;
  modifiedTime?: string;
  includePublisherLogo?: boolean;
  includeEditorialRefreshStamp?: boolean;
  /**
   * 外部 LLM 输出一整篇图文 HTML 時，直接傳入含【圖說】標記的 HTML。
   * 系統會自動呼叫 processBlogContent() 轉換為語意化的 figure 結構。
   */
  htmlContent?: string;
}

interface StaticBlogArticleLayoutProps {
  title: string;
  description: string;
  ogImage: string;
  publishedTime: string;
  modifiedTime: string;
  track: string;
  chapter: string;
  siteCategory: string;
  tags: string[];
  editorialRefreshStamp?: string;
}

export interface StaticBlogArticlePageData {
  articleMeta: BlogCatalogPost;
  articleTitle: string;
  articleDescription: string;
  articleImage: string;
  articlePublishedTime: string;
  articleModifiedTime: string;
  articleStructuredData: Record<string, unknown>[];
  articleLayoutProps: StaticBlogArticleLayoutProps;
  /**
   * 經 processBlogContent() 處理過的 HTML 內容。
   * 用於外部 LLM 直接输出一整篇图文文章的场景，
   * 包含【圖說】标记的 HTML 会被自动转换为 <figure> + <figcaption> 结构。
   */
  articleHtmlContent?: string;
}

export const DEFAULT_BLOG_COVER_IMAGE =
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200";

export const staticBlogPosts: BlogCatalogPost[] = [
  {
    title: "水電更新：老屋基礎工程的迴路重整與用電安全",
    slug: "old-house-rewiring-and-electrical-safety",
    date: "2026-07-02",
    summary:
      "面對老屋翻新，判斷翻新範圍最關鍵的指標往往是看不見的水電管線。隨著生活型態改變與高功率家電普及，20 年前的電路早已無法負荷現今的用電需求。本文拆解水電更新與迴路重整的必要性，帶您看懂隱蔽工程為何是居住安全的基石。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "基礎工程",
    subchapter: "水電更新",
    tags: ["老屋翻新", "水電翻新", "迴路重整", "專用迴路", "漏電斷路器", "用電安全"],
    coverImage: "/images/blog/old-house-rewiring-and-electrical-safety-cover.png",
    editorialRefreshStamp: "2026-07-02",
  },
  {
    slug: "old-house-renovation-scope-guide",
    title: "翻新範圍：減法評估與預算分配準則",
    summary: "界定老屋翻新範圍，不是從想做多少開始，而是先建立基礎工程優先、生活軌跡盤點與預算收斂的三層檢核。本文從屋齡級距、收納機能到 Need vs Want 取捨，整理出更穩定的翻新減法邏輯。",
    coverImage: "/images/blog/old-house-renovation-scope-guide-cover.png",
    category: "知識分享",
    track: "老屋翻新系",
    chapter: "現況判讀",
    subchapter: "翻新範圍",
    siteCategory: "老屋翻新",
    tags: ["範圍評估", "基礎工程", "預算分配", "Need vs Want", "收納規劃"],
    date: "2026-06-29T22:30:00.000Z",
    editorialRefreshStamp: "2026-07-02",
  },
  {
    title: "老屋翻新完工驗收：水電、泥作與系統櫃的量化檢核表（附尾款撥付原則）",
    slug: "old-house-renovation-acceptance-checklist",
    date: "2026-06-29",
    summary:
      "老屋翻新的完工驗收，不僅是檢視視覺美感，更是確認未來居住安全的關鍵防線。本文整理水路、電工、泥作與木作驗收的核心量化標準，並補入老屋特例與尾款撥付原則，幫助建立客觀的檢視與保障機制。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "完工避雷",
    subchapter: "驗收重點",
    tags: ["老屋翻新", "完工驗收", "閉水測試", "絕緣電阻", "泥作平整度", "系統櫃公差", "尾款撥付"],
    coverImage: "/images/blog/old-house-renovation-acceptance-checklist-cover.png",
    editorialRefreshStamp: "2026-07-02",
  },
  {
    title: "格局重整：結構、採光與動線的空間配置邏輯",
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
    title: "智能居家系統：從平台生態到配電協定，回歸生活場景的決策心法與預算評估",
    slug: "smart-home-system-ecosystem-guide",
    date: "2026-06-23",
    summary:
      "整理全屋智能居家規劃中，平台生態、設備協定與底層配電的決策重點。本文補入零線、底盒深度、網關拓樸、費用區間與智能前置檢核表，幫助建立穩定、好用且符合預算的雙層智能架構。",
    siteCategory: "智能家居",
    category: "智能家居",
    track: "水電照明系",
    chapter: "智能控制",
    subchapter: "語音整合",
    tags: ["智能家居", "Apple Home", "Aqara", "Zigbee", "Thread", "零線預留", "智能預算"],
    coverImage: "/images/blog/smart-home-system-ecosystem-guide-cover.png",
    editorialRefreshStamp: "2026-07-02",
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
    title: "老屋翻新啟動前：精準盤點屋況的 5 個核心判斷點與硬指標",
    slug: "old-house-condition-assessment-guide",
    date: "2026-06-18",
    summary:
      "老屋翻新決定成敗的是隱藏在牆體之下的體質。本文解析結構裂縫、台電申請安培數、專用迴路、鋁窗水密與樓板隔音地墊等五大核心硬指標，並附上工班初勘對話檢核表。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "現況判讀",
    subchapter: "屋況盤點",
    tags: ["老屋翻新", "屋況盤點", "結構裂縫", "水電更新", "氣密窗", "樓板隔音", "檢核表"],
    coverImage: "/images/blog/old-house-condition-assessment-cover.png",
    editorialRefreshStamp: "2026-07-06",
  },
  {
    title: "發包合約與工班比價：老屋翻新的責任界線與付款條款",
    slug: "old-house-contracting-budget-and-boundaries",
    date: "2026-07-06",
    summary:
      "老屋翻新發包與合約本質上是一場風險管理的共識建立。本文從基礎工程的預算占比、報價單的拆分粒度，到採購權責界線與分期付款條款，提供完整的防禦機制與檢核對照表。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "預算拆解",
    subchapter: "發包合約",
    tags: ["老屋翻新", "裝修預算", "發包合約", "比價邏輯", "責任界線", "付款條款"],
    coverImage: "/images/blog/old-house-contracting-budget-and-boundaries-cover.png",
    editorialRefreshStamp: "2026-07-06",
  },
  {
    title: "全室預算拆解：報價單判讀與超支預防指南",
    slug: "full-room-renovation-budget-breakdown-and-quote-guide",
    date: "2026-07-04",
    summary:
      "老屋翻新最常見的超支，往往源於對屋況判讀的輕忽與看不懂報價單的細節。本文從 15 至 20 年屋齡基準出發，拆解全室預算、整理隱蔽工程檢核重點與報價單關鍵字，協助在前期精準把控資源。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "現況判讀",
    subchapter: "迷思破解",
    tags: ["老屋翻新", "裝修預算", "報價單判讀", "超支預防", "屋況盤點", "隱蔽工程"],
    coverImage: "/images/blog/full-room-renovation-budget-breakdown-cover.png",
    editorialRefreshStamp: "2026-07-04",
  },
  {
    title: "局部預算拆解：客廳天地壁與家具配置費用",
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
    title: "防水地坪：老屋防水修復與地坪施作基準",
    slug: "old-house-waterproofing-and-flooring-standards",
    date: "2026-07-23",
    summary:
      "老屋翻新中，地坪的價值在於底下看不見的防水與平整度。當屋齡超過 15 至 20 年，地坪翻新往往伴隨管線與防水挑戰。本文拆解防水修復與地坪施作核心基準，幫助在隱蔽工程中，將預算花在建築的安定底氣上。",
    siteCategory: "老屋翻新",
    category: "老屋翻新",
    track: "老屋翻新系",
    chapter: "基礎工程",
    subchapter: "防水地坪",
    tags: ["老屋翻新", "防水工程", "地坪翻新", "隱蔽工程", "泥作打底", "閉水測試"],
    coverImage: "/images/blog/老屋防水地坪基準-封面主圖.jpeg",
    editorialRefreshStamp: "2026-07-23",
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

function resolveArticleTimestamp(value: string) {
  return value.includes("T") ? value : `${value}T00:00:00+08:00`;
}

function toAbsoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : new URL(value, SITE_ORIGIN).toString();
}

export function processBlogContent(html: string): string {
  let result = html;

  // 1. 移除 img wrapper 內的浮水印覆蓋元素
  result = result.replace(
    /<!--\s*AI-Generated watermark overlay\s*-->\s*<span[^>]*class="watermark-cover[^"]*"[^>]*><\/span>/gi,
    "",
  );

  // 2. 移除獨立的浮水印遮罩 span
  result = result.replace(
    /<span[^>]*class="[^"]*watermark[^"]*"[^>]*>[\s\S]*?<\/span>/gi,
    "",
  );

  // 3. 轉換【圖說】標記為 <figure> 結構
  result = result.replace(
    /【圖說】\s*(<img[^>]*>)\s*([^\n<](?:[^\n<]*(?!\n\n|<[a-z]))*)/gi,
    (_match, imgTag, caption) => {
      const cleanCaption = caption.trim();
      const srcMatch = imgTag.match(/src="([^"]*)"/);
      const altMatch = imgTag.match(/alt="([^"]*)"/);
      const src = srcMatch ? srcMatch[1] : "";
      const alt = altMatch ? altMatch[1] : cleanCaption;
      return `<figure class="article-figure"><img src="${src}" alt="${alt}" loading="lazy" /><figcaption>${cleanCaption}</figcaption></figure>`;
    },
  );

  // 4. 對已存在但缺少 class="article-figure" 的 <figure> 補上 class
  result = result.replace(
    /<figure(?![^>]*class="article-figure")/gi,
    '<figure class="article-figure"',
  );

  // 5. 對缺少 <figcaption> 的 figure 自動從 alt 補上
  result = result.replace(
    /(<figure class="article-figure">[\s\S]*?<img[^>]*alt="([^"]*)"[^>]*>)(?![\s\S]*?<figcaption>)/gi,
    (_match, prefix, alt) => `${prefix}<figcaption>${alt}</figcaption>`,
  );

  return result;
}

export function getStaticBlogArticlePage(
  slug: string,
  {
    publishedTime,
    modifiedTime,
    includePublisherLogo = false,
    includeEditorialRefreshStamp = false,
    htmlContent,
  }: StaticBlogArticlePageOptions = {},
): StaticBlogArticlePageData {
  const articleMeta = getStaticBlogPost(slug);
  const articleTitle = articleMeta.title;
  const articleDescription = articleMeta.summary;
  const articleImage = articleMeta.coverImage;
  const articlePublishedTime = publishedTime || resolveArticleTimestamp(articleMeta.date);
  const articleModifiedTime =
    modifiedTime ||
    (articleMeta.editorialRefreshStamp
      ? resolveArticleTimestamp(articleMeta.editorialRefreshStamp)
      : articlePublishedTime);

  const publisher: Record<string, unknown> = {
    "@type": "Organization",
    name: SITE_NAME,
  };

  if (includePublisherLogo) {
    publisher.logo = {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/images/logo.png"),
    };
  }

  const articleStructuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: articleTitle,
      description: articleDescription,
      image: [toAbsoluteUrl(articleImage)],
      datePublished: articlePublishedTime,
      dateModified: articleModifiedTime,
      articleSection: articleMeta.track,
      keywords: articleMeta.tags.join(", "),
      author: {
        "@type": "Organization",
        name: SITE_NAME,
      },
      publisher,
      mainEntityOfPage: toAbsoluteUrl(`/blog/${slug}`),
    },
  ];

  const articleLayoutProps: StaticBlogArticleLayoutProps = {
    title: articleTitle,
    description: articleDescription,
    ogImage: articleImage,
    publishedTime: articlePublishedTime,
    modifiedTime: articleModifiedTime,
    track: articleMeta.track,
    chapter: articleMeta.chapter,
    siteCategory: articleMeta.siteCategory,
    tags: articleMeta.tags,
  };

  if (includeEditorialRefreshStamp && articleMeta.editorialRefreshStamp) {
    articleLayoutProps.editorialRefreshStamp = articleMeta.editorialRefreshStamp;
  }

  const articleHtmlContent = htmlContent ? processBlogContent(htmlContent) : undefined;

  return {
    articleMeta,
    articleTitle,
    articleDescription,
    articleImage,
    articlePublishedTime,
    articleModifiedTime,
    articleStructuredData,
    articleLayoutProps,
    articleHtmlContent,
  };
}
