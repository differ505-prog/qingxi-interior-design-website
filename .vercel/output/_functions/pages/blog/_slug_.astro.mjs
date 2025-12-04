import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DnsG0h9q.mjs';
import * as contentful from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  try {
    const client = contentful.createClient({
      space: "yjw7maktjibt",
      accessToken: "hfdEXgS4kY6-Xktou9n8FURWVhanDwaR8FAJNLD9obc",
      environment: "master"
    });
    const response = await client.getEntries({
      content_type: "blogPost"
    });
    return response.items.map((item) => ({
      params: { slug: item.fields.slug }
    }));
  } catch (error) {
    console.error("Contentful 連接錯誤:", error);
    return [];
  }
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const client = contentful.createClient({
    space: "yjw7maktjibt",
    accessToken: "hfdEXgS4kY6-Xktou9n8FURWVhanDwaR8FAJNLD9obc",
    environment: "master"
  });
  let response;
  try {
    response = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1
    });
  } catch (error) {
    console.error("Contentful 連接錯誤:", error);
    return Astro2.redirect("/blog");
  }
  if (response.items.length === 0) {
    return Astro2.redirect("/404");
  }
  const item = response.items[0];
  const post = {
    title: item.fields.title,
    slug: item.fields.slug,
    date: new Date(item.fields.date).toISOString().split("T")[0],
    summary: item.fields.summary,
    category: item.fields.category,
    content: item.fields.content,
    coverImage: item.fields.coverImage?.fields?.file?.url ? `https:${item.fields.coverImage.fields.file.url}` : "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200"
  };
  const contentHtml = documentToHtmlString(post.content);
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${post.title} - 青曦空間設計`, "data-astro-cid-4sn4zg3r": true }, { "default": async ($$result2) => renderTemplate`${maybeRenderHead()}<article style="padding: 4rem 1rem;" data-astro-cid-4sn4zg3r><div class="article-header" data-astro-cid-4sn4zg3r><span class="article-category" data-astro-cid-4sn4zg3r>${post.category}</span><h1 class="article-title" data-astro-cid-4sn4zg3r>${post.title}</h1><p class="article-date" data-astro-cid-4sn4zg3r>${post.date}</p></div><div class="article-cover" data-astro-cid-4sn4zg3r><img${addAttribute(post.coverImage, "src")}${addAttribute(post.title, "alt")} data-astro-cid-4sn4zg3r></div><div class="article-content" data-astro-cid-4sn4zg3r>${unescapeHTML(contentHtml)}</div><div style="text-align: center; margin-top: 3rem;" data-astro-cid-4sn4zg3r><a href="/blog" class="back-link" data-astro-cid-4sn4zg3r>← 返回知識分享</a></div></article>` })}`;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/blog/[slug].astro", void 0);
const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/blog/[slug].astro";
const $$url = "/blog/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
