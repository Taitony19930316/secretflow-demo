# Day 1 进度记录

## 上午任务（3小时）

### ✅ 任务1：注册3个核心工具账号
**状态**：全部Token已配置 ✨
- [x] GitHub账号：Token已配置
- [x] Vercel账号：Token已配置
- [x] CodeSandbox账号：Token已配置

**已完成配置**：
- ✅ Git仓库已初始化
- ✅ 代码已首次提交
- ✅ 创建了部署脚本 `deploy.sh` 和 `deploy-vercel.sh`
- ✅ 创建了Vercel配置文件 `vercel.json`
- ✅ 创建了部署指南文档
- ✅ **Vercel CLI已安装**，可以使用token部署
- ✅ **PSI代码模板已准备** (`codesandbox-psi-template.py`)
- ✅ **CodeSandbox使用指南已创建**

### ✅ 任务2：用VuePress快速搭网站框架
**状态**：已完成 ✨

**已完成的工作**：
1. ✅ 创建了VuePress项目 `secretflow-demo`
2. ✅ 配置了基础项目结构
3. ✅ 安装了必要的依赖（vuepress、@vuepress/theme-default、@vuepress/bundler-vite）
4. ✅ 创建了基础配置文件（包含导航栏）
5. ✅ 创建了首页文档
6. ✅ **VuePress开发服务器成功启动** ✨

**项目位置**：`/Users/tailunyu/Desktop/sf/secretflow-demo`

**启动开发服务器**：
```bash
cd /Users/tailunyu/Desktop/sf/secretflow-demo
npm run docs:dev
```

**访问地址**：http://localhost:8080 ✅ **已成功运行！**

**Git和GitHub准备**：
- ✅ Git仓库已初始化
- ✅ 代码已首次提交
- 📋 **下一步**：需要在GitHub上手动创建仓库，然后使用部署脚本推送代码
  - 创建仓库：https://github.com/new (名称：secretflow-demo)
  - 或运行：`./deploy.sh YOUR_GITHUB_USERNAME`

---

## 下午任务（4小时）

### ⏳ 任务1：扒隐语核心资料
**状态**：待开始

需要收集的资料：
- [ ] PSI演示代码（从隐语官网复制）
- [ ] 医疗场景案例（提取关键流程）

**链接**：
- PSI快速开始：https://www.secretflow.org.cn/docs/secretflow/latest/zh-CN/quickstart/psi
- 医疗场景案例：https://www.secretflow.org.cn/docs/secretflow/latest/zh-CN/examples/medical

### ⏳ 任务2：在CodeSandbox调试PSI代码
**状态**：代码模板已准备 ✨

**已完成的准备工作**：
- ✅ PSI演示代码模板已创建 (`codesandbox-psi-template.py`)
- ✅ 依赖文件已准备 (`codesandbox-requirements.txt`)
- ✅ CodeSandbox使用指南已创建
- ✅ Token已配置，可以开始创建sandbox

**需要完成**：
- [ ] 访问CodeSandbox创建Python项目
- [ ] 上传PSI代码模板（或直接在CodeSandbox中创建）
- [ ] 安装依赖（pip install secretflow 或使用requirements.txt）
- [ ] 运行测试，确保代码可以执行
- [ ] 修改模拟数据为：医院A [1001,1002,1003]，医院B [1002,1003,1004]
- [ ] 保存CodeSandbox链接用于后续嵌入VuePress

**快速开始**：
```bash
# 1. 访问 https://codesandbox.io 并登录
# 2. 创建Python sandbox
# 3. 复制 codesandbox-psi-template.py 的内容到CodeSandbox
# 4. 运行代码测试
```

---

## 交付物检查清单

- [x] VuePress网站框架（本地可运行）
- [ ] 隐语核心资料包
- [ ] 可运行的PSI代码（CodeSandbox链接）

---

## 遇到的问题

（记录开发过程中遇到的问题和解决方案）

---

## 备注

- 项目已成功创建，可以开始编辑文档
- 下一步需要手动注册3个工具账号
- 然后开始收集隐语技术资料

