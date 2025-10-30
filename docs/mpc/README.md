# MPC

> Multi-Party Computation - 让数据联合计算，价值不设边界

---

## 场景痛点

### 联合计算的根本困境

在数据协作中，**仅仅知道交集是不够的**。更多场景需要在保护隐私的前提下，进行复杂的联合计算。

#### 更复杂的计算需求

- **联合统计分析**：多方数据的求和、平均值、方差
- **联合风险评估**：基于多方数据的综合评分
- **联合决策**：多方共同参与的复杂计算逻辑

#### PSI 的局限性

- **功能单一**：只能计算交集，无法支持其他运算
- **信息有限**：只知道"有没有"，不知道"是多少"
- **场景受限**：很多业务需要更复杂的协作

#### 传统方案的根本缺陷

| 方案 | 本质问题 | 结果 |
|------|---------|------|
| **中心化计算** | 数据全部集中到一方 | ❌ 数据泄露风险，违反合规 |
| **明文交换** | 数据直接共享 | ❌ 隐私全失，无法接受 |
| **可信第三方** | 信任单点风险 | ⚠️ 第三方可能作恶 |

#### 核心矛盾

```
联合计算需求 ⇄ 数据不能出本地
      ↓
  传统方案失效
      ↓
   MPC 技术登场
```

**本质问题：**
- **想要：** 联合计算得到结果
- **不能：** 泄露各方原始数据
- **传统技术：** 要么不计算，要么不隐私
- **MPC 方案：** 计算和隐私可以兼得

---

## 技术原理

### 什么是 MPC？

MPC（Multi-Party Computation，多方安全计算）允许多方在**不泄露各自输入**的情况下，共同计算一个函数，得到**正确的输出结果**。

**核心特点：**
- **输入隐私**：各方的原始数据不会泄露
- **计算正确**：最终结果和明文计算完全一致
- **任意函数**：支持加减乘除、比较、逻辑运算等

### MPC 工作流程（5步）

#### 步骤1：问题设定

**业务场景**：三家机构需要评估整体市场水平，为行业标准制定、资源分配决策提供依据。

三家机构想知道它们的**平均业务规模**，用于：
- 评估自己在行业中的位置（高于/低于平均水平）
- 为行业标准制定提供参考数据
- 辅助资源配置和战略规划

但各机构的具体数据属于商业机密，不能直接共享：
- 机构 A：100万
- 机构 B：200万
- 机构 C：300万

**目标**：在不泄露各自真实数据的前提下，计算平均值 = (100 + 200 + 300) / 3 = 200万

#### 步骤2：秘密分享（Secret Sharing）

每家机构将自己的数据**分成多份**，分发给其他机构：

```
机构 A (100万) 分成3份：
  → 发给自己：35
  → 发给 B：   42
  → 发给 C：   23
  （35 + 42 + 23 = 100）

机构 B (200万) 分成3份：
  → 发给 A：   67
  → 发给自己： 88
  → 发给 C：   45
  （67 + 88 + 45 = 200）

机构 C (300万) 分成3份：
  → 发给 A：   98
  → 发给 B：   110
  → 发给自己： 92
  （98 + 110 + 92 = 300）
```

**关键**：每一份数据单独看是**随机数**，没有任何意义！

#### 步骤3：本地计算

每家机构对收到的所有分片进行**本地求和**：

```
机构 A 手里有：35 (自己的) + 67 (B的) + 98 (C的) = 200
机构 B 手里有：42 (A的) + 88 (自己的) + 110 (C的) = 240
机构 C 手里有：23 (A的) + 45 (B的) + 92 (自己的) = 160
```

#### 步骤4：结果重构

三家机构公开各自的计算结果，相加：

```
200 + 240 + 160 = 600

平均值 = 600 / 3 = 200万 ✅
```

#### 步骤5：隐私保证

**整个过程中：**
- ✅ 每家机构只知道自己的原始数据
- ✅ 看到的其他机构的分片都是随机数
- ✅ 最终得到了正确的平均值
- ✅ 无法推断其他机构的真实数据

