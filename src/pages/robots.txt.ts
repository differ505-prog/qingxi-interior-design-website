import type { APIRoute } from "astro";
import { SITE_ORIGIN } from "../lib/site-metadata";

const disallowPaths = [
  "/preview-login",
  "/coming-soon",
  "/consultation-thank-you",
];

export const GET: APIRoute = () => {
  const body = `User-agent: *
Allow: /
${disallowPaths.map((path) => `Disallow: ${path}`).join("\n")}

Sitemap: ${SITE_ORIGIN}/sitemap.xml
Host: ${new URL(SITE_ORIGIN).hostname}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
