# 开发手记

记录开发"隐语交互式拆解站"的过程、遇到的问题及优化建议。

## 开发进度

### Day 1：环境搭建与工具配置

**时间**：2024年X月X日

**完成内容**：
- ✅ VuePress 项目框架搭建
- ✅ GitHub、Vercel、CodeSandbox 工具配置
- ✅ Git 仓库初始化
- ✅ PSI 代码模板准备

**遇到的问题**：
1. **问题**：隐语依赖安装时版本冲突
   - **现象**：`pip install secretflow` 报错
   - **解决**：使用指定版本 `pip install secretflow==1.9.0`
   - **教训**：明确指定依赖版本，避免兼容性问题

2. **问题**：VuePress 配置 bundler 选项缺失
   - **现象**：启动时报错 "The bundler or theme option is missing"
   - **解决**：安装 `@vuepress/bundler-vite` 并在配置中引入
   - **教训**：VuePress 2.x 需要显式配置 bundler

### Day 2：技术原理页面开发（计划中）

**计划内容**：
- [ ] 编写 PSI 原理说明
- [ ] 绘制技术流程图
- [ ] 嵌入 CodeSandbox 代码演示

### Day 3：场景交互开发（计划中）

**计划内容**：
- [ ] 实现医疗场景 3 步交互
- [ ] 添加模拟数据展示
- [ ] 集成 PSI 代码运行

### Day 4：部署上线（计划中）

**计划内容**：
- [ ] 推送代码到 GitHub
- [ ] 配置 Vercel 自动部署
- [ ] 生成并测试公开链接

## 技术难点

### 1. CodeSandbox 嵌入调试

**难点描述**：将 CodeSandbox 嵌入 VuePress 后，iframe 样式可能错位。

**预期解决方案**：
- 调整 iframe 宽度为 100%
- 设置固定高度（如 500px）
- 添加边框圆角和阴影美化

**代码示例**：
```html
<iframe 
  src="https://codesandbox.io/embed/xxx"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  sandbox="allow-scripts allow-same-origin"
></iframe>
```

### 2. 隐语多节点配置

**难点描述**：真实的 PSI 需要多节点环境，CodeSandbox 是单节点。

**解决方案**：
- 在 CodeSandbox 中使用简化版演示（模拟逻辑）
- 提供完整代码示例供本地测试
- 说明真实环境的配置要求

## 对隐语的优化建议

### 建议 1：优化新手文档

**问题**：
- PSI 代码示例注释较少
- 新手难以理解参数含义

**建议**：
- 在社区文档中增加"新手版注释"
- 对每个参数添加说明和取值范围
- 提供更多场景化的代码示例

**示例**：
```python
# ❌ 当前文档
result = psi(data_a, data_b)

# ✅ 建议改进
result = psi(
    data_a,      # 参与方A的数据（List或DataFrame）
    data_b,      # 参与方B的数据
    protocol='ecdh'  # 协议类型：ecdh(快速) 或 kkrt(大数据)
)
```

### 建议 2：SecretPad 增加进度提示

**问题**：
- 执行 PSI 计算时无进度条
- 用户不知道是在计算还是卡死

**建议**：
- 添加文字提示："计算中，请稍候..."
- 显示预估剩余时间
- 增加进度百分比

## 开发心得

### 1. 极简主义很重要
- 使用现成工具（VuePress、CodeSandbox）节省大量时间
- 不做自定义开发，专注于内容和演示

### 2. 边做边记录
- 记录每个问题的解决方案
- 形成可复用的开发文档

### 3. 用户视角思考
- 不只是展示技术，要让用户能"体验"
- 交互式演示比静态说明更有说服力

## 时间统计

| 任务 | 预计时间 | 实际时间 | 备注 |
|------|---------|---------|------|
| 工具配置 | 1h | 1h | 顺利 |
| VuePress 搭建 | 2h | 2.5h | 遇到 bundler 配置问题 |
| PSI 代码准备 | 2h | - | 进行中 |

## 下一步计划

1. ✅ 完成基础页面框架
2. 📝 收集隐语官方 PSI 示例代码
3. 🎨 优化页面样式和交互
4. 🚀 准备部署到 Vercel

---

**总耗时（Day 1）**：约 4 小时  
**状态**：进展顺利，按计划推进

*本手记将持续更新，记录完整的开发过程。*

