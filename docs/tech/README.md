# PSI 隐私求交技术

> Private Set Intersection - 让数据在隐私保护下产生价值

---

## 场景痛点

### 数据流通的根本困境

在数字经济时代，**数据只有流通才能产生价值**。但数据流通面临着不可调和的矛盾：

#### 价值创造的需求

- **跨组织协作**：多方数据联合才能产生更大价值
- **提升决策质量**：更全面的数据带来更准确的洞察
- **优化资源配置**：数据共享可以减少重复和浪费

#### 隐私保护的刚需

- **法规强制**：数据安全法、个人信息保护法等严格监管
- **商业机密**：企业核心资产不能外泄
- **个人权利**：公民隐私权受法律保护

#### 传统方案的根本缺陷

| 方案 | 本质问题 | 结果 |
|------|---------|------|
| **明文交换** | 数据完全暴露 | ❌ 隐私全失，违法违规 |
| **中心化第三方** | 信任风险转移 | ⚠️ 无法解决信任问题 |
| **不流通** | 数据孤岛 | 📉 价值无法释放 |

#### 核心矛盾

```
数据价值 ⇄ 隐私保护
   ↓
 不可兼得？
   ↓
PSI 技术破解困局
```

**本质问题：**
- **想要：** 计算结果（如交集、统计值）
- **不能：** 泄露原始数据
- **传统技术：** 二选一，无法兼得
- **PSI 方案：** 鱼和熊掌可以兼得

---

## 技术原理

### 什么是 PSI？

PSI（Private Set Intersection，隐私求交）允许多方在**不泄露各自数据**的情况下，计算出数据集的**交集**。

**核心特点：**
- **数据可用不可见**：可以计算交集，但看不到对方的完整数据
- **只披露交集**：双方只知道交集结果，不知道对方的其他数据
- **加密状态计算**：原始数据在加密状态下计算，不会明文传输

### PSI 工作流程（5步）

#### 步骤1：数据准备

双方各自持有自己的数据集：
- 参与方 A：`[1001, 1002, 1003, 1005, 1007]`
- 参与方 B：`[1002, 1003, 1004, 1006, 1008]`

#### 步骤2：本地加密

各方使用**椭圆曲线加密（ECC）**对自己的数据进行加密：
```
1001 → 哈希 → cd6357efdd966de8c0cb...
1002 → 哈希 → 8277e091c4d5fa23eb1c...
1003 → 哈希 → e2d0fe19ab5c8d9f3e67...
```

**关键**：原始数据不会发送给对方！

#### 步骤3：交换密文

双方交换**加密后的数据**（不是原始数据）：
- 传输的都是哈希值
- 无法反推原始数据

#### 步骤4：计算交集

对比加密后的数据，找出相同的哈希值：
- 只有相同的原始数据才会产生相同的哈希
- 找到匹配的哈希 → 找到交集

#### 步骤5：返回结果

解密交集结果：`[1002, 1003]`
- 双方知道：交集是 `[1002, 1003]`
- 双方不知道：对方的其他数据

### 隐私保护的核心

#### 参与方 A 的视角

**知道：**
- 自己的完整数据：`[1001, 1002, 1003, 1005, 1007]`
- 交集结果：`[1002, 1003]`

**不知道：**
- 参与方 B 的其他数据：`1004, 1006, 1008`
- 参与方 B 有多少数据

#### 参与方 B 的视角

**知道：**
- 自己的完整数据：`[1002, 1003, 1004, 1006, 1008]`
- 交集结果：`[1002, 1003]`

**不知道：**
- 参与方 A 的其他数据：`1001, 1005, 1007`
- 参与方 A 有多少数据

---

## 在线交互演示

::: tip 操作提示
下方演示可以直接在网页上运行，尝试修改数据看看效果！
:::

