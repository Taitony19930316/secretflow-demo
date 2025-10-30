# GitHub Pages 域名规则和自定义域名

## 📍 GitHub Pages 网址是怎么生成的？

### 规则1：用户/组织主页（特殊仓库）

**仓库名**：`username.github.io`

**生成的网址**：`https://username.github.io/`

**例子**：
```
仓库名：Taitony19930316.github.io
网址：https://taitony19930316.github.io/
```

**特点**：
- ✅ 直接是根域名，没有项目路径
- ✅ 看起来更专业
- ✅ 一个账号只能有一个

---

### 规则2：项目页面（你现在用的）

**仓库名**：任意名称（例如 `secretflow-demo`）

**生成的网址**：`https://username.github.io/仓库名/`

**你的例子**：
```
GitHub 用户名：Taitony19930316
仓库名：secretflow-demo
生成的网址：https://taitony19930316.github.io/secretflow-demo/
                                                    ⬆️
                                              项目名作为路径
```

**规则拆解**：
```
https://  [用户名]  .github.io  /  [仓库名]  /
         ⬆️                         ⬆️
      你的账号                    项目名称
```

---

## 🎨 如何更换成更好的域名？

### 方案对比

| 方案 | 域名示例 | 成本 | 难度 | 专业度 |
|------|---------|------|------|--------|
| **默认** | taitony19930316.github.io/secretflow-demo | 免费 | ⭐ | ⭐⭐ |
| **用户主页** | taitony19930316.github.io | 免费 | ⭐⭐ | ⭐⭐⭐ |
| **自定义域名** | secretflow.com | 付费 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## 🆓 方案1：创建用户主页（免费，推荐）

### 优点
- ✅ 完全免费
- ✅ 网址更短、更好看
- ✅ 不需要项目路径

### 步骤

#### 第1步：创建特殊仓库

1. 访问：https://github.com/new
2. 仓库名必须是：`Taitony19930316.github.io`（你的用户名 + .github.io）
3. 设置为 Public
4. 点击 Create repository

#### 第2步：推送你的网站

```bash
# 方法A：把现有项目移过去
cd /Users/tailunyu/Desktop/sf/secretflow-demo
npm run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m "Deploy to user page"
git remote add origin https://github.com/Taitony19930316/Taitony19930316.github.io.git
git push -f origin main
```

#### 第3步：修改 VuePress 配置

```javascript
// docs/.vuepress/config.js
export default {
  base: '/',  // 改成根路径（不是 '/secretflow-demo/' 了）
  // ... 其他配置
}
```

#### 第4步：访问新网址

```
旧网址：https://taitony19930316.github.io/secretflow-demo/
新网址：https://taitony19930316.github.io/
         ⬆️
    更短、更专业！
```

**注意**：
- ⚠️ 一个账号只能有一个用户主页
- ⚠️ 如果你有多个项目，只能选一个作为主页

---

## 💎 方案2：购买自定义域名（付费，最专业）

### 优点
- ✅ 完全自定义（例如：secretflow.com）
- ✅ 看起来最专业
- ✅ 方便记忆和分享

### 成本
- 💰 域名费用：约 **50-100 元/年**
  - .com 域名：约 60-80 元/年
  - .cn 域名：约 30-50 元/年
  - .io 域名：约 200-300 元/年

---

### 完整步骤

#### 第1步：购买域名

**国内推荐**：
- 阿里云万网：https://wanwang.aliyun.com
- 腾讯云：https://dnspod.cloud.tencent.com
- 西部数码：https://www.west.cn

**国际推荐**：
- Namecheap：https://www.namecheap.com
- GoDaddy：https://www.godaddy.com
- Cloudflare Registrar：https://www.cloudflare.com

**例子**：购买 `secretflow.com`

---

#### 第2步：配置 DNS 解析

在域名服务商的控制台添加记录：

**方式A：使用 A 记录（推荐）**

添加以下 4 条 A 记录：

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**方式B：使用 CNAME 记录**

| 类型 | 主机记录 | 记录值 |
|------|---------|--------|
| CNAME | www | taitony19930316.github.io |

**两种都配置的话**：
- `secretflow.com` 和 `www.secretflow.com` 都能访问
- GitHub 会自动重定向到统一地址

---

#### 第3步：在 GitHub 仓库配置自定义域名

**方法A：通过 GitHub 网页配置**

1. 访问：https://github.com/Taitony19930316/secretflow-demo/settings/pages
2. 找到 "Custom domain" 部分
3. 输入：`secretflow.com`
4. 点击 Save
5. 等待 DNS 检查通过（几分钟到几小时）
6. 勾选 "Enforce HTTPS"（强制 HTTPS，推荐）

**方法B：通过 CNAME 文件**

在项目根目录创建 `CNAME` 文件：

```bash
# 在 docs/.vuepress/public/ 目录创建 CNAME 文件
mkdir -p docs/.vuepress/public
echo "secretflow.com" > docs/.vuepress/public/CNAME
```

然后重新构建部署：
```bash
npm run docs:build
cd docs/.vuepress/dist
git push -f origin gh-pages
```

---

#### 第4步：等待生效

DNS 传播需要时间：
- 快的话：5-10 分钟
- 慢的话：24-48 小时

**检查是否生效**：
```bash
# 方法1：ping 域名
ping secretflow.com

# 方法2：查询 DNS
nslookup secretflow.com

# 方法3：直接访问
# 在浏览器打开 https://secretflow.com
```

---

## 🌐 域名选择建议

### 好的域名特点

✅ **简短易记**
- 好：`secretflow.com`
- 不好：`my-secret-flow-demo-project-2024.com`

