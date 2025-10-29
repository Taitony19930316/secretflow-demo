#!/bin/bash

# GitHub 和 Gitee Pages 一键部署脚本
# 使用方法: ./deploy-github-gitee.sh YOUR_GITHUB_USERNAME YOUR_GITEE_USERNAME

set -e

GITHUB_TOKEN="YOUR_GITHUB_TOKEN"  # 请替换为你的 GitHub Token

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ 错误: 请提供 GitHub 和 Gitee 用户名"
    echo "使用方法: ./deploy-github-gitee.sh YOUR_GITHUB_USERNAME YOUR_GITEE_USERNAME"
    exit 1
fi

GITHUB_USERNAME=$1
GITEE_USERNAME=$2

echo "🚀 开始部署到 GitHub Pages 和 Gitee Pages..."
echo ""

cd /Users/tailunyu/Desktop/sf/secretflow-demo

# 检查 Git 远程仓库
if ! git remote get-url origin &>/dev/null; then
    echo "📦 配置 GitHub 远程仓库..."
    git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/secretflow-demo.git
else
    echo "✅ GitHub 远程仓库已配置"
fi

if ! git remote get-url gitee &>/dev/null; then
    echo "📦 配置 Gitee 远程仓库..."
    git remote add gitee https://gitee.com/${GITEE_USERNAME}/secretflow-demo.git
    echo "⚠️  注意: Gitee 首次推送需要输入用户名和密码"
else
    echo "✅ Gitee 远程仓库已配置"
fi

# 提交当前更改
echo ""
echo "📝 提交代码更改..."
git add .
if git diff --staged --quiet; then
    echo "ℹ️  没有需要提交的更改"
else
    git commit -m "部署: $(date '+%Y-%m-%d %H:%M:%S')" || echo "⚠️ 提交失败或无需提交"
fi

# 推送到 GitHub
echo ""
echo "⬆️  推送到 GitHub..."
git push https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/secretflow-demo.git main || \
git push origin main || \
echo "⚠️ GitHub 推送失败"

# 推送到 Gitee
echo ""
echo "⬆️  推送到 Gitee..."
echo "提示: 如果是首次推送，需要输入 Gitee 用户名和密码"
git push gitee main || \
echo "⚠️ Gitee 推送失败，请检查认证信息"

echo ""
echo "✅ 部署完成！"
echo ""
echo "📋 访问地址："
echo "  GitHub Pages: https://${GITHUB_USERNAME}.github.io/secretflow-demo/"
echo "  Gitee Pages:  https://${GITEE_USERNAME}.gitee.io/secretflow-demo/"
echo ""
echo "注意事项："
echo "1. GitHub Pages 会在 2-3 分钟后自动部署（通过 GitHub Actions）"
echo "2. Gitee Pages 需要手动在 Gitee 网站上点击'更新'按钮"
echo "3. 首次启用 Gitee Pages 需要实名认证"
echo ""
echo "🎉 全部完成！"

