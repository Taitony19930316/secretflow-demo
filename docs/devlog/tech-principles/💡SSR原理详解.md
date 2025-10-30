# 💡 为什么环境检查能解决 SSR 报错？

---

## 🤔 问题回顾

### 报错信息

```
ReferenceError: window is not defined
```

### 解决方案

```javascript
if (typeof window !== 'undefined') {
  // 代码
}
```

**为什么加一个判断就行了？**

---

## 📚 核心概念

### 1. 什么是 SSR（服务端渲染）？

SSR = Server-Side Rendering（服务端渲染）

#### 传统的客户端渲染（CSR）

```
浏览器请求
    ↓
服务器返回空白 HTML + JavaScript
    ↓
浏览器下载 JavaScript
    ↓
JavaScript 执行，动态生成内容
    ↓
用户看到页面（慢）
```

**缺点**：
- 首屏加载慢
- SEO 不友好（搜索引擎看不到内容）
- 白屏时间长

#### 服务端渲染（SSR）

```
浏览器请求
    ↓
服务器用 Node.js 执行代码，生成完整 HTML
    ↓
服务器返回完整 HTML
    ↓
用户立即看到内容（快）
    ↓
浏览器下载 JavaScript，激活交互
```

**优点**：
- 首屏加载快
- SEO 友好
- 无白屏

---

## 🏗️ VuePress 的构建过程

### VuePress 2.x 构建流程

```
1. 读取 Markdown 文件
   ↓
2. 转换为 Vue 组件
   ↓
3. 【SSR 阶段】在 Node.js 中执行，生成 HTML
   ↓
4. 输出静态 HTML 文件
   ↓
5. 部署到服务器
   ↓
6. 【CSR 阶段】用户访问时，浏览器激活交互
```

### 关键点：两个不同的环境

| 环境 | 阶段 | 运行在 | 有 window 吗？ | 有 document 吗？ |
|------|------|--------|---------------|-----------------|
| **Node.js** | 构建时（SSR） | 服务器 | ❌ 没有 | ❌ 没有 |
| **浏览器** | 运行时（CSR） | 客户端 | ✅ 有 | ✅ 有 |

---

## ⚠️ 为什么会报错？

### 问题代码

```javascript
<script>
window.runPSI = async function() {
  // ...
}
</script>
```

### 执行过程

#### 第1步：构建时（Node.js 环境）

```javascript
// VuePress 在 Node.js 中执行这段代码
window.runPSI = async function() { }
        ↑
      这里报错！
```

**为什么报错**：
- Node.js 是服务器端 JavaScript 运行环境
- Node.js **没有** `window` 对象
- Node.js 只有 `global` 对象

**类比**：
```
就像在 Python 中调用 JavaScript 的函数
→ Python 说："我不认识 window 这个东西！"
→ ReferenceError: window is not defined
```

#### 第2步：运行时（浏览器环境）

如果代码能通过构建，到浏览器就正常了：
```javascript
// 浏览器中执行
window.runPSI = async function() { }
        ↑
      浏览器有 window，正常
```

---

## ✅ 为什么检查能解决问题？

### 解决方案代码

```javascript
if (typeof window !== 'undefined') {
  window.runPSI = async function() { }
}
```

### 执行过程详解

#### 构建时（Node.js 环境）

```javascript
// 第1步：检查 window 是否存在
typeof window
// 在 Node.js 中，window 未定义
// typeof 对未定义的变量不会报错，返回 'undefined'

// 第2步：判断
typeof window !== 'undefined'  // 'undefined' !== 'undefined'
                                // false

// 第3步：不执行 if 块内的代码
if (false) {
  // 这里的代码不会执行，跳过！
  window.runPSI = async function() { }  // 不执行，不报错
}
```

**关键**：`typeof` 是安全的运算符，对未定义的变量也不会报错。

#### 运行时（浏览器环境）

```javascript
// 第1步：检查 window 是否存在
typeof window
// 在浏览器中，window 存在
// 返回 'object'

// 第2步：判断
typeof window !== 'undefined'  // 'object' !== 'undefined'
                                // true

// 第3步：执行 if 块内的代码
if (true) {
  // 浏览器中执行这里的代码
  window.runPSI = async function() { }  // 正常挂载
}
```

---

## 🔬 深入理解：typeof 的特殊性

### 为什么用 typeof？

#### ❌ 错误的检查方式

