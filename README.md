# 隐语交互式拆解站

VuePress 项目 - 用于展示隐私计算（SecretFlow）技术演示与场景交互

## 快速开始

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run docs:dev
```

开发服务器将在 http://localhost:8080 启动

### 构建生产版本
```bash
npm run docs:build
```

构建结果将输出到 `.vuepress/dist` 目录

## 项目结构

```
secretflow-demo/
├── docs/
│   ├── .vuepress/
│   │   └── config.js          # 配置文件
│   └── README.md              # 首页
└── package.json
```

## 下一步

- [ ] 添加技术原理页面
- [ ] 添加场景交互页面
- [ ] 集成CodeSandbox代码演示