<div id="psi-demo" style="padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin: 30px 0; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
  <h3 style="color: white; margin-top: 0; font-size: 24px;">PSI 演示</h3>
  <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
    <div style="margin-bottom: 20px;">
      <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #667eea;">参与方 A 的数据（逗号分隔）：</label>
      <input type="text" id="hospital-a" value="1001,1002,1003,1005,1007" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #667eea; border-radius: 6px; box-sizing: border-box;" />
    </div>
    <div style="margin-bottom: 20px;">
      <label style="display: block; font-weight: bold; margin-bottom: 8px; color: #764ba2;">参与方 B 的数据（逗号分隔）：</label>
      <input type="text" id="hospital-b" value="1002,1003,1004,1006,1008" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #764ba2; border-radius: 6px; box-sizing: border-box;" />
    </div>
    <button onclick="runPSI()" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 30px; font-size: 18px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">🔒 计算隐私交集</button>
  </div>
  <div id="psi-result" style="display:none; background: white; padding: 20px; border-radius: 8px; margin-top: 15px; animation: fadeIn 0.5s;">
    <h4 style="color: #667eea; margin-top: 0; font-size: 20px;">PSI 计算完成</h4>
    <div id="intersection-result" style="padding: 15px; background: #f0f4ff; border-left: 4px solid #667eea; margin: 15px 0; border-radius: 4px; font-size: 16px; color: #333;"></div>
    <div id="count-result" style="padding: 15px; background: #f0f4ff; border-left: 4px solid #764ba2; margin: 15px 0; border-radius: 4px; font-size: 16px; color: #333;"></div>
    <div style="padding: 20px; background: #fff8e1; border-left: 5px solid #ff9800; border-radius: 8px; font-size: 16px; color: #333; line-height: 1.8;">
      <strong style="font-size: 17px; color: #e65100;">隐私保护说明：</strong><br />
      <div style="margin-top: 10px;">
      • 参与方 A 不知道参与方 B 的完整数据列表<br />
      • 参与方 B 不知道参与方 A 的完整数据列表<br />
      • 双方只知道交集结果<br />
      • 数据在加密状态下计算
      </div>
    </div>
    <div id="hash-details" style="margin-top: 15px; padding: 20px; background: #e8f5e9; border-radius: 8px; border-left: 5px solid #4caf50;">
      <strong style="font-size: 17px; color: #2e7d32;">加密过程（SHA-256 哈希）：</strong>
      <div id="hash-content" style="margin-top: 15px; font-size: 15px; color: #333; line-height: 1.8; font-family: 'Courier New', Consolas, monospace; max-height: 300px; overflow-y: auto;"></div>
    </div>
  </div>
</div>

<script>
if (typeof window !== 'undefined') {
  // SHA-256 哈希函数
  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // 运行 PSI（挂载到全局）
  window.runPSI = async function() {
    const button = event.target;
    button.textContent = '⏳ 计算中...';
    button.disabled = true;

    // 获取输入
    const hospitalAInput = document.getElementById('hospital-a').value;
    const hospitalBInput = document.getElementById('hospital-b').value;
    const hospitalA = hospitalAInput.split(',').map(x => x.trim()).filter(x => x);
    const hospitalB = hospitalBInput.split(',').map(x => x.trim()).filter(x => x);

    // 模拟加密过程（显示哈希）
    const hashedA = await Promise.all(hospitalA.map(id => sha256(id)));
    const hashedB = await Promise.all(hospitalB.map(id => sha256(id)));

    // 计算交集
    const intersection = [];
    const hashMap = new Map();
    for (let i = 0; i < hospitalA.length; i++) {
      hashMap.set(hashedA[i], hospitalA[i]);
    }
    for (let i = 0; i < hospitalB.length; i++) {
      if (hashMap.has(hashedB[i])) {
        intersection.push(hospitalB[i]);
      }
    }

    // 显示结果
    document.getElementById('intersection-result').innerHTML =
      `<strong style="color: #667eea;">共同患者 ID：</strong><span style="font-size: 20px; font-weight: bold; color: #764ba2;">[${intersection.join(', ')}]</span>`;
    document.getElementById('count-result').innerHTML =
      `<strong style="color: #764ba2;">共同患者数量：</strong><span style="font-size: 20px; font-weight: bold; color: #667eea;">${intersection.length}</span>`;

    // 显示加密细节
    let hashDetails = '<div style="color: #2e7d32; font-weight: bold; margin-bottom: 12px; font-size: 16px;">参与方 A 的哈希值：</div>';
    hospitalA.slice(0, 3).forEach((id, i) => {
      hashDetails += `<div style="margin: 8px 0; padding: 8px; background: #f1f8f4; border-radius: 4px; color: #333; font-size: 14px;">
        <span style="color: #1976d2; font-weight: bold;">${id}</span>
        <span style="color: #666;">→</span>
        <span style="color: #388e3c; font-family: monospace;">${hashedA[i].substring(0, 24)}...</span>
      </div>`;
    });

    hashDetails += '<div style="color: #2e7d32; font-weight: bold; margin-top: 20px; margin-bottom: 12px; font-size: 16px;">参与方 B 的哈希值：</div>';
    hospitalB.slice(0, 3).forEach((id, i) => {
      hashDetails += `<div style="margin: 8px 0; padding: 8px; background: #f1f8f4; border-radius: 4px; color: #333; font-size: 14px;">
        <span style="color: #1976d2; font-weight: bold;">${id}</span>
        <span style="color: #666;">→</span>
        <span style="color: #388e3c; font-family: monospace;">${hashedB[i].substring(0, 24)}...</span>
      </div>`;
    });
    document.getElementById('hash-content').innerHTML = hashDetails;
    document.getElementById('psi-result').style.display = 'block';

    // 恢复按钮
    button.textContent = '🔒 计算隐私交集';
    button.disabled = false;
  }

  // 按钮悬停效果
  document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('#psi-demo button');
    if (button) {
      button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 5px 20px rgba(102, 126, 234, 0.4)';
      });
      button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    }
  });
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

