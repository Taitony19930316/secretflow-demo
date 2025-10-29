# PSI 技术原理

隐私求交（Private Set Intersection，PSI）是隐私计算的基础技术之一。

## PSI 是什么？

PSI 允许多方在不泄露各自数据的情况下，计算出数据集的交集。

核心特点：
- 数据可用不可见
- 只有交集结果被披露
- 原始数据保持加密状态

## 隐语 PSI 的核心技术

隐语（SecretFlow）采用以下密码学技术实现 PSI：

### 1. 椭圆曲线加密（ECC）
- 使用 ECDH-PSI 协议
- 无法暴力破解（需要 10²² 年）
- 密钥更短但安全性更高

### 2. OT 协议（不经意传输）
- 发送方不知道接收方选择了什么
- 接收方只能获取选定的数据
- 保护查询隐私

### 3. 加盐和随机化
- 防止彩虹表攻击
- 隐藏数据集大小
- 每次加密结果都不同

## 🎮 在线交互演示

::: tip 操作提示
下方演示可以直接在网页上运行，尝试修改数据看看效果！
:::

<ClientOnly>
<div id="psi-demo" style="padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; margin: 30px 0; box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
<h3 style="color: white; margin-top: 0; font-size: 24px;">🏥 医疗场景 PSI 演示</h3>
<div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
<div style="margin-bottom: 20px;">
<label style="display: block; font-weight: bold; margin-bottom: 8px; color: #667eea;">🏥 医院 A 的患者 ID（逗号分隔）：</label>
<input type="text" id="hospital-a" value="1001,1002,1003,1005,1007" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #667eea; border-radius: 6px; box-sizing: border-box;" />
</div>
<div style="margin-bottom: 20px;">
<label style="display: block; font-weight: bold; margin-bottom: 8px; color: #764ba2;">🏥 医院 B 的患者 ID（逗号分隔）：</label>
<input type="text" id="hospital-b" value="1002,1003,1004,1006,1008" style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #764ba2; border-radius: 6px; box-sizing: border-box;" />
</div>
<button onclick="runPSI()" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; padding: 15px 30px; font-size: 18px; font-weight: bold; border-radius: 8px; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;">🔒 计算隐私交集</button>
</div>
<div id="psi-result" style="display:none; background: white; padding: 20px; border-radius: 8px; margin-top: 15px; animation: fadeIn 0.5s;">
<h4 style="color: #667eea; margin-top: 0;">✅ PSI 计算完成</h4>
<div id="intersection-result" style="padding: 15px; background: #f0f4ff; border-left: 4px solid #667eea; margin: 15px 0; border-radius: 4px;"></div>
<div id="count-result" style="padding: 15px; background: #f0f4ff; border-left: 4px solid #764ba2; margin: 15px 0; border-radius: 4px;"></div>
<div style="padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; font-size: 14px;">
<strong>🔒 隐私保护说明：</strong><br />
• 医院 A 不知道医院 B 的完整患者列表<br />
• 医院 B 不知道医院 A 的完整患者列表<br />
• 双方只知道交集结果<br />
• 数据在加密状态下计算
</div>
<div id="hash-details" style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 4px; font-size: 12px; font-family: monospace;">
<strong>🔐 加密过程（SHA-256 哈希）：</strong>
<div id="hash-content" style="margin-top: 10px; max-height: 200px; overflow-y: auto;"></div>
</div>
</div>
</div>
</ClientOnly>

<script>
// SHA-256 哈希函数
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 运行 PSI
async function runPSI() {
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
  let hashDetails = '<div style="color: #667eea;"><strong>医院 A 的哈希：</strong></div>';
  hospitalA.slice(0, 3).forEach((id, i) => {
    hashDetails += `<div style="margin: 5px 0;">${id} → ${hashedA[i].substring(0, 16)}...</div>`;
  });
  
  hashDetails += '<div style="color: #764ba2; margin-top: 10px;"><strong>医院 B 的哈希：</strong></div>';
  hospitalB.slice(0, 3).forEach((id, i) => {
    hashDetails += `<div style="margin: 5px 0;">${id} → ${hashedB[i].substring(0, 16)}...</div>`;
  });
  
  document.getElementById('hash-content').innerHTML = hashDetails;
  document.getElementById('psi-result').style.display = 'block';
  
  // 恢复按钮
  button.textContent = '🔒 计算隐私交集';
  button.disabled = false;
}

// 按钮悬停效果（仅在浏览器环境运行）
if (typeof window !== 'undefined') {
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

## 📚 深入学习：真正的 SecretFlow PSI

上方演示使用 Web Crypto API 实现了简化版 PSI，展示了核心原理。

想了解真正的 SecretFlow 实现？点击下方按钮在 Google Colab 中查看完整代码：

<div style="text-align: center; margin: 30px 0;">
  <a href="https://colab.research.google.com/drive/18VPyyAQOlCIQkgvESY97wOYM23oPwLi6?usp=sharing" target="_blank" style="display: inline-block;">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" style="box-shadow: 0 4px 12px rgba(0,0,0,0.15); border-radius: 4px;"/>
  </a>
</div>

::: warning 生产环境差异
**简化版 vs 真正的 SecretFlow：**

| 特性 | 简化版（上方演示） | SecretFlow PSI |
|------|------------------|----------------|
| 加密算法 | SHA-256 哈希 | ECDH 椭圆曲线 + OT |
| 安全性 | 演示级 | 密码学级（生产可用） |
| 防暴力破解 | ❌ | ✅ (需 10²² 年) |
| 多方计算 | ❌ 单机模拟 | ✅ 真正的多方 |
| 适用场景 | 技术演示、教学 | 真实医疗数据、金融数据 |

**结论**：上方演示用于理解原理，真实业务必须使用 SecretFlow！
:::

## 适用场景

### 医疗领域
- **患者ID对齐**：多家医院联合研究，在不泄露各自患者信息的情况下找出共同患者
- **疾病筛查**：多地疾控中心协同排查，保护患者隐私
- **临床试验**：多中心数据协作，符合医疗数据保护法规

### 金融领域
- **黑名单比对**：银行间共享风险名单，不暴露完整客户信息
- **反欺诈**：多机构协同识别欺诈用户
- **风控建模**：多方数据联合建模，提升风控准确率

### 政务领域
- **跨部门数据协同**：在保护隐私的前提下打通数据孤岛
- **人口普查**：多地数据汇总去重
- **精准扶贫**：多部门数据比对，精准识别救助对象

## 技术优势

::: tip 为什么选择隐语 PSI？
1. **开源可信**：代码开源，安全性可审计
2. **性能优越**：支持百万级数据求交
3. **易于集成**：提供 Python SDK，快速接入
4. **生态完善**：蚂蚁集团、字节跳动等在生产环境使用
:::

## 了解更多

- 📖 [隐语官方文档](https://www.secretflow.org.cn)
- 💻 [GitHub 源码](https://github.com/secretflow/secretflow)
- 📚 [PSI 技术论文](https://www.secretflow.org.cn/docs/secretflow/latest/zh-CN/tutorial/psi)

