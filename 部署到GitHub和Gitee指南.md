# 部署到 GitHub Pages 和 Gitee Pages 完整指南

## 第一步：推送到 GitHub

### 1. 在 GitHub 上创建仓库

访问：https://github.com/new

填写信息：
- **Repository name**: `secretflow-demo`
- **Description**: `隐语交互式拆解站 - 隐私计算技术演示`
- **Public** (选择公开)
- **不要**勾选 "Initialize this repository with a README"

点击 "Create repository"

### 2. 推送代码到 GitHub

复制下面的命令，**替换 YOUR_GITHUB_USERNAME 为你的 GitHub 用户名**：

```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo

# 添加远程仓库
git remote add origin https://YOUR_GITHUB_TOKEN@github.com/YOUR_GITHUB_USERNAME/secretflow-demo.git

# 推送代码
git push -u origin main
```

**重要**：将 `YOUR_GITHUB_USERNAME` 替换成你的实际用户名！

### 3. 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 左侧菜单找到 **Pages**
4. 在 "Build and deployment" 下：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `gh-pages` 分支，目录选 `/ (root)`
   - 点击 **Save**

### 4. 等待部署完成

- 回到仓库主页，点击 **Actions** 查看部署进度
- 等待绿色✓出现（约 2-3 分钟）
- GitHub Pages 地址：`https://YOUR_GITHUB_USERNAME.github.io/secretflow-demo/`

---

## 第二步：同步到 Gitee Pages（国内访问更快）

### 1. 注册 Gitee 账号

访问：https://gitee.com/signup

- 需要手机号注册
- **需要实名认证**才能使用 Gitee Pages

### 2. 从 GitHub 导入仓库

#### 方式A：自动同步（推荐）

1. 登录 Gitee 后，点击右上角 **+** → **从 GitHub/GitLab 导入仓库**
2. 授权 GitHub 访问权限
3. 选择 `secretflow-demo` 仓库
4. 点击 **导入**
5. 等待导入完成

#### 方式B：手动推送

```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo

# 添加 Gitee 远程仓库（需要先在 Gitee 创建仓库）
git remote add gitee https://gitee.com/YOUR_GITEE_USERNAME/secretflow-demo.git

# 推送到 Gitee
git push gitee main
```

### 3. 启用 Gitee Pages

1. 进入你的 Gitee 仓库页面
2. 点击 **服务** → **Gitee Pages**
3. 选择部署分支：
   - 如果使用自动部署：选择 `gh-pages` 分支
   - 如果手动推送：先运行构建命令，然后选择分支
4. 点击 **启动** 或 **更新**

### 4. 获取 Gitee Pages 地址

地址格式：`https://YOUR_GITEE_USERNAME.gitee.io/secretflow-demo/`

---

## 方式B：手动部署到 Gitee Pages

如果自动同步有问题，可以手动操作：

```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo

# 1. 在 Gitee 创建空仓库 secretflow-demo
# 访问：https://gitee.com/projects/new

# 2. 添加 Gitee 远程仓库
git remote add gitee https://YOUR_GITEE_USERNAME:YOUR_GITEE_PASSWORD@gitee.com/YOUR_GITEE_USERNAME/secretflow-demo.git

# 3. 推送代码
git push gitee main

# 4. 构建并推送到 gh-pages 分支
npm run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy'
git push -f https://YOUR_GITEE_USERNAME:YOUR_GITEE_PASSWORD@gitee.com/YOUR_GITEE_USERNAME/secretflow-demo.git main:gh-pages
```

---

## 自动同步 GitHub 到 Gitee

### 方案A：使用 GitHub Action（推荐）

创建文件：`.github/workflows/sync-to-gitee.yml`

```yaml
name: Sync to Gitee

on:
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Sync to Gitee
        uses: wearerequired/git-mirror-action@master
        env:
          SSH_PRIVATE_KEY: ${{ secrets.GITEE_PRIVATE_KEY }}
        with:
          source-repo: git@github.com:YOUR_GITHUB_USERNAME/secretflow-demo.git
          destination-repo: git@gitee.com:YOUR_GITEE_USERNAME/secretflow-demo.git
```

### 方案B：Gitee 自动同步功能

1. 在 Gitee 仓库页面
2. 点击 **管理** → **仓库设置**
3. 找到 **同步更新** 功能
4. 输入 GitHub 仓库地址
5. 设置定时同步

---

## 最终访问地址

部署完成后，你将有三个访问地址：

1. **Vercel**（国际）：https://secretflow-demo.vercel.app
2. **GitHub Pages**（国际）：https://YOUR_GITHUB_USERNAME.github.io/secretflow-demo/
3. **Gitee Pages**（国内快）：https://YOUR_GITEE_USERNAME.gitee.io/secretflow-demo/

---

## 快速部署脚本

我为你准备了一键部署脚本，见 `deploy-github-gitee.sh`

使用方法：
```bash
chmod +x deploy-github-gitee.sh
./deploy-github-gitee.sh YOUR_GITHUB_USERNAME YOUR_GITEE_USERNAME
```

---

## 更新网站

以后修改内容后，只需：

```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo
git add .
git commit -m "更新内容"
git push origin main

# 如果配置了 Gitee 远程仓库
git push gitee main
```

GitHub Actions 会自动部署到 GitHub Pages！

---

## 常见问题

### Q: GitHub Pages 显示 404？
A: 等待 3-5 分钟，GitHub 需要时间生成页面

### Q: Gitee Pages 需要实名认证？
A: 是的，Gitee Pages 免费版需要实名认证才能使用

### Q: 如何更新 Gitee Pages？
A: 每次推送后，需要手动在 Gitee 页面点击"更新"按钮

### Q: 为什么访问出现样式错误？
A: 可能是路径问题，在 VuePress 配置中设置 base 路径

---

需要帮助随时问我！

