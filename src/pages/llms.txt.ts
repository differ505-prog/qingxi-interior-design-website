import type { APIRoute } from "astro";
import {
  AI_DISCOVERY_NOTES,
  CORE_SITE_PAGES,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
} from "../lib/site-metadata";

export const GET: APIRoute = () => {
  const body = `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## Brand Positioning
${AI_DISCOVERY_NOTES.positioning}

## Service Area
${AI_DISCOVERY_NOTES.serviceArea}

## Specialties
${AI_DISCOVERY_NOTES.specialties.map((item) => `- ${item}`).join("\n")}

## Trust Signals
${AI_DISCOVERY_NOTES.trustSignals.map((item) => `- ${item}`).join("\n")}

## Recommended Pages
${CORE_SITE_PAGES.map((page) => `- ${SITE_ORIGIN}${page.path} | ${page.title} | ${page.summary}`).join("\n")}

## Contact
- Website: ${SITE_ORIGIN}
- Contact Page: ${SITE_ORIGIN}/contact
- Requirement Form: ${SITE_ORIGIN}/requirement-form
- LINE: https://lin.ee/U1HCeW4
- Email: qingxi.ds@outlook.com
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
