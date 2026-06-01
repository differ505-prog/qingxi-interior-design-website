import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
    site: 'https://qingxidesign.tw',
    output: 'server',  // 啟用服務器模式以支持中間件
    adapter: vercel(),
    vite: {
      server: {
        allowedHosts: true
      }
    }
});
