import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_D7yWafUH.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DnsG0h9q.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
function getStaticPaths() {
  return [
    { params: { slug: "modern-nordic-apartment" } },
    { params: { slug: "industrial-loft" } },
    { params: { slug: "minimalist-japanese" } }
  ];
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const projectData = {
    "modern-nordic-apartment": {
      title: "\u73FE\u4EE3\u5317\u6B50\u98A8\u516C\u5BD3",
      bannerImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200",
      story: "\u9019\u662F\u4E00\u500B25\u576A\u7684\u6EAB\u99A8\u5C0F\u5B85\uFF0C\u5C4B\u4E3B\u5E0C\u671B\u6253\u9020\u5145\u6EFF\u81EA\u7136\u5149\u7DDA\u7684\u5317\u6B50\u98A8\u683C\u3002\u6211\u5011\u4F7F\u7528\u5927\u91CF\u767D\u8272\u8207\u6728\u8CEA\u5143\u7D20\uFF0C\u642D\u914D\u7DA0\u8272\u690D\u683D\uFF0C\u5275\u9020\u51FA\u8212\u9069\u653E\u9B06\u7684\u5C45\u5BB6\u6C1B\u570D\u3002",
      gallery: [
        "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
        "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600"
      ]
    }
  };
  const project = projectData[slug] || projectData["modern-nordic-apartment"];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": `${project.title} - \u4F5C\u54C1\u96C6` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full"> <img${addAttribute(project.bannerImage, "src")}${addAttribute(project.title, "alt")} class="w-full h-96 object-cover"> </div> <div class="container mx-auto px-4 py-16"> <h1 class="text-4xl font-bold mb-8">${project.title}</h1> <div class="prose max-w-none mb-12"> <h2 class="text-2xl font-bold mb-4">設計故事</h2> <p class="text-gray-700 text-lg leading-relaxed">${project.story}</p> </div> <div> <h2 class="text-2xl font-bold mb-6">作品圖集</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${project.gallery.map((image) => renderTemplate`<img${addAttribute(image, "src")} alt="作品圖片" class="w-full h-64 object-cover rounded-lg shadow-md">`)} </div> </div> </div> ` })}`;
}, "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/\u6211\u7684\u96F2\u7AEF\u786C\u789F/03_\u8CC7\u6E90\u8207\u8208\u8DA3 (Resources)/01_\u77E5\u8B58\u9AD4\u7CFB/\u7A0B\u5F0F\u8A2D\u8A08/\u590F\u6D1B\u514B\u6C11\u5BBF\u65B0\u7DB2\u7AD9/src/pages/portfolio/[slug].astro", void 0);

const $$file = "/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站/src/pages/portfolio/[slug].astro";
const $$url = "/portfolio/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
