#!/bin/bash
# 🚨 緊急恢復腳本 - 網站被駭時一鍵恢復
# 使用方法: ./emergency-restore.sh

set -e  # 遇到錯誤立即停止

echo "🚨 開始緊急恢復程序..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 專案路徑
PROJECT_DIR="/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站"

cd "$PROJECT_DIR"

# 顯示當前狀態
echo ""
echo "📊 當前狀態："
git log --oneline -3

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 可用的安全備份點："
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 755e6e2 - Phase 1+2+3 完整優化 (2025-12-04) ⭐ 最新"
echo "2. 7e03782 - 密碼保護功能"
echo "3. a7298e6 - 環境變數修復"
echo ""

# 預設恢復到最新的安全版本
SAFE_COMMIT="755e6e2"

echo "將恢復到最新安全版本: $SAFE_COMMIT"
echo ""
read -p "確定要繼續嗎？(y/N) " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo ""
    echo "⏳ 正在回滾到安全版本..."
    
    # 回滾到安全版本
    git reset --hard $SAFE_COMMIT
    
    echo "✅ 本地代碼已恢復"
    echo ""
    echo "⏳ 正在推送到 GitHub..."
    
    # 強制推送到遠端
    git push origin main --force
    
    echo "✅ GitHub 已更新"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 恢復完成！"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "📋 後續步驟："
    echo "1. Vercel 會在 1-2 分鐘內自動重新部署"
    echo "2. 請前往 https://vercel.com 確認部署狀態"
    echo "3. 建議更改 GitHub 和 Vercel 密碼"
    echo "4. 檢查 GitHub Settings → Branches 確保保護已啟用"
    echo ""
else
    echo "❌ 操作已取消"
    exit 1
fi
