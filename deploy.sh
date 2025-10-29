#!/bin/bash

# GitHub和Vercel部署脚本
# 使用方法: ./deploy.sh YOUR_GITHUB_USERNAME

set -e

GITHUB_TOKEN="YOUR_GITHUB_TOKEN"  # 请替换为你的 GitHub Token
VERCEL_TOKEN="UFdfTYS1lJixOOZccMsdiunC"
REPO_NAME="secretflow-demo"

if [ -z "$1" ]; then
    echo "❌ 错误: 请提供GitHub用户名"
    echo "使用方法: ./deploy.sh YOUR_GITHUB_USERNAME"
    exit 1
fi

GITHUB_USERNAME=$1
REPO_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo "🚀 开始部署流程..."

# 检查Git远程仓库是否已配置
if ! git remote get-url origin &>/dev/null; then
    echo "📦 配置Git远程仓库..."
    git remote add origin $REPO_URL
else
    echo "✅ Git远程仓库已配置"
fi

# 提交所有更改
echo "📝 提交代码更改..."
git add .
if git diff --staged --quiet; then
    echo "ℹ️  没有需要提交的更改"
else
    git commit -m "更新: $(date '+%Y-%m-%d %H:%M:%S')" || echo "⚠️  提交失败或无需提交"
fi

# 推送到GitHub
echo "⬆️  推送到GitHub..."
git push https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git main || \
git push -u origin main || \
echo "⚠️  推送失败，请手动检查GitHub仓库是否已创建"

echo ""
echo "✅ GitHub推送完成！"
echo ""
echo "📋 下一步操作："
echo "1. 确认GitHub仓库已创建: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"
echo "2. 在Vercel中导入项目: https://vercel.com/new"
echo "   或使用CLI: vercel --prod"
echo ""
echo "🌐 部署完成后，网站将可通过Vercel生成的链接访问"

