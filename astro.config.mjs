import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
    output: 'server',  // 啟用服務器模式以支持中間件
    adapter: vercel(),
    server: {
        port: 4322,  // 使用 4322 端口,避免與室內設計公司網站(4321)衝突
        host: true
    }
});