import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'SecretFlow',
  description: '隐私计算技术演示与场景交互',
  base: '/secretflow-demo/',
  
  bundler: viteBundler(),
  
  theme: defaultTheme({
    navbar: [
      { text: 'PSI', link: '/tech/' },
      { text: 'MPC', link: '/mpc/' },
      { text: '开发手记', link: '/devlog/' }
    ],
    sidebar: {
      '/tech/': [],
      '/mpc/': [],
      '/devlog/': [
        {
          text: '开发手记',
          link: '/devlog/'
        },
        {
          text: '📚 技术原理',
          collapsible: true,
          children: [
            '/devlog/tech-principles/PSI密码学技术详解.md',
            '/devlog/tech-principles/💡SSR原理详解.md',
            '/devlog/tech-principles/从域名到文件的完整链路.md',
            '/devlog/tech-principles/什么是部署-完整解释.md',
            '/devlog/tech-principles/为什么不用SecretFlow也能运行PSI.md',
            '/devlog/tech-principles/在网页端演示PSI的方案.md'
          ]
        },
        {
          text: '🚀 部署指南',
          collapsible: true,
          children: [
            '/devlog/deployment/🚀Gitee部署指南-国内访问.md',
            '/devlog/deployment/🌐Cloudflare-Pages部署-替代方案.md',
            '/devlog/deployment/Colab部署指南.md',
            '/devlog/deployment/GitHub-Pages域名规则和自定义域名.md'
          ]
        },
        {
          text: '🔧 问题解决',
          collapsible: true,
          children: [
            '/devlog/troubleshooting/🔧HTML显示问题修复完成.md',
            '/devlog/troubleshooting/🎉交互按钮最终修复.md',
            '/devlog/troubleshooting/📐导航结构优化完成.md',
            '/devlog/troubleshooting/✨显示效果优化完成.md',
            '/devlog/troubleshooting/Colab运行故障排查.md',
            '/devlog/troubleshooting/Colab正确操作指南.md'
          ]
        },
        {
          text: '📊 开发总结',
          collapsible: true,
          children: [
            '/devlog/summary/🎉Day1-2完成总结.md',
            '/devlog/summary/Day1-进度记录.md',
            '/devlog/summary/📋新7天攻坚计划-打造完整隐语平台.md'
          ]
        }
      ]
    }
  }),
})

