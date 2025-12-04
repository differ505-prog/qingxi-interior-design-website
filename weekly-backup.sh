#!/bin/bash
# 📦 每週自動備份腳本
# 使用方法: ./weekly-backup.sh
# 建議: 每週日執行一次

set -e

echo "📦 開始每週備份程序..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 專案路徑
PROJECT_DIR="/Users/liangzhiwei/Library/CloudStorage/GoogleDrive-xdstudiooffice@gmail.com/我的雲端硬碟/03_資源與興趣 (Resources)/01_知識體系/程式設計/夏洛克民宿新網站"

cd "$PROJECT_DIR"

# 確保工作目錄乾淨
if [[ -n $(git status -s) ]]; then
    echo "⚠️  發現未提交的變更"
    echo ""
    git status -s
    echo ""
    read -p "是否先提交這些變更？(y/N) " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "chore: 每週備份前的變更提交 $(date +%Y-%m-%d)"
        git push origin main
        echo "✅ 變更已提交"
    fi
fi

# 創建帶日期的備份標記
BACKUP_TAG="weekly-backup-$(date +%Y%m%d)"

echo ""
echo "📌 創建備份標記: $BACKUP_TAG"

# 創建 Git tag
git tag -a "$BACKUP_TAG" -m "每週自動備份 - $(date +%Y年%m月%d日)"

# 推送 tag 到 GitHub
git push origin "$BACKUP_TAG"

echo "✅ 備份標記已創建並推送到 GitHub"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 備份完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 備份資訊："
echo "   標記名稱: $BACKUP_TAG"
echo "   當前版本: $(git rev-parse --short HEAD)"
echo "   備份時間: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""
echo "📝 恢復方法："
echo "   git checkout $BACKUP_TAG"
echo ""
echo "🔍 查看所有備份："
echo "   git tag -l 'weekly-backup-*'"
echo ""