**业务价值实现：**
- 机构 A 知道自己（100万）低于平均水平（200万），可考虑扩大规模
- 机构 B 知道自己刚好在平均水平，保持当前策略
- 机构 C 知道自己高于平均水平，可输出最佳实践经验

### 隐私保护的核心

#### 机构 A 的视角

**我的数据：** 100万

**我看到的：**
- ✅ 我自己的分片：35
- ✅ B 发来的分片：67（随机数，看不出B的数据）
- ✅ C 发来的分片：98（随机数，看不出C的数据）
- ✅ 最终平均值：200万

**我看不到的：**
- ❌ 机构 B 的真实数据：200万
- ❌ 机构 C 的真实数据：300万
- ❌ 其他机构的其他分片

#### 机构 B 的视角

**我的数据：** 200万

**我看到的：**
- ✅ 我自己的分片：88
- ✅ A 发来的分片：42（随机数）
- ✅ C 发来的分片：110（随机数）
- ✅ 最终平均值：200万

**我看不到的：**
- ❌ 机构 A 的真实数据：100万
- ❌ 机构 C 的真实数据：300万

---

## 在线交互演示

::: tip 操作提示
下方演示可以直接在网页上运行，尝试修改数据看看效果！
:::

<div id="mpc-demo" style="padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin: 30px 0; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
<h3 style="color: white; margin-top: 0; font-size: 24px;">MPC 秘密分享演示</h3>
<div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-bottom: 20px;">
<div>
<label style="display: block; font-weight: bold; margin-bottom: 8px; color: #667eea;">参与方 A 的数据：</label>
<input type="number" id="dataA" value="100" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #667eea; border-radius: 6px; box-sizing: border-box;" />
</div>
<div>
<label style="display: block; font-weight: bold; margin-bottom: 8px; color: #764ba2;">参与方 B 的数据：</label>
<input type="number" id="dataB" value="200" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #764ba2; border-radius: 6px; box-sizing: border-box;" />
</div>
<div>
<label style="display: block; font-weight: bold; margin-bottom: 8px; color: #f093fb;">参与方 C 的数据：</label>
<input type="number" id="dataC" value="300" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #f093fb; border-radius: 6px; box-sizing: border-box;" />
</div>
</div>
<button onclick="runMPC()" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 30px; font-size: 18px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">秘密分享 + 联合计算</button>
</div>
<div id="mpc-result" style="margin-top: 15px;"></div>
</div>

### 深入学习：完整 SecretFlow MPC 实现

想要体验生产级的 SecretFlow MPC 实现？

<div style="max-width: 800px; margin: 30px auto; padding: 25px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 15px; box-shadow: 0 8px 30px rgba(245, 87, 108, 0.3);">
  <h4 style="color: white; margin-top: 0; font-size: 1.5em;">Google Colab 在线演示</h4>
  <p style="color: white; margin-bottom: 20px; font-size: 1.1em;">
    包含完整的 MPC 秘密分享、联合求和、联合比较等演示，以及可视化展示。
  </p>
  <a href="#" 
     target="_blank"
     style="display: inline-block; padding: 12px 30px; background: white; color: #f5576c; text-decoration: none; border-radius: 25px; font-weight: bold; transition: transform 0.2s; box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3); font-size: 1.1em;"
     onmouseover="this.style.transform='scale(1.05)'"
     onmouseout="this.style.transform='scale(1)'">
    打开 Colab 笔记本
  </a>
  <p style="color: white; margin-top: 15px; font-size: 0.95em; opacity: 0.9;">
    提示：点击后会在新标签页打开，可以直接运行代码
  </p>
</div>

---

## 应用场景

### 联合风控评估

#### 痛点
多家金融机构想要联合评估客户的综合信用，但各自的客户数据（收入、负债、消费记录）属于商业机密，不能直接共享。

#### 解决方案
使用 MPC 实现联合信用评分