✅ **与项目相关**
- 好：`secretflow.cn`（与隐语 SecretFlow 相关）
- 不好：`mywebsite123.com`

✅ **常见后缀**
- 推荐：.com、.cn、.net、.org
- 特殊：.io（科技感）、.ai（人工智能）、.dev（开发者）

---

### 域名后缀对比

| 后缀 | 价格（年） | 适用场景 | 备案 |
|------|-----------|---------|------|
| **.com** | 60-80元 | 商业、通用 | 国外不需要 |
| **.cn** | 30-50元 | 中国、国内项目 | 需要 |
| **.io** | 200-300元 | 科技、开发者 | 国外不需要 |
| **.dev** | 80-120元 | 开发者、技术 | 国外不需要 |
| **.ai** | 600-1000元 | 人工智能 | 国外不需要 |

**推荐**：
- 国内用户 + 中文内容 → `.cn` 或 `.com.cn`
- 国际项目 + 英文内容 → `.com` 或 `.io`
- 个人博客 → `.com` 或 `.me`

---

## 🔧 域名配置注意事项

### 问题1：为什么需要修改 VuePress 的 base？

**原因**：域名变了，路径也要变

| 部署方式 | 网址 | base 配置 |
|---------|------|-----------|
| **项目页面** | username.github.io/repo/ | `/repo/` |
| **用户主页** | username.github.io/ | `/` |
| **自定义域名** | yourdomain.com/ | `/` |

**修改方法**：
```javascript
// docs/.vuepress/config.js
export default {
  base: '/',  // 自定义域名用根路径
}
```

---

### 问题2：域名解析的 IP 为什么是这4个？

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**原因**：
- 这是 GitHub Pages 的官方 IP
- 4个 IP 用于负载均衡和容错
- GitHub 官方文档规定的

**查看最新 IP**：
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

---

### 问题3：为什么推荐启用 HTTPS？

**好处**：
- ✅ 安全（加密传输）
- ✅ 浏览器不会显示"不安全"警告
- ✅ 搜索引擎排名更高（Google SEO）
- ✅ 某些现代 API 需要 HTTPS

**GitHub Pages 免费提供 HTTPS 证书**（Let's Encrypt）

---

## 📊 三种方案对比总结

### 方案对比表

| 项目 | 默认项目页 | 用户主页 | 自定义域名 |
|------|-----------|---------|-----------|
| **网址** | username.github.io/repo | username.github.io | yourdomain.com |
| **成本** | 免费 | 免费 | 50-100元/年 |
| **专业度** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **易记性** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **配置难度** | ⭐ | ⭐⭐ | ⭐⭐⭐ |
| **base 配置** | `/repo/` | `/` | `/` |

---

### 我的推荐

#### 如果是个人学习/展示作品
→ **用户主页**（免费 + 专业）
- `https://taitony19930316.github.io/`

#### 如果是商业项目/正式产品
→ **自定义域名**（最专业）
- `https://secretflow.com/`

#### 如果只是临时测试
→ **默认项目页**（最简单）
- `https://taitony19930316.github.io/secretflow-demo/`

---

## 🎯 快速操作指南

### 想要更短的免费域名？

**创建用户主页**：
1. 新建仓库：`Taitony19930316.github.io`
2. 修改 config.js：`base: '/'`
3. 重新构建并推送
4. 访问：`https://taitony19930316.github.io/`

---

### 想要自定义域名？

**购买并配置**：
1. 在阿里云/腾讯云购买域名（约60元/年）
2. 添加 DNS A 记录（指向 GitHub IP）
3. 在 GitHub Pages 设置中填写域名
4. 修改 config.js：`base: '/'`
5. 等待 DNS 生效（几小时）
6. 访问你的自定义域名

---

## 💡 域名示例推荐

### 如果你叫 Tony，可以考虑：

**个人品牌**：
- `tony-tech.com`
- `tonycode.dev`
- `tony-yu.com`

**项目相关**：
- `secretflow-demo.com`
- `sf-privacy.io`
- `privacy-tech.cn`

**简短域名**：
- `tyu.io`（名字首字母）
- `ty19.com`（名字 + 年份）

---

## ⚠️ 注意事项

### 国内域名（.cn）需要备案

如果购买 `.cn` 或 `.com.cn` 域名：
- ⚠️ 需要在工信部备案（约2-3周）
- ⚠️ 需要提供身份证、地址等信息
- ⚠️ GitHub Pages 在国外，备案可能比较复杂

**建议**：
- 个人项目 → 选择 `.com` 或 `.io`（不需要备案）
- 商业项目 → 考虑备案或使用国内服务器

---

## 🔍 检查域名是否可用

**在线工具**：
- Whois 查询：https://whois.aliyun.com
- 域名可用性检查：https://www.namecheap.com

**命令行检查**：
```bash
# 检查域名是否被注册
whois secretflow.com
```

---

## 📚 总结

### 域名生成规则

```
GitHub Pages 默认格式：
https://[用户名].github.io/[仓库名]/
```

### 如何改成更好的域名

| 方案 | 网址示例 | 操作 |
|------|---------|------|
| **用户主页** | username.github.io | 创建同名仓库 |
| **自定义域名** | yourdomain.com | 购买域名 + DNS配置 |

### 关键步骤

1. **选择域名** → 短小、易记、相关
2. **购买域名** → 阿里云/腾讯云/Namecheap
3. **配置 DNS** → A记录指向 GitHub IP
4. **GitHub 设置** → Custom domain 填写域名
5. **修改配置** → base: '/' 
6. **等待生效** → 几分钟到几小时

---

**现在明白 GitHub Pages 的域名规则了吗？需要我帮你配置自定义域名吗？** 🌐