```javascript
// 错误 1：直接检查
if (window !== undefined) {
  // 构建时这里就会报错！
  // ReferenceError: window is not defined
}

// 错误 2：检查是否存在
if (window) {
  // 同样报错
}
```

**为什么错误**：
- 在判断 `window !== undefined` 之前
- JavaScript 需要先**访问** `window` 变量
- 但 Node.js 中 `window` 根本不存在
- 访问时就报错了

#### ✅ 正确的检查方式

```javascript
if (typeof window !== 'undefined') {
  // 正确
}
```

**为什么正确**：
- `typeof` 是 JavaScript 的**运算符**，不是函数
- `typeof` 对**未定义的变量**也能正常工作
- 不会抛出 ReferenceError

### typeof 的特殊行为

```javascript
// 未定义的变量
console.log(notExist);           // ❌ ReferenceError
console.log(typeof notExist);    // ✅ 'undefined'（不报错）

// 这是 typeof 的特殊设计
```

---

## 🌍 两个世界的隔离

### Node.js 世界（服务器端）

```javascript
// Node.js 的全局对象
global.myVar = 'hello';

// 没有浏览器 API
console.log(typeof window);      // 'undefined'
console.log(typeof document);    // 'undefined'
console.log(typeof localStorage); // 'undefined'
console.log(typeof crypto.subtle); // 可能报错

// 但有 Node.js API
console.log(typeof require);     // 'function'
console.log(typeof process);     // 'object'
console.log(typeof __dirname);   // 'string'
```

### 浏览器世界（客户端）

```javascript
// 浏览器的全局对象
window.myVar = 'hello';

// 有浏览器 API
console.log(typeof window);      // 'object'
console.log(typeof document);    // 'object'
console.log(typeof localStorage); // 'object'
console.log(typeof crypto.subtle); // 'object'

// 但没有 Node.js API
console.log(typeof require);     // 'undefined'（浏览器中）
console.log(typeof process);     // 'undefined'
console.log(typeof __dirname);   // 'undefined'
```

---

## 🎯 实际应用：同构代码

### 什么是同构代码？

**同构（Isomorphic）代码**：能在服务器端和客户端都运行的代码。

### 编写同构代码的原则

#### 1. 环境检查

```javascript
// 检查是否在浏览器环境
if (typeof window !== 'undefined') {
  // 浏览器端代码
  window.myFunction = function() { }
}

// 检查是否在 Node.js 环境
if (typeof process !== 'undefined') {
  // Node.js 端代码
  const fs = require('fs');
}
```

#### 2. 条件导入

```javascript
let storage;
if (typeof window !== 'undefined') {
  storage = window.localStorage;
} else {
  // 服务器端使用文件存储
  storage = {
    getItem: (key) => { /* 读文件 */ },
    setItem: (key, val) => { /* 写文件 */ }
  };
}
```

#### 3. 生命周期钩子

在 Vue/React 等框架中：

```javascript
// Vue
export default {
  mounted() {
    // 这个钩子只在浏览器端执行
    window.addEventListener('scroll', this.onScroll);
  }
}

// React
useEffect(() => {
  // 这个 effect 只在浏览器端执行
  window.addEventListener('scroll', onScroll);
}, []);
```

---

## 📊 对比总结

### 问题 vs 解决

| 方面 | 问题代码 | 解决方案 |
|------|---------|---------|
| **代码** | `window.runPSI = ...` | `if (typeof window !== 'undefined') { window.runPSI = ... }` |
| **构建时** | ❌ 报错：window is not defined | ✅ 跳过，不执行 |
| **运行时** | - | ✅ 正常执行 |
| **原理** | 直接访问 window | 先检查，再访问 |

---

## 🔍 类比理解

### 类比1：检查门是否存在

```javascript
// 错误的方式
打开门();  // 如果门不存在，直接撞墙报错

// 正确的方式
if (门存在) {
  打开门();  // 只有门存在才尝试打开
}
```

### 类比2：检查工具是否可用

```javascript
// 在厨房
if (有搅拌机) {
  使用搅拌机();
}

// 在户外
if (有搅拌机) {
  // 户外没有搅拌机，这段代码不执行
  使用搅拌机();
}
```

---

## 💡 扩展知识

### 1. 其他需要检查的全局对象