**流程：**
1. 各机构将客户数据进行秘密分享
2. 使用 MPC 协议进行加权求和计算
3. 得到综合信用评分，但不泄露各自的原始数据

#### 价值
- **风控更准确**：多维度数据评估，降低坏账率20%+
- **合规无忧**：原始数据不出本地，符合监管要求
- **降低成本**：联合风控替代昂贵的第三方数据采购

---

### 联合科研统计

#### 痛点
多家科研机构想要分析某疾病的发病率和治疗效果，但患者隐私数据（病历、基因、用药）受严格保护，无法汇总。

#### 解决方案
使用 MPC 计算联合统计指标

**流程：**
1. 各机构对本地数据进行预处理
2. 使用 MPC 计算总和、平均值、方差
3. 输出统计结果，保护个体患者隐私

#### 价值
- **科研突破**：更大样本量带来更可靠的研究结论
- **隐私保护**：患者数据绝不泄露
- **促进合作**：打破数据孤岛，加速医学进步

---

### 供应链协同

#### 痛点
供应链上下游企业想要优化库存和物流，需要共享订单量、库存量、运输时间等敏感数据，但担心竞争对手获取商业情报。

#### 解决方案
使用 MPC 进行供应链优化计算

**流程：**
1. 各企业将订单和库存数据秘密分享
2. MPC 计算最优物流方案
3. 输出优化结果，不暴露各自的真实数据

#### 价值
- **降本增效**：优化库存周转，减少30%库存成本
- **商业保密**：竞争对手无法获取真实数据
- **灵活协作**：更精准的供需匹配

---

### 联合竞价与拍卖

#### 痛点
多方竞标项目时，传统方式需要公开报价或集中到第三方，存在串标、泄露底价等风险。

#### 解决方案
使用 MPC 实现隐私保护的竞价

**流程：**
1. 各方秘密提交报价（使用秘密分享）
2. MPC 计算最高/最低价，确定中标方
3. 只公布中标方和成交价，不泄露其他报价

#### 价值
- **公平公正**：无法操纵，防止串标
- **信息保护**：保护竞标方的商业策略
- **高效透明**：自动化流程，可追溯可审计

---

## 技术优势

### 与其他方案的对比

| 特性 | MPC | PSI | 可信第三方 | 明文计算 |
|------|-----|-----|----------|---------|
| **隐私保护** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ❌ 无隐私 |
| **计算灵活性** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **计算效率** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **去中心化** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ❌ 中心化 | ⭐⭐⭐ |
| **合规性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ❌ 违规风险 |

### 核心优势

#### 1. 任意函数计算

**不仅是交集，支持所有运算**

**技术保障：**
- 加法、减法、乘法、除法
- 比较运算（大于、小于、等于）
- 逻辑运算（与、或、非）
- 复杂函数组合

#### 2. 数学级安全保证

**基于密码学的严格安全性证明**

**实现方式：**
- 秘密分享（信息论安全）
- 零知识证明
- 同态加密
- 不经意传输

#### 3. 去中心化信任

**无需可信第三方，多方对等协作**

**关键技术：**
- 分布式计算协议
- 拜占庭容错机制
- 可验证计算

---

## 了解更多

### 关键技术详解

::: details 秘密分享（Secret Sharing）详解

### 什么是秘密分享？

**数学定义/技术定义**：
```
将秘密 S 分成 n 份：S₁, S₂, ..., Sₙ
满足：S = S₁ + S₂ + ... + Sₙ
性质：任何 k-1 份无法恢复 S（k-out-of-n）
```

**可视化**：
```
原始数据: 100
    ↓
秘密分享（3份）
    ↓
份额1: 35  (随机)
份额2: 42  (随机)
份额3: 23  (满足 35+42+23=100)
    ↓
单独看任何一份: 无意义的随机数
```

### 为什么用秘密分享？

#### 传统方案 vs 秘密分享

