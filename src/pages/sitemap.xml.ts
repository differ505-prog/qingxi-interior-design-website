import type { APIRoute } from "astro";
import * as contentful from "contentful";
import { CORE_SITE_PAGES, SITE_ORIGIN } from "../lib/site-metadata";

const STATIC_ROUTES: Array<{ path: string; priority: number; changefreq: string }> = [
  ...CORE_SITE_PAGES.map((page) => ({ path: page.path, priority: page.path === "/" ? 1.0 : 0.8, changefreq: page.path === "/" ? "weekly" : "monthly" })),
  { path: "/policies", priority: 0.3, changefreq: "yearly" },
  { path: "/portfolio/modern-nordic-apartment", priority: 0.7, changefreq: "monthly" },
  { path: "/portfolio/industrial-loft", priority: 0.7, changefreq: "monthly" },
  { path: "/portfolio/minimalist-japanese", priority: 0.7, changefreq: "monthly" },
];

const unique = <T,>(items: T[]) => [...new Set(items)];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

async function getDynamicBlogRoutes() {
  if (!import.meta.env.CONTENTFUL_SPACE_ID || !import.meta.env.CONTENTFUL_ACCESS_TOKEN) {
    return [];
  }

  try {
    const client = contentful.createClient({
      space: import.meta.env.CONTENTFUL_SPACE_ID,
      accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
      environment: "master",
    });

    const response = await client.getEntries({
      content_type: "blogPost",
      select: ["fields.slug"],
      limit: 100,
    });

    return response.items
      .map((item: any) => item.fields?.slug)
      .filter((slug: unknown): slug is string => typeof slug === "string" && Boolean(slug.trim()))
      .map((slug) => ({ path: `/blog/${slug}`, priority: 0.6, changefreq: "monthly" as const }));
  } catch (error) {
    console.error("無法生成 Contentful 文章 sitemap：", error);
    return [];
  }
}

type SitemapEntry = { path: string; priority: number; changefreq: string };

export const GET: APIRoute = async () => {
  const dynamicBlogRoutes = await getDynamicBlogRoutes();
  const allRoutes = unique<SitemapEntry>([...STATIC_ROUTES, ...dynamicBlogRoutes]);
  const lastmod = new Date().toISOString().split("T")[0];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((entry) => {
    const loc = new URL(entry.path, SITE_ORIGIN).toString();
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${entry.priority.toFixed(1)}</priority>
    <changefreq>${entry.changefreq}</changefreq>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
