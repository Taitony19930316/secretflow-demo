# 🚀 Gitee Pages 部署指南 - 解决国内访问问题

> **问题**：GitHub Pages (https://paopaotai.github.io/secretflow-demo/) 国内访问不稳定  
> **解决**：部署到 Gitee Pages，国内访问速度快

---

## 🎯 方案选择

### 方案1：自动导入（推荐）⭐⭐⭐⭐⭐
- ✅ 最简单，5分钟完成
- ✅ 自动同步GitHub
- ⚠️ 需要Gitee账号 + 实名认证

### 方案2：手动推送
- ✅ 完全控制
- ✅ 不需要授权
- ⚠️ 需要手动同步更新

---

## 📋 方案1：自动导入（推荐）

### 步骤1：注册 Gitee 并实名认证（5分钟）

**1.1 注册账号**
- 访问：https://gitee.com/signup
- 使用手机号注册
- 验证邮箱

**1.2 实名认证**（必须完成才能使用Pages）
- 登录后，点击右上角头像 → **设置**
- 左侧菜单 → **认证信息**
- 点击 **实名认证**
- 按提示完成认证（需要身份证照片）
- 等待审核（通常5分钟内通过）

### 步骤2：从 GitHub 导入仓库（2分钟）

**2.1 开始导入**
1. 登录 Gitee
2. 点击右上角 **+** 号
3. 选择 **从 GitHub/GitLab 导入仓库**

**2.2 授权 GitHub**
1. 点击 **授权 GitHub**
2. 在弹出的 GitHub 页面登录
3. 点击 **Authorize gitee** 授权

**2.3 选择仓库**
1. 在仓库列表中找到 `Paopaotai/secretflow-demo`
2. 点击右侧的 **导入** 按钮
3. 仓库路径设为：`你的用户名/secretflow-demo`
4. 点击 **导入** 按钮
5. 等待导入完成（绿色提示）

### 步骤3：启用 Gitee Pages（2分钟）

**3.1 进入 Pages 设置**
1. 进入导入的仓库主页
2. 点击顶部 **服务** 菜单
3. 选择 **Gitee Pages**

**3.2 配置部署**
1. **部署分支**：选择 `gh-pages`
2. **部署目录**：选择 `/`（根目录）
3. 点击 **启动** 按钮
4. 等待部署成功（约1分钟）

**3.3 获取访问地址**

部署成功后会显示：
```
https://你的Gitee用户名.gitee.io/secretflow-demo/
```

例如，如果你的用户名是 `paopaotai`，地址就是：
```
https://paopaotai.gitee.io/secretflow-demo/
```

---

## 📋 方案2：手动推送

### 步骤1：在 Gitee 创建仓库

1. 登录 Gitee
2. 点击右上角 **+** → **新建仓库**
3. 填写信息：
   - **仓库名称**：`secretflow-demo`
   - **路径**：`你的用户名/secretflow-demo`
   - **开源许可证**：选择 `MIT`
   - **其他选项**：都不勾选
4. 点击 **创建**

### 步骤2：添加 Gitee 远程仓库并推送

**在终端执行**（记得替换你的用户名）：

```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo

# 添加 Gitee 远程仓库
git remote add gitee https://gitee.com/你的Gitee用户名/secretflow-demo.git

# 推送 main 分支
git push gitee main

# 推送 gh-pages 分支（网站文件）
git push gitee gh-pages
```

### 步骤3：启用 Gitee Pages

同方案1的步骤3。

---

## 🔄 后续更新方法

### 如果使用方案1（自动导入）

**每次更新后**：
1. 推送到 GitHub：`git push origin main`
2. GitHub Actions 自动部署
3. 去 Gitee 仓库页面
4. 点击 **同步** 按钮（从 GitHub 同步）
5. 去 **Gitee Pages** 页面
6. 点击 **更新** 按钮

### 如果使用方案2（手动推送）

**每次更新后**：
```bash
# 同时推送到 GitHub 和 Gitee
git push origin main
git push gitee main

# 等待 GitHub Actions 构建完成后，推送 gh-pages
git checkout gh-pages
git pull origin gh-pages
git push gitee gh-pages
git checkout main
```

---

## ✅ 验证部署成功

### 检查清单

1. **访问 Gitee Pages 地址**
   - [ ] 页面能正常打开
   - [ ] 样式显示正常
   - [ ] 导航可以点击

2. **测试功能**
   - [ ] PSI Demo 可以运行
   - [ ] 输入框可以编辑
   - [ ] 计算按钮可以点击
   - [ ] 结果正常显示

3. **检查链接**
   - [ ] 所有内部链接可以跳转
   - [ ] Colab 链接可以打开

---

## 🎯 最终效果

部署完成后，你将有**双访问地址**：

| 平台 | 地址 | 适用场景 |
|------|------|---------|
| **GitHub Pages** | `https://paopaotai.github.io/secretflow-demo/` | 海外访问 |
| **Gitee Pages** | `https://你的用户名.gitee.io/secretflow-demo/` | 🔥 **国内访问** |

---

## ⚠️ 注意事项

### 1. Gitee Pages 限制

- **必须实名认证**才能使用
- **免费版**每个账号只能有1个Pages服务
- 更新后需要**手动点击"更新"**按钮
- 网站大小不能超过 **100MB**

### 2. 同步频率

- **方案1（自动导入）**：需要手动同步
- **方案2（手动推送）**：实时同步

### 3. 访问速度

- **Gitee Pages**：国内访问速度快 ⚡
- **GitHub Pages**：海外访问速度快，国内可能慢

---

## 🆘 常见问题

### Q1: "需要实名认证"怎么办？

**A**: Gitee Pages 要求实名认证，这是强制要求：
1. 准备身份证正反面照片
2. 进入 **设置** → **认证信息**
3. 完成实名认证（5分钟审核）
4. 审核通过后才能启用 Pages

### Q2: 导入后显示"仓库为空"？

**A**: 可能是分支问题：
1. 检查 GitHub 是否有 `gh-pages` 分支
2. 如果没有，手动运行一次部署：
   ```bash
   npm run docs:build
   git add .
   git commit -m "update"
   git push origin main
   ```
3. 等待 GitHub Actions 完成
4. 重新在 Gitee 同步

### Q3: Gitee Pages 显示 404？

**A**: 检查部署配置：
1. 确认选择的分支是 `gh-pages`
2. 确认目录是 `/` 根目录
3. 点击 **更新** 按钮重新部署
4. 等待1-2分钟

### Q4: 样式显示不正常？

**A**: 检查 base 路径：
1. 打开 `docs/.vuepress/config.js`
2. 确认 `base: '/secretflow-demo/'` 设置正确
3. 重新构建和部署

### Q5: 如何快速测试国内访问？

**A**: 使用手机流量访问（不要用WiFi）：
- GitHub Pages：可能很慢或无法访问
- Gitee Pages：应该秒开 ⚡

---

## 🚀 快速命令参考

### 检查远程仓库
```bash
git remote -v
```

### 添加 Gitee 远程仓库
```bash
git remote add gitee https://gitee.com/你的用户名/secretflow-demo.git
```

### 推送到 Gitee
```bash
git push gitee main
git push gitee gh-pages
```

### 删除 Gitee 远程仓库（如果配置错误）
```bash
git remote remove gitee
```

---

## 📝 推荐操作流程

### 首次部署（选择方案1）

1. ✅ 注册 Gitee + 实名认证（5分钟）
2. ✅ 从 GitHub 导入仓库（2分钟）
3. ✅ 启用 Gitee Pages（2分钟）
4. ✅ 测试访问（1分钟）

**总计**：10分钟完成国内访问！

### 日常更新

1. 修改代码
2. `git push origin main`
3. 等待 GitHub Actions 完成
4. 去 Gitee 点击"同步"和"更新"

---

## 🎉 完成标志

当你看到以下情况，说明部署成功：

✅ Gitee Pages 显示绿色 "已开启"  
✅ 访问地址返回正常页面  
✅ PSI Demo 可以正常运行  
✅ 手机流量访问速度快  

---

**现在就去完成 Gitee 部署，让国内用户也能快速访问你的作品！** 🚀

> 💡 **提示**：Gitee Pages 是国内访问的最佳方案，部署后记得把地址分享给国内用户！