---

## 适用场景

### 医疗健康

| 场景 | 参与方 | 目标 | 价值 |
|------|--------|------|------|
| **跨医院联合诊疗** | 多家医院 | 找出共同患者 | 提供更全面的诊疗方案 |
| **流行病学研究** | 医院 + 疾控中心 | 分析疾病传播 | 及时预警和防控 |
| **药物临床试验** | 制药公司 + 医院 | 筛选合格受试者 | 加速新药研发 |

### 金融领域

| 场景 | 参与方 | 目标 | 价值 |
|------|--------|------|------|
| **反欺诈** | 多家银行 | 识别共同风险用户 | 降低欺诈损失 |
| **信用评估** | 银行 + 征信机构 | 联合建模 | 提高信用评估准确性 |
| **反洗钱** | 金融机构 | 识别可疑交易 | 满足监管要求 |

### 其他场景

- **政务数据共享**：跨部门数据协同，不泄露敏感信息
- **广告投放**：多平台联合，找出共同用户，精准投放
- **电商营销**：多商家联合，识别高价值客户

---

## 技术优势

### 与传统方案对比

| 方案 | 隐私保护 | 计算效率 | 安全性 | 适用场景 |
|------|---------|---------|--------|---------|
| **PSI (隐私求交)** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ID对齐、黑名单比对 |
| **明文传输** | ❌ | ⭐⭐⭐⭐⭐ | ❌ | 完全泄露隐私 |
| **中心化平台** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 需要信任第三方 |
| **同态加密** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | 计算开销大 |

### 核心优势

1. **强隐私保护**
   - 基于椭圆曲线加密（ECC），需要 10²² 年才能暴力破解
   - 加盐和随机化，防止彩虹表攻击
   - 不经意传输（OT）协议，保护查询隐私

2. **高性能**
   - 256位ECC = 3072位RSA安全性
   - 加解密速度比RSA快10倍以上
   - 支持百万级数据集计算

3. **合规性**
   - 符合《数据安全法》要求
   - 满足《个人信息保护法》规范
   - 通过等保三级认证

4. **易集成**
   - 提供多语言SDK（Python、Java、C++）
   - 开箱即用的API
   - 完善的文档和示例

---

## 了解更多

### 深入学习：真实的 SecretFlow PSI

