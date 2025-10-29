#!/bin/bash

# Vercel部署脚本
# 使用token部署到Vercel

set -e

VERCEL_TOKEN="UFdfTYS1lJixOOZccMsdiunC"

echo "🚀 开始部署到Vercel..."

cd /Users/tailunyu/Desktop/sf/secretflow-demo

# 设置环境变量
export VERCEL_TOKEN="$VERCEL_TOKEN"

# 检查是否已初始化Vercel项目
if [ ! -f ".vercel/project.json" ]; then
    echo "📦 初始化Vercel项目..."
    vercel link --token "$VERCEL_TOKEN" --yes
fi

echo "🔨 构建项目..."
npm run docs:build

echo "⬆️  部署到Vercel生产环境..."
vercel deploy --prod --token "$VERCEL_TOKEN"

echo ""
echo "✅ 部署完成！"
echo "📋 查看部署状态: vercel ls"
echo "🌐 网站应该已经可以通过Vercel生成的链接访问了"

