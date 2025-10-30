import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '隐语交互式拆解站',
  description: '隐私计算技术演示与场景交互',
  base: '/secretflow-demo/',
  
  bundler: viteBundler(),
  
  theme: defaultTheme({
    navbar: [
      { text: 'PSI', link: '/tech/' },
      { text: '开发手记', link: '/devlog/' }
    ],
    sidebar: {
      '/tech/': [],
      '/devlog/': [
        {
          text: '开发手记',
          collapsible: true,
          children: [
            {
              text: '开发日志',
              link: '/devlog/'
            }
          ]
        }
      ]
    }
  }),
})

