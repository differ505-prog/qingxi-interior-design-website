// 密碼保護配置文件
// 修改密碼時只需要編輯這個文件

export const PASSWORD_PROTECTION_CONFIG = {
    // 是否啟用密碼保護（true = 啟用，false = 關閉）
    // 本地開發時會自動關閉，線上部署時會啟用
    enabled: true,

    // 訪問密碼（請修改為您想要的密碼）
    password: "wife2024",

    // Cookie 有效期（天數）
    cookieMaxAge: 7,
};

// 檢查是否為本地開發環境
export const isLocalDevelopment = () => {
    return import.meta.env.DEV || false;
};