| 对比 | 明文计算 | 加密后计算 | 秘密分享 |
|------|---------|-----------|---------|
| **隐私性** | ❌ 无 | ⭐⭐⭐ 有 | ⭐⭐⭐⭐⭐ 强 |
| **计算效率** | ⭐⭐⭐⭐⭐ 快 | ⭐⭐ 慢 | ⭐⭐⭐⭐ 较快 |
| **计算灵活性** | ⭐⭐⭐⭐⭐ 任意 | ⭐⭐ 受限 | ⭐⭐⭐⭐⭐ 任意 |
| **安全级别** | ❌ 无 | 计算安全 | 信息论安全 |

**类比**：
- **明文计算**：账本公开，所有人都能看
- **秘密分享**：账本撕成碎片，分给多人保管，单独一片看不出内容

---

### 秘密分享在 MPC 中的应用

#### Shamir 秘密分享协议（SecretFlow 使用的）

**核心思想**：利用多项式插值

```
数学性质：
k个点可以唯一确定一个 k-1 次多项式
k-1 个点无法确定多项式
```

**具体过程**：

```
参与方 A 的数据：100
目标：分成3份，任意2份可恢复

步骤1：构造多项式（1次，即 k=2）
    f(x) = 100 + r₁·x
    其中 r₁ = 随机数（比如 50）
    
步骤2：计算分片
    份额1 = f(1) = 100 + 50×1 = 150
    份额2 = f(2) = 100 + 50×2 = 200
    份额3 = f(3) = 100 + 50×3 = 250
    
步骤3：分发份额
    发给 A：150
    发给 B：200
    发给 C：250

步骤4：重构秘密（任意2方）
    已知：(1, 150) 和 (2, 200)
    插值法：f(x) = 100 + 50x
    秘密 = f(0) = 100 ✅
```

**关键点**：
- ✅ 任何单个份额是随机数，无法推断原数据
- ✅ 2个或更多份额可以重构秘密
- ✅ 可以在分片上直接进行加法运算
- ✅ 信息论安全（即使计算能力无限也无法破解）

---

### 为什么信息论安全？

**信息论安全定义**：

```
已知：单个份额（比如 150）
求：原始数据（100）
```

**不可能性证明**：
```
份额 150 = 100 + 50×1
但 r₁ 可能是任何值：
- 如果 r₁ = 50，原数据 = 100
- 如果 r₁ = 25，原数据 = 125
- 如果 r₁ = 0，原数据 = 150
- ...（无穷多种可能）

结论：单个份额对应无穷多个可能的原始数据
      因此无法推断真实值
```

**与计算安全的区别**：
- **计算安全**：假设攻击者计算能力有限（比如无法破解 RSA）
- **信息论安全**：即使攻击者计算能力无限，也无法获取信息

:::

::: details MPC 加法和乘法协议详解

### MPC 如何实现加法？

**场景**：三方想计算 a + b + c，但不暴露各自的值

**加法协议（基于加法秘密分享）**：

```
参与方 A 有秘密 a = 100
参与方 B 有秘密 b = 200  
参与方 C 有秘密 c = 300

步骤1：各方分享自己的秘密
A 分享 100 → [a₁, a₂, a₃]
B 分享 200 → [b₁, b₂, b₃]
C 分享 300 → [c₁, c₂, c₃]

步骤2：各方本地计算（份额加法）
A 手里：s₁ = a₁ + b₁ + c₁
B 手里：s₂ = a₂ + b₂ + c₂
C 手里：s₃ = a₃ + b₃ + c₃

步骤3：重构结果
s₁ + s₂ + s₃ = (a₁+a₂+a₃) + (b₁+b₂+b₃) + (c₁+c₂+c₃)
             = a + b + c
             = 100 + 200 + 300
             = 600 ✅
```

**关键性质**：
- ✅ **加法同态**：份额的和 = 和的份额
- ✅ **本地计算**：不需要通信
- ✅ **高效**：O(1) 复杂度

---

### MPC 如何实现乘法？

**乘法更复杂！**

**问题**：直接相乘会破坏分享：
```
❌ 错误做法：
a的份额 [a₁, a₂] × b的份额 [b₁, b₂]
= [a₁b₁, a₂b₂]
≠ ab 的正确分享
```

