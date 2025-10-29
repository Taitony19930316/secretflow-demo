import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '隐语交互式拆解站',
  description: '隐私计算技术演示与场景交互',
  
  bundler: viteBundler(),
  
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '技术原理', link: '/tech/' },
      { text: '场景交互', link: '/scenario/' },
      { text: '开发手记', link: '/devlog/' }
    ],
  }),
})

