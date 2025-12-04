import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
    output: 'server',  // 啟用服務器模式以支持中間件
    adapter: vercel(),
});