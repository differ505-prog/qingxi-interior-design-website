---
// 這是一個臨時的調試端點，用來檢查環境變數
const envCheck = {
    preview_protection_enabled: {
        process_env: process.env.PREVIEW_PROTECTION_ENABLED,
        import_meta_env: import.meta.env.PREVIEW_PROTECTION_ENABLED,
        final_value: process.env.PREVIEW_PROTECTION_ENABLED === 'true' || import.meta.env.PREVIEW_PROTECTION_ENABLED === 'true'
    },
    preview_password: {
        process_env: process.env.PREVIEW_PASSWORD ? '***set***' : 'not set',
        import_meta_env: import.meta.env.PREVIEW_PASSWORD ? '***set***' : 'not set',
    },
    all_env_keys: Object.keys(process.env).filter(key => key.includes('PREVIEW') || key.includes('CONTENTFUL'))
};

return new Response(JSON.stringify(envCheck, null, 2), {
    headers: {
        'Content-Type': 'application/json'
    }
});
---