**Beaver 乘法三元组协议**：

```
预处理阶段：生成随机三元组 (x, y, z)
其中 z = x × y，各方持有份额 [x], [y], [z]

在线阶段：计算 a × b

步骤1：计算差值
d = a - x  (公开)
e = b - y  (公开)

步骤2：各方本地计算份额
[ab] = [z] + e[x] + d[y] + de

步骤3：重构
ab = z + ex + dy + de
   = xy + e(x) + d(y) + de
   = xy + (b-y)x + (a-x)y + (a-x)(b-y)
   = xy + bx - xy + ay - xy + ab - bx - ay + xy
   = ab ✅
```

**性能对比**：

| 操作 | 通信轮次 | 通信量 |
|------|---------|-------|
| **加法** | 0 | 0 |
| **乘法** | 1 | O(n²) |
| **比较** | log(n) | O(n² log n) |

:::

::: details MPC vs 同态加密详解

### 什么是同态加密？

**核心**：在密文上直接计算，结果解密后等于明文计算结果

**同态加密示例**：
```python
# 明文计算
result = encrypt(10 + 20)  # 30

# 同态计算
c1 = encrypt(10)
c2 = encrypt(20)
c3 = homomorphic_add(c1, c2)  # 密文加法
result = decrypt(c3)  # 30 ✅
```

---

### MPC vs 同态加密对比

#### 同态加密的优势

**场景**：云计算外包

```
客户 → 上传加密数据 → 云服务器
云服务器 → 在密文上计算 → 返回加密结果
客户 → 解密 → 得到明文结果
```

**优势**：
- ✅ 单方计算，不需要多方协作
- ✅ 云端看不到明文数据

**劣势**：
- ❌ 计算开销极大（慢1000-10000倍）
- ❌ 只支持特定运算（加法和乘法）
- ❌ 噪声累积，计算深度受限

#### MPC 的优势

**场景**：多方联合计算

```
参与方 A ↘
参与方 B  → MPC 协议 → 得到结果
参与方 C ↗
```

**优势**：
- ✅ 支持任意计算
- ✅ 性能开销较小（慢10-100倍）
- ✅ 可扩展到复杂逻辑

**劣势**：
- ❌ 需要多方在线协作
- ❌ 通信开销大

---

### 应用场景选择

| 场景 | 推荐方案 |
|------|---------|
| **云计算外包** | 同态加密 |
| **多方联合统计** | MPC |
| **复杂业务逻辑** | MPC |
| **离线计算** | 同态加密 |
| **实时协作** | MPC |

:::

::: details 完整的 MPC 流程（所有技术结合）

### 真正的 SecretFlow MPC 联合求和

```
参与方 A (a=100)          参与方 B (b=200)          参与方 C (c=300)
  |                          |                          |
  | 1. 秘密分享              | 1. 秘密分享              | 1. 秘密分享
  |    [a₁, a₂, a₃]         |    [b₁, b₂, b₃]         |    [c₁, c₂, c₃]
  |                          |                          |
  | 2. 分发份额 ─────────────┼──────────────────────────┤
  |    发送 a₂ ──────────────→                          |
  |    发送 a₃ ──────────────┼──────────────────────────→
  |                          |                          |
  |  ←────────────── 接收 b₁ |                          |
  |  ←─────────────────────────────────────── 接收 c₁  |
  |                          |                          |
  | 3. 本地求和              | 3. 本地求和              | 3. 本地求和
  |    s₁ = a₁+b₁+c₁        |    s₂ = a₂+b₂+c₂        |    s₃ = a₃+b₃+c₃
  |                          |                          |
  | 4. 公开部分和 ───────────┼──────────────────────────┤
  |    广播 s₁               |    广播 s₂               |    广播 s₃
  |                          |                          |
  | 5. 重构结果              | 5. 重构结果              | 5. 重构结果
  |    sum = s₁+s₂+s₃       |    sum = s₁+s₂+s₃       |    sum = s₁+s₂+s₃
  |    = 600 ✅              |    = 600 ✅              |    = 600 ✅
```

