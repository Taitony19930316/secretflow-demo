# Google Colab 部署指南

## 🎯 目标

将 PSI 演示代码部署到 Google Colab，并获取可分享的链接，嵌入到 VuePress 网站。

---

## 📝 步骤1：创建 Colab 笔记本

### 1. 访问 Google Colab
https://colab.research.google.com

### 2. 登录 Google 账号
使用你的 Google 账号登录

### 3. 创建新笔记本
点击 `文件` → `新建笔记本`

---

## 📄 步骤2：添加内容

### 1. 添加标题（Markdown 单元格）

点击 `+ 文本` 添加 Markdown 单元格，输入：

```markdown
# 隐语 PSI（隐私求交）完整演示

本笔记本演示了隐私求交（Private Set Intersection, PSI）的核心原理和实现。

## 什么是 PSI？

PSI 允许多方在不泄露各自数据的情况下，计算出数据集的交集。

**应用场景**：
- 🏥 医疗：多家医院找出共同患者
- 💰 金融：银行间黑名单比对
- 🏛️ 政务：跨部门数据协同

**运行方式**：
1. 点击菜单栏 `代码执行程序` → `全部运行`
2. 或按 `Ctrl+F9`（Mac: `Cmd+F9`）
3. 等待几秒，查看输出结果
```

### 2. 添加代码（代码单元格）

点击 `+ 代码`，复制粘贴 `/Users/tailunyu/Desktop/sf/secretflow-demo/colab-psi-demo.py` 的全部内容

### 3. 添加说明（Markdown 单元格）

在代码下方添加说明：

```markdown
## 📊 演示说明

### 第一部分：简化版 PSI
- 使用 SHA-256 哈希模拟加密
- 展示 PSI 的核心思想
- 适合理解原理

### 第二部分：ECDH-PSI 协议
- 模拟真正的 SecretFlow 流程
- 使用椭圆曲线密码学思想
- 展示双重加密机制

### 第三部分：对比说明
- 简化版 vs 真正的 SecretFlow
- 性能和安全性对比
- 生产环境注意事项

## 🔧 自定义数据

想尝试不同的数据？修改代码中的这两行：

```python
hospital_a.load_data([1001, 1002, 1003, 1005, 1007, 1009, 1010])
hospital_b.load_data([1002, 1003, 1004, 1006, 1008, 1009, 1011])
```

改成你想要的患者 ID，然后重新运行！

## 📚 深入学习

- 📖 [隐语官方文档](https://www.secretflow.org.cn)
- 💻 [GitHub 源码](https://github.com/secretflow/secretflow)
- 🎓 [PSI 技术论文](https://www.secretflow.org.cn/docs/secretflow/latest/zh-CN/tutorial/psi)
```

---

## 💾 步骤3：保存笔记本

### 1. 重命名笔记本
点击左上角的笔记本名称，改为：`隐语PSI演示`

### 2. 保存到 Google Drive
`文件` → `保存` （会自动保存到你的 Google Drive）

---

## 🔗 步骤4：获取分享链接

### 1. 点击右上角的 `共享` 按钮

### 2. 设置访问权限
- 选择 `获取链接`
- 设置为 `知道此链接的任何人都可以查看`
- 点击 `复制链接`

### 3. 链接格式
你会得到类似这样的链接：
```
https://colab.research.google.com/drive/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

---

## 📝 步骤5：更新 VuePress 网站

### 1. 打开 docs/tech/README.md

### 2. 找到这一行：
```markdown
<a href="https://colab.research.google.com/drive/YOUR_COLAB_LINK" target="_blank">
```

### 3. 替换为你的 Colab 链接：
```markdown
<a href="https://colab.research.google.com/drive/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567" target="_blank">
```

---

## ✅ 步骤6：测试

### 1. 本地测试
```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo
npm run docs:dev
```

访问 http://localhost:8080/secretflow-demo/tech/

### 2. 测试交互演示
- 修改输入框中的数据
- 点击"计算隐私交集"按钮
- 查看结果

### 3. 测试 Colab 链接
- 点击 "Open In Colab" 按钮
- 确认能打开你的笔记本
- 运行代码验证

---

## 🚀 步骤7：部署到线上

### 1. 构建网站
```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo
npm run docs:build
```

### 2. 推送到 GitHub
```bash
cd docs/.vuepress/dist
git init
git add -A
git commit -m "添加交互式PSI演示"
git push -f https://github.com/Paopaotai/secretflow-demo.git main:gh-pages
```

### 3. 访问线上网站
https://paopaotai.github.io/secretflow-demo/tech/

---

## 🎨 美化建议（可选）

### 在 Colab 中添加图片

```markdown
## 流程图

![PSI流程](https://your-image-url.com/psi-flow.png)
```

### 添加交互式小部件

```python
from ipywidgets import interact, IntText

def run_psi(patient_a=1001, patient_b=1002):
    # 动态运行 PSI
    pass

interact(run_psi, patient_a=IntText(1001), patient_b=IntText(1002))
```

---

## ⚠️ 注意事项

### 1. Colab 运行时限制
- 免费版有运行时间限制（12小时）
- 闲置90分钟会断开连接
- 对于演示代码没有影响（秒级完成）

### 2. 数据隐私
- Colab 笔记本存储在你的 Google Drive
- 设置为"任何人可查看"时，所有人都能看到
- 不要在演示代码中包含真实敏感数据

### 3. 依赖安装
- 本演示只使用 Python 标准库
- 不需要安装额外依赖
- 如果要用真正的 SecretFlow，需要 `!pip install secretflow`

---

## 📊 完成检查清单

- [ ] Colab 笔记本已创建
- [ ] 代码已粘贴并运行成功
- [ ] 笔记本已保存到 Google Drive
- [ ] 分享链接已获取
- [ ] VuePress 中的链接已更新
- [ ] JavaScript 交互演示工作正常
- [ ] 本地测试通过
- [ ] 已部署到 GitHub Pages
- [ ] 线上网站访问正常

---

## 🎯 预期效果

### 用户体验流程

```
用户访问你的网站
    ↓
看到交互式 PSI 演示（JavaScript 版）
    ↓
可以直接在网页上修改数据、点击按钮
    ↓
立即看到结果（无需跳转）
    ↓
想深入了解？
    ↓
点击 "Open in Colab" 按钮
    ↓
跳转到 Colab 看完整代码
    ↓
可以修改代码并运行
    ↓
完整体验！✅
```

---

## 💡 故障排除

### 问题1：Colab 链接无法访问
**解决**：检查分享权限，确保设置为"知道链接的任何人"

### 问题2：JavaScript 演示不显示
**解决**：
1. 检查浏览器控制台是否有错误
2. 确认 VuePress 构建成功
3. 清除浏览器缓存

### 问题3：样式显示异常
**解决**：
1. 检查 CSS 是否正确嵌入
2. 使用浏览器开发者工具检查样式

---

## 🎉 完成！

现在你有了：
1. ✅ 交互式网页演示（JavaScript 版）
2. ✅ Google Colab 完整代码（Python 版）
3. ✅ 完美的用户体验

符合 Day2 的所有要求：
- ✅ 可在网页运行
- ✅ 有操作说明
- ✅ 展示 PSI 原理
- ✅ 提供深入学习资源

**时间投入**：约 2 小时  
**效果**：⭐⭐⭐⭐⭐

---

**现在去创建你的 Colab 笔记本吧！** 🚀

