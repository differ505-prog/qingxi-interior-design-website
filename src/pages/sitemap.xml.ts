import type { APIRoute } from "astro";
import * as contentful from "contentful";
import { CORE_SITE_PAGES, SITE_ORIGIN } from "../lib/site-metadata";

const STATIC_ROUTES = [
  ...CORE_SITE_PAGES.map((page) => page.path),
  "/policies",
  "/portfolio/modern-nordic-apartment",
  "/portfolio/industrial-loft",
  "/portfolio/minimalist-japanese",
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
      .map((slug) => `/blog/${slug}`);
  } catch (error) {
    console.error("無法生成 Contentful 文章 sitemap：", error);
    return [];
  }
}

export const GET: APIRoute = async () => {
  const dynamicBlogRoutes = await getDynamicBlogRoutes();
  const allRoutes = unique([...STATIC_ROUTES, ...dynamicBlogRoutes]);
  const lastmod = new Date().toISOString().split("T")[0];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map((path) => {
    const loc = new URL(path, SITE_ORIGIN).toString();
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
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