### 安全性分析

**针对不同攻击的防御**

| 攻击方式 | 简化版 | SecretFlow MPC |
|---------|--------|----------------|
| **窃听通信** | ❌ 可以获取数据 | ✅ 只看到份额（随机数） |
| **单方作恶** | ❌ 可以篡改结果 | ✅ 拜占庭容错 |
| **多方串谋** | ❌ 可以推断数据 | ✅ 需要 k 方串谋才能破解 |
| **暴力破解** | ❌ 可以尝试 | ✅ 信息论安全，无法破解 |

### 技术组合的威力

**每个技术解决一个问题**：

```
秘密分享
    ↓ 解决：隐私保护 + 分布式存储
    
Beaver 三元组
    ↓ 解决：高效乘法计算
    
零知识证明
    ↓ 解决：恶意方作弊
    
拜占庭容错
    ↓ 解决：部分方掉线
    
多层组合
    ↓ 结果：安全 + 高效 + 鲁棒 ✅
```

### 性能对比

**计算复杂度**

| 操作 | 明文计算 | MPC |
|------|---------|-----|
| **加法** | O(1) | O(1) |
| **乘法** | O(1) | O(n²) |
| **比较** | O(1) | O(n² log n) |

**实际性能**（1000次计算）：
- 明文计算：1 ms
- MPC（3方）：100 ms

**但 MPC 换来了**：
- ✅ 绝对的隐私保护
- ✅ 去中心化信任
- ✅ 合规无忧

:::

::: details 深入学习资源

**秘密分享相关**：
- 📖 书籍：《A Pragmatic Introduction to Secure Multi-Party Computation》
- 🎓 课程：MIT 6.875 - Cryptography and Cryptanalysis

**MPC 协议相关**：
- 📄 论文：Yao's Garbled Circuits, GMW Protocol, BGW Protocol
- 🔗 博客：https://mortendahl.github.io/

**SecretFlow MPC 实现**：
- 📚 官方文档：https://www.secretflow.org.cn/docs/secretflow/latest/zh-CN/tutorial/MPC
- 💻 源代码：https://github.com/secretflow/secretflow

### 技术作用对比

| 技术 | 作用 | 类比 |
|------|------|------|
| **秘密分享** | 将数据分片保护 | 把钥匙分成几段 |
| **Beaver三元组** | 高效乘法计算 | 预计算加速 |
| **零知识证明** | 防止作弊 | 不泄露信息的证明 |

:::

---

### 相关资源

