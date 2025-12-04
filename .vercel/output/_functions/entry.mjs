import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DLkjVjZM.mjs';
import { manifest } from './manifest_BtClqu2u.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/attractions.astro.mjs');
const _page2 = () => import('./pages/blog/whole-house-switch-socket-positioning.astro.mjs');
const _page3 = () => import('./pages/blog/_slug_.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/coming-soon.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/policies.astro.mjs');
const _page8 = () => import('./pages/portfolio/_slug_.astro.mjs');
const _page9 = () => import('./pages/portfolio.astro.mjs');
const _page10 = () => import('./pages/preview-login.astro.mjs');
const _page11 = () => import('./pages/requirement-form.astro.mjs');
const _page12 = () => import('./pages/rooms/deluxe-room.astro.mjs');
const _page13 = () => import('./pages/rooms/family-suite.astro.mjs');
const _page14 = () => import('./pages/rooms/lake-suite.astro.mjs');
const _page15 = () => import('./pages/rooms/villa.astro.mjs');
const _page16 = () => import('./pages/tools.astro.mjs');
const _page17 = () => import('./pages/transportation.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/attractions.astro", _page1],
    ["src/pages/blog/whole-house-switch-socket-positioning.astro", _page2],
    ["src/pages/blog/[slug].astro", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/coming-soon.astro", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/policies.astro", _page7],
    ["src/pages/portfolio/[slug].astro", _page8],
    ["src/pages/portfolio/index.astro", _page9],
    ["src/pages/preview-login.astro", _page10],
    ["src/pages/requirement-form.astro", _page11],
    ["src/pages/rooms/deluxe-room.astro", _page12],
    ["src/pages/rooms/family-suite.astro", _page13],
    ["src/pages/rooms/lake-suite.astro", _page14],
    ["src/pages/rooms/villa.astro", _page15],
    ["src/pages/tools/index.astro", _page16],
    ["src/pages/transportation.astro", _page17],
    ["src/pages/index.astro", _page18]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "1bd94d81-c13b-435e-8106-ac06294beab7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