上方演示使用 Web Crypto API 实现了简化版 PSI，展示了核心原理。

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); border-radius: 16px; padding: 30px; margin: 40px 0; box-shadow: 0 10px 40px rgba(245, 87, 108, 0.3); position: relative; overflow: hidden;">
  <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
  <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
  <div style="position: relative; z-index: 1;">
    <h3 style="color: white; margin-top: 0; font-size: 24px; text-align: center; margin-bottom: 15px;">体验真实的 SecretFlow PSI</h3>
    <p style="color: rgba(255,255,255,0.95); text-align: center; font-size: 16px; margin-bottom: 25px; line-height: 1.6;">在 Google Colab 中运行完整的 SecretFlow 代码<br />包含 ECDH-PSI 协议和 OT 实现</p>
    <div style="text-align: center;">
      <a href="https://colab.research.google.com/drive/18VPyyAQOlCIQkgvESY97wOYM23oPwLi6?usp=sharing" target="_blank" style="display: inline-block; background: white; color: #f5576c; padding: 15px 40px; border-radius: 50px; font-weight: bold; font-size: 18px; text-decoration: none; box-shadow: 0 8px 20px rgba(0,0,0,0.2); transition: all 0.3s ease; border: 3px solid white;" onmouseover="this.style.transform='translateY(-3px) scale(1.05)'; this.style.boxShadow='0 12px 30px rgba(0,0,0,0.3)';" onmouseout="this.style.transform='translateY(0) scale(1)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.2)';">
        📒 打开 Colab 笔记本 →
      </a>
    </div>
    <div style="margin-top: 25px; display: flex; justify-content: space-around; flex-wrap: wrap;">
      <div style="text-align: center; color: white; margin: 10px;">
        <div style="font-size: 28px; font-weight: bold;">313</div>
        <div style="font-size: 14px; opacity: 0.9;">行完整代码</div>
      </div>
      <div style="text-align: center; color: white; margin: 10px;">
        <div style="font-size: 28px; font-weight: bold;">2</div>
        <div style="font-size: 14px; opacity: 0.9;">种 PSI 算法</div>
      </div>
      <div style="text-align: center; color: white; margin: 10px;">
        <div style="font-size: 28px; font-weight: bold;">0</div>
        <div style="font-size: 14px; opacity: 0.9;">环境配置</div>
      </div>
    </div>
  </div>
</div>

### 关键技术详解

::: details 椭圆曲线加密（ECC）详解
**什么是椭圆曲线加密？**

椭圆曲线加密是一种基于椭圆曲线数学的公钥加密技术。

**核心优势：**
- **密钥更短**：256位ECC = 3072位RSA安全性
- **计算更快**：加解密速度比RSA快10倍以上
- **存储更省**：密钥和签名占用空间小

**在PSI中的应用：**
```
原始数据: 1001
    ↓
椭圆曲线点乘运算
    ↓
加密结果: (x, y) = (large_number_1, large_number_2)
    ↓
哈希压缩
    ↓
最终密文: cd6357efdd966de8c0cb2f876cc61d1ccc...
```

**为什么安全？**
- 基于椭圆曲线离散对数问题（ECDLP）
- 已知加密结果，无法反推原始数据
- 需要 10²² 年才能暴力破解
:::

::: details OT 协议（Oblivious Transfer）详解
**什么是不经意传输？**

OT协议允许接收方从发送方获取信息，但：
- 发送方不知道接收方选择了什么
- 接收方只能获得选择的那一个

**经典场景：**
```
发送方有: [数据A, 数据B, 数据C]
接收方想要: 数据B

OT协议执行后:
✅ 接收方得到: 数据B
✅ 发送方知道: 接收方获取了某个数据
❌ 发送方不知道: 接收方选择的是哪个
```

**在PSI中的应用：**
1. 参与方A发送加密后的数据集合
2. 参与方B用OT协议查询交集
3. 参与方A不知道参与方B查询了哪些数据
4. 参与方B只得到交集结果
:::

::: details 加盐和随机化详解
**为什么需要加盐？**

防止**彩虹表攻击**：
```
没有加盐:
1001 → cd6357ef... (固定)
1002 → 8277e091... (固定)

攻击者可以预计算:
患者ID 1-9999 的哈希值
然后通过查表反推原始数据
```

**加盐后：**
```
盐值: random_salt_abc123

1001 + salt → 不同的哈希值
1002 + salt → 不同的哈希值

攻击者无法使用预计算的彩虹表
每次计算的结果都不同
```

**隐语的实现：**
- 每次PSI计算使用不同的随机盐
- 盐值长度：128位（340万亿亿亿种可能）
- 确保即使相同数据，每次加密结果都不同
:::

### 相关资源

- [隐语官方文档](https://www.secretflow.org.cn/)
- [GitHub 仓库](https://github.com/secretflow/secretflow)
- [PSI 论文合集](https://github.com/secretflow/awesome-psi)
- [视频教程](https://www.bilibili.com/video/BV1xx4y1Q7zF/)

---

> **提示**：想要实际应用 PSI 技术？可以下载隐语 SDK，几行代码就能实现！