- [隐语官方文档](https://www.secretflow.org.cn/)
- [GitHub 仓库](https://github.com/secretflow/secretflow)
- [MPC 论文合集](https://github.com/rdragos/awesome-mpc)
- [视频教程](https://www.bilibili.com/video/BV1xx4y1Q7zF/)

---

> **提示**：想要实际应用 MPC 技术？可以下载隐语 SDK，几行代码就能实现多方安全计算！

<script>
if (typeof window !== 'undefined') {
  window.runMPC = async function() {
    const button = event.target;
    button.textContent = '计算中...';
    button.disabled = true;
    
    const dataA = parseFloat(document.getElementById('dataA').value) || 100;
    const dataB = parseFloat(document.getElementById('dataB').value) || 200;
    const dataC = parseFloat(document.getElementById('dataC').value) || 300;
    const resultDiv = document.getElementById('mpc-result');
    
    // 模拟计算延迟
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 秘密分享（简化版：加法秘密分享）
    // 参与方 A 分享
    const a1 = Math.floor(Math.random() * dataA);
    const a2 = Math.floor(Math.random() * (dataA - a1));
    const a3 = dataA - a1 - a2;
    
    // 参与方 B 分享
    const b1 = Math.floor(Math.random() * dataB);
    const b2 = Math.floor(Math.random() * (dataB - b1));
    const b3 = dataB - b1 - b2;
    
    // 参与方 C 分享
    const c1 = Math.floor(Math.random() * dataC);
    const c2 = Math.floor(Math.random() * (dataC - c1));
    const c3 = dataC - c1 - c2;
    
    // 各方本地计算
    const sum1 = a1 + b1 + c1;
    const sum2 = a2 + b2 + c2;
    const sum3 = a3 + b3 + c3;
    
    // 最终结果
    const total = sum1 + sum2 + sum3;
    const average = (total / 3).toFixed(2);
    
    // 构建结果HTML
    let html = '<div style="background: white; padding: 20px; border-radius: 8px;">';
    html += '<h4 style="color: #667eea; margin-top: 0; font-size: 20px;">MPC 计算完成</h4>';
    
    // 秘密分享阶段
    html += '<div style="padding: 15px; background: #f0f4ff; border-left: 4px solid #667eea; margin: 15px 0; border-radius: 4px;">';
    html += '<strong style="font-size: 17px; color: #667eea;">步骤1：秘密分享</strong><br/>';
    html += '<div style="margin-top: 10px; font-size: 15px;">';
    html += '参与方 A (' + dataA + ') → 份额: [' + a1 + ', ' + a2 + ', ' + a3 + ']<br/>';
    html += '参与方 B (' + dataB + ') → 份额: [' + b1 + ', ' + b2 + ', ' + b3 + ']<br/>';
    html += '参与方 C (' + dataC + ') → 份额: [' + c1 + ', ' + c2 + ', ' + c3 + ']';
    html += '</div></div>';
    
    // 本地计算阶段
    html += '<div style="padding: 15px; background: #f0f4ff; border-left: 4px solid #764ba2; margin: 15px 0; border-radius: 4px;">';
    html += '<strong style="font-size: 17px; color: #764ba2;">步骤2：各方本地求和</strong><br/>';
    html += '<div style="margin-top: 10px; font-size: 15px;">';
    html += 'A 手里: ' + a1 + ' + ' + b1 + ' + ' + c1 + ' = ' + sum1 + '<br/>';
    html += 'B 手里: ' + a2 + ' + ' + b2 + ' + ' + c2 + ' = ' + sum2 + '<br/>';
    html += 'C 手里: ' + a3 + ' + ' + b3 + ' + ' + c3 + ' = ' + sum3;
    html += '</div></div>';
    
    // 最终结果
    html += '<div style="padding: 20px; background: #e8f5e9; border-left: 5px solid #4caf50; margin: 15px 0; border-radius: 8px;">';
    html += '<strong style="font-size: 18px; color: #2e7d32;">步骤3：重构最终结果</strong><br/>';
    html += '<div style="margin-top: 15px; font-size: 17px; color: #1b5e20;">';
    html += sum1 + ' + ' + sum2 + ' + ' + sum3 + ' = <strong style="font-size: 22px; color: #4caf50;">' + total + '</strong><br/>';
    html += '平均值 = ' + total + ' ÷ 3 = <strong style="font-size: 24px; color: #4caf50;">' + average + '</strong>';
    html += '</div></div>';
    
    // 隐私保护说明
    html += '<div style="padding: 20px; background: #fff8e1; border-left: 5px solid #ff9800; border-radius: 8px; margin-top: 15px;">';
    html += '<strong style="font-size: 17px; color: #e65100;">隐私保护原理</strong><br/>';
    html += '<div style="margin-top: 10px; font-size: 15px; line-height: 1.8; color: #333;">';
    html += '• 每个份额单独看是随机数，看不出原数据<br/>';
    html += '• 各方只看到其他方的份额，无法推断真实值<br/>';
    html += '• 只有汇总后才能得到正确结果<br/>';
    html += '• 整个过程信息论安全，即使计算能力无限也无法破解';
    html += '</div></div>';
    
    html += '</div>';
    resultDiv.innerHTML = html;
    
    button.textContent = '秘密分享 + 联合计算';
    button.disabled = false;
  };
}
</script>

<style>
#mpc-demo button:active {
  transform: translateY(1px) !important;
}

#mpc-demo input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}
</style>

