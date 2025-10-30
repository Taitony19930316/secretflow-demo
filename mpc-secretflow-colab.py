# ========================================
# SecretFlow MPC 演示
# 使用生产级安全多方计算框架
# ========================================

# 安装SecretFlow（首次运行约需3分钟）
!pip install -U secretflow

# 导入库
import secretflow as sf
import numpy as np

# 初始化SecretFlow集群（3方参与）
sf.init(['alice', 'bob', 'charlie'], address='local', num_cpus=8, log_to_driver=False)

alice, bob, charlie = sf.PYU('alice'), sf.PYU('bob'), sf.PYU('charlie')

print("="*70)
print("🔐 SecretFlow MPC 演示：安全多方计算")
print("="*70)

# ==================== 场景说明 ====================
print("\n📋 业务场景：")
print("   三家银行想计算客户的平均信用评分")
print("   银行A：持有1000名客户数据")
print("   银行B：持有1200名客户数据")
print("   银行C：持有800名客户数据")
print("   目标：计算联合平均分，但各行数据不能互相泄露")

# ==================== 创建SPU设备 ====================
print("\n⚙️  初始化安全处理单元（SPU）...")
print("   协议：ABY3（3方安全计算协议）")

# 配置SPU
spu = sf.SPU(sf.utils.testing.cluster_def(['alice', 'bob', 'charlie']))

# ==================== 准备私密数据 ====================
print("\n📊 准备各方数据...")

# 各银行的私密数据（信用评分）
def create_alice_data():
    return np.random.randint(600, 850, size=1000)  # 1000个评分

def create_bob_data():
    return np.random.randint(580, 820, size=1200)  # 1200个评分

def create_charlie_data():
    return np.random.randint(620, 840, size=800)   # 800个评分

# 在各方PYU上创建数据
alice_scores = alice(create_alice_data)()
bob_scores = bob(create_bob_data)()
charlie_scores = charlie(create_charlie_data)()

print(f"   ✓ 银行A：1000名客户评分（均值保密）")
print(f"   ✓ 银行B：1200名客户评分（均值保密）")
print(f"   ✓ 银行C：800名客户评分（均值保密）")

# ==================== 安全计算 ====================
print("\n🔄 执行安全多方计算（MPC）...")
print("   计算：加权平均信用评分")

# 将数据转移到SPU（秘密分享）
alice_secret = alice_scores.to(spu)
bob_secret = bob_scores.to(spu)
charlie_secret = charlie_scores.to(spu)

print("   ✓ 数据已进行秘密分享（每方数据分散到3个节点）")

# 在SPU中执行安全计算
@sf.device('spu')
def secure_weighted_average(scores_a, scores_b, scores_c):
    """
    安全计算加权平均分
    全程在密文状态下计算，原始数据不泄露
    """
    # 计算各方总分
    sum_a = scores_a.sum()
    sum_b = scores_b.sum()
    sum_c = scores_c.sum()
    
    # 计算各方人数
    count_a = len(scores_a)
    count_b = len(scores_b)
    count_c = len(scores_c)
    
    # 加权平均
    total_sum = sum_a + sum_b + sum_c
    total_count = count_a + count_b + count_c
    avg_score = total_sum / total_count
    
    return avg_score, total_count

# 执行安全计算
result_secret = spu(secure_weighted_average)(alice_secret, bob_secret, charlie_secret)

print("   ✓ 密文计算完成")

# 揭示结果
avg_score, total_count = sf.reveal(result_secret)

print("   ✓ 结果已揭示")

# ==================== 结果展示 ====================
print("\n" + "="*70)
print("✅ 计算结果")
print("="*70)
print(f"   参与计算总人数：{total_count}")
print(f"   联合平均信用评分：{avg_score:.2f}")

print(f"\n🔒 隐私保护：")
print(f"   ✓ 银行A不知道B、C的客户评分分布")
print(f"   ✓ 银行B不知道A、C的客户评分分布")
print(f"   ✓ 银行C不知道A、B的客户评分分布")
print(f"   ✓ 三方仅知道最终的平均分")
print(f"   ✓ 计算全程在密文状态下进行，无明文暴露")

# 清理
sf.shutdown()

# ==================== SecretFlow 平台优势 ====================
print("\n" + "="*70)
print("🚀 SecretFlow MPC 平台优势")
print("="*70)

print("""
1️⃣ 协议丰富
   • ABY3：3方半诚实模型，性能最优
   • SPDZ：支持任意方数，防恶意攻击
   • Cheetah：2方半诚实，混合协议优化
   • 自动选择最优协议组合

2️⃣ 通用计算能力
   • 支持加减乘除等算术运算
   • 支持比较、逻辑运算
   • 支持矩阵运算（用于机器学习）
   • 类NumPy API，零学习成本

3️⃣ 性能强劲
   • 百万次运算秒级完成
   • GPU加速支持
   • 网络通信优化，带宽利用率高
   • 亿级参数模型训练实测验证

4️⃣ 安全性保障
   • 信息论安全（半诚实模型）
   • 可验证计算（恶意模型）
   • 零知识证明集成
   • 通过多项安全审计

5️⃣ 与机器学习深度融合
   • 联邦学习 + MPC混合方案
   • 支持神经网络推理/训练
   • 预置20+隐私保护算法
   • 支持PyTorch/TensorFlow模型

6️⃣ 企业级特性
   • 蚂蚁集团千亿级业务验证
   • 金融风控、联合营销等实际落地
   • 完整的监控、日志、审计能力
   • 7x24技术支持
""")

print("="*70)
print("📖 更多信息：https://www.secretflow.org.cn")
print("💡 GitHub：https://github.com/secretflow/secretflow")
print("="*70)

