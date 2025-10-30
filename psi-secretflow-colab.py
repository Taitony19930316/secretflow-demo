# ========================================
# SecretFlow PSI 演示
# 使用生产级隐私计算框架
# ========================================

# 安装SecretFlow（首次运行约需3分钟）
!pip install -U secretflow

# 导入库
import secretflow as sf
import pandas as pd
import os

# 初始化SecretFlow集群
sf.init(['alice', 'bob'], address='local', num_cpus=8, log_to_driver=False)

alice, bob = sf.PYU('alice'), sf.PYU('bob')

print("="*70)
print("🔐 SecretFlow PSI 演示：隐私保护求交集")
print("="*70)

# ==================== 场景说明 ====================
print("\n📋 业务场景：")
print("   医院A有1000名患者的就诊记录")
print("   医院B有1200名患者的体检记录")
print("   目标：找出在两家医院都有记录的患者，用于联合研究")
print("   要求：不能泄露各自医院独有的患者信息")

# ==================== 准备数据 ====================
print("\n📊 准备测试数据...")

# Alice（医院A）的患者列表
alice_patients = [f'P{str(i).zfill(4)}' for i in range(1, 1001)]
# Bob（医院B）的患者列表（有300个重叠）
bob_patients = [f'P{str(i).zfill(4)}' for i in range(701, 1901)]

# 保存为CSV文件
df_alice = pd.DataFrame({'patient_id': alice_patients})
df_bob = pd.DataFrame({'patient_id': bob_patients})

df_alice.to_csv('/tmp/alice_patients.csv', index=False)
df_bob.to_csv('/tmp/bob_patients.csv', index=False)

print(f"   ✓ Alice数据：{len(alice_patients)} 条记录")
print(f"   ✓ Bob数据：{len(bob_patients)} 条记录")

# ==================== 执行PSI ====================
print("\n🔄 执行隐私求交（PSI）...")
print("   使用协议：ECDH-PSI（基于椭圆曲线）")

from secretflow.data.vertical import read_csv as v_read_csv
from secretflow.security.compare import SPUComparator

# 创建SPU设备（安全处理单元）
spu = sf.SPU(sf.utils.testing.cluster_def(['alice', 'bob']))

# 读取双方数据
input_path = {
    alice: '/tmp/alice_patients.csv',
    bob: '/tmp/bob_patients.csv'
}

# 执行PSI
spu_io = sf.security.aggregation.SPUAggregator(spu)
psi_result = spu_io.psi_join_csv(
    input_path,
    output_path='/tmp/psi_result.csv',
    receiver='alice',
    protocol='ECDH_PSI_2PC',
    join_type='inner',
    keys=['patient_id']
)

# 读取结果
result_df = pd.read_csv('/tmp/psi_result.csv')
intersection_count = len(result_df)

print(f"   ✓ PSI计算完成！")

# ==================== 结果展示 ====================
print("\n" + "="*70)
print("✅ 计算结果")
print("="*70)
print(f"   医院A患者数：{len(alice_patients)}")
print(f"   医院B患者数：{len(bob_patients)}")
print(f"   共同患者数：{intersection_count}")
print(f"   重叠率：{intersection_count/min(len(alice_patients), len(bob_patients))*100:.1f}%")

print(f"\n   前10个共同患者ID：")
for i, pid in enumerate(result_df['patient_id'].head(10), 1):
    print(f"      {i}. {pid}")

print(f"\n🔒 隐私保护：")
print(f"   ✓ 医院A不知道B独有的 {len(bob_patients) - intersection_count} 名患者")
print(f"   ✓ 医院B不知道A独有的 {len(alice_patients) - intersection_count} 名患者")
print(f"   ✓ 双方仅获得交集信息，原始数据不出本地")

# 清理
sf.shutdown()

# ==================== SecretFlow 平台优势 ====================
print("\n" + "="*70)
print("🚀 SecretFlow 平台优势")
print("="*70)

print("""
1️⃣ 生产级性能
   • 百万级数据求交仅需秒级
   • 支持分布式计算，可扩展到亿级数据
   • 优化的ECDH/KKRT协议实现，性能领先开源方案

2️⃣ 多协议支持
   • ECDH-PSI：适用于小数据集，安全性高
   • KKRT-PSI：适用于大数据集，速度快
   • 自动选择最优协议

3️⃣ 工业级可靠性
   • 蚂蚁集团生产环境验证
   • 支持金融、医疗、政务等多个行业
   • 完整的容错和异常处理机制

4️⃣ 易于集成
   • Python原生API，学习成本低
   • 与pandas/numpy无缝集成
   • 支持Kubernetes云原生部署

5️⃣ 完整的隐私计算生态
   • PSI（隐私求交）
   • MPC（安全多方计算）
   • FL（联邦学习）
   • TEE（可信执行环境）
   • 一站式隐私计算解决方案
""")

print("="*70)
print("📖 更多信息：https://www.secretflow.org.cn")
print("="*70)

