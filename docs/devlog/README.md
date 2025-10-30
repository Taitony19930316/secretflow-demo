# 开发手记

记录开发过程中的技术探索、问题解决和经验总结。

---

## 📚 技术原理

深入理解项目中涉及的核心技术概念：

- [PSI密码学技术详解](./tech-principles/PSI密码学技术详解.md) - ECC、OT协议、加盐随机化
- [SSR原理详解](./tech-principles/💡SSR原理详解.md) - 服务端渲染与客户端渲染
- [从域名到文件的完整链路](./tech-principles/从域名到文件的完整链路.md) - DNS、服务器、构建流程
- [什么是部署](./tech-principles/什么是部署-完整解释.md) - 部署的本质和流程
- [为什么不用SecretFlow也能运行PSI](./tech-principles/为什么不用SecretFlow也能运行PSI.md) - 简化版vs生产版
- [在网页端演示PSI的方案](./tech-principles/在网页端演示PSI的方案.md) - JavaScript实现思路

---

## 🚀 部署指南

多平台部署方案和配置说明：

- [Gitee部署指南（国内访问）](./deployment/🚀Gitee部署指南-国内访问.md) - Gitee Pages 完整部署流程
- [Cloudflare Pages部署](./deployment/🌐Cloudflare-Pages部署-替代方案.md) - 国内友好的替代方案
- [Colab部署指南](./deployment/Colab部署指南.md) - Google Colab 笔记本配置
- [GitHub Pages域名规则](./deployment/GitHub-Pages域名规则和自定义域名.md) - 域名生成和自定义

---

## 🔧 问题解决

开发过程中遇到的问题和解决方案：

- [HTML显示问题修复](./troubleshooting/🔧HTML显示问题修复完成.md) - ClientOnly标签问题
- [交互按钮修复](./troubleshooting/🎉交互按钮最终修复.md) - 全局函数挂载
- [导航结构优化](./troubleshooting/📐导航结构优化完成.md) - 2tab + 侧边栏
- [显示效果优化](./troubleshooting/✨显示效果优化完成.md) - 字体、颜色、对比度
- [Colab运行故障排查](./troubleshooting/Colab运行故障排查.md) - 代码单元vs文本单元
- [Colab正确操作指南](./troubleshooting/Colab正确操作指南.md) - 使用技巧

---

## 📊 开发总结

项目进展和阶段性总结：

- [Day1-2完成总结](./summary/🎉Day1-2完成总结.md) - 前两天的完成情况和经验
- [Day1进度记录](./summary/Day1-进度记录.md) - 第一天详细记录
- [7天攻坚计划](./summary/📋新7天攻坚计划-打造完整隐语平台.md) - 完整的7天规划

---

## 🎯 核心经验

### 技术栈选择

- **前端框架**: VuePress 2.x + Vite
- **交互演示**: 原生 JavaScript + Web Crypto API
- **部署平台**: GitHub Pages + Gitee Pages + Cloudflare Pages
- **代码演示**: Google Colab

### 关键技术点

1. **SSR兼容性**
   - 使用 `typeof window !== 'undefined'` 检查
   - 避免在服务端渲染时访问浏览器API

2. **交互实现**
   - 全局函数挂载：`window.functionName = ...`
   - 事件监听：`DOMContentLoaded` 确保DOM加载完成

3. **部署优化**
   - 多平台部署覆盖不同地区用户
   - GitHub Actions 自动化CI/CD
   - 手动部署作为备用方案

### 开发流程

```
需求分析 → 技术选型 → 本地开发 → 测试验证 → 
部署上线 → 问题修复 → 优化迭代
```

### 文档组织

- **场景驱动**: 从痛点出发
- **层次递进**: 从浅入深
- **交互优先**: 动手体验
- **完整闭环**: 理论+实践+资源

---

## 📝 更新日志

### 2025-10-30
- ✅ 整合页面结构，简化导航
- ✅ 扩展应用场景说明
- ✅ 优化技术原理表述
- ✅ 完善部署文档

### 2025-10-29
- ✅ 完成PSI交互式演示
- ✅ 实现SHA-256加密可视化
- ✅ 集成Google Colab笔记本
- ✅ 解决SSR兼容性问题
- ✅ 多平台部署上线

---

> 💡 **提示**: 这些文档记录了项目从0到1的完整过程，包括技术决策、问题解决和经验总结，希望对你有帮助！