```javascript
// 检查 document
if (typeof document !== 'undefined') {
  document.getElementById('app');
}

// 检查 localStorage
if (typeof localStorage !== 'undefined') {
  localStorage.setItem('key', 'value');
}

// 检查 navigator
if (typeof navigator !== 'undefined') {
  console.log(navigator.userAgent);
}
```

### 2. 检查是否在 Node.js 环境

```javascript
// 方法1：检查 process
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  console.log('在 Node.js 环境');
}

// 方法2：检查 window
if (typeof window === 'undefined') {
  console.log('不在浏览器环境，可能在 Node.js');
}
```

### 3. 更精确的环境检测

```javascript
function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function isNode() {
  return typeof process !== 'undefined' && 
         process.versions !== undefined && 
         process.versions.node !== undefined;
}

if (isBrowser()) {
  console.log('在浏览器中');
} else if (isNode()) {
  console.log('在 Node.js 中');
}
```

---

## 🎓 技术术语

### SSR vs CSR vs SSG

| 类型 | 全称 | 渲染时机 | 特点 |
|------|------|---------|------|
| **SSR** | Server-Side Rendering | 每次请求时 | 动态生成，SEO 好 |
| **CSR** | Client-Side Rendering | 浏览器端 | 单页应用，交互好 |
| **SSG** | Static Site Generation | 构建时 | 预渲染，速度快 |

VuePress 使用的是 **SSG**（静态站点生成）：
- 构建时用 SSR 生成 HTML
- 运行时用 CSR 激活交互

---

## ✅ 最佳实践

### 在 VuePress 中使用 JavaScript 的模板

```javascript
<script>
if (typeof window !== 'undefined') {
  // ====================================
  // 所有需要浏览器 API 的代码都放这里
  // ====================================
  
  // 全局函数
  window.myFunction = function() {
    // 使用 DOM API
    const element = document.getElementById('app');
    
    // 使用 Web API
    localStorage.setItem('key', 'value');
    
    // 使用浏览器 crypto
    crypto.subtle.digest('SHA-256', data);
  }
  
  // 事件监听
  document.addEventListener('DOMContentLoaded', function() {
    // 初始化代码
  });
  
  // 定时器
  setTimeout(() => {
    // 延迟执行的代码
  }, 1000);
}
</script>
```

---

## 🎯 总结

### 核心原理

1. **VuePress 在构建时使用 Node.js 执行代码**
2. **Node.js 没有 `window`、`document` 等浏览器对象**
3. **`typeof` 可以安全检查未定义的变量**
4. **环境检查让代码"聪明地"跳过不兼容的部分**

### 工作流程

```
构建时（Node.js）
  ↓
检查：typeof window !== 'undefined'
  ↓
结果：false（window 不存在）
  ↓
跳过 if 块内的代码
  ↓
构建成功，生成 HTML
  ↓
部署到服务器
  ↓
用户访问（浏览器）
  ↓
检查：typeof window !== 'undefined'
  ↓
结果：true（window 存在）
  ↓
执行 if 块内的代码
  ↓
功能正常工作
```

### 一句话总结

**通过 `typeof window !== 'undefined'` 检查，让代码在 Node.js 环境（构建时）跳过执行，在浏览器环境（运行时）正常执行，从而避免 SSR 报错。**

---

## 🤓 彩蛋：这不是"环境变量"

### 严格来说

- **环境变量（Environment Variable）**：系统级的配置变量，如 `process.env.NODE_ENV`
- **环境检查（Environment Check）**：运行时判断当前在什么环境

我们用的是**环境检查**，不是设置环境变量。

### 真正的环境变量

```javascript
// 读取环境变量（Node.js）
const mode = process.env.NODE_ENV;

if (mode === 'production') {
  console.log('生产环境');
} else {
  console.log('开发环境');
}
```

### 我们用的环境检查

```javascript
// 检查运行环境
if (typeof window !== 'undefined') {
  console.log('浏览器环境');
} else {
  console.log('Node.js 环境');
}
```

---

希望这个详细的解释能帮你理解！🎉

**核心要点**：
- VuePress 构建时在 Node.js 中运行代码
- Node.js 没有 `window` 对象
- `typeof` 可以安全检查未定义的变量
- 环境检查让代码跳过不兼容的环境

**简单记忆**：
```javascript
if (typeof window !== 'undefined') {
  // 只在浏览器中运行的代码
}
```

这一行代码 = "如果在浏览器里，才执行下面的代码"


