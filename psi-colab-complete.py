# 步骤1：安装SecretFlow（首次运行需要3-5分钟）
!pip install -q secretflow

# 步骤2：重启运行时（安装后需要）
# 点击 运行时 > 重启运行时，然后从步骤3开始运行

# ============================================
# 步骤3：PSI演示代码
# ============================================

import secretflow as sf
import pandas as pd

# 1. 初始化SecretFlow（单机模拟模式）
sf.init(['alice', 'bob'], address='local')

# 2. 准备测试数据
alice_data = ['user001', 'user002', 'user003', 'user004', 'user005']
bob_data = ['user003', 'user004', 'user006', 'user007', 'user008']

# 3. 保存到临时文件
pd.DataFrame({'id': alice_data}).to_csv('/tmp/alice.csv', index=False)
pd.DataFrame({'id': bob_data}).to_csv('/tmp/bob.csv', index=False)

print("📊 数据准备完成")
print(f"   Alice: {alice_data}")
print(f"   Bob: {bob_data}")

# 4. 执行PSI求交
from secretflow.data.vertical import read_csv
from secretflow.security.compare import SPUComparator

# 创建SPU设备
spu = sf.SPU(sf.utils.testing.cluster_def(['alice', 'bob']))

# 读取数据
vdf = read_csv(
    {sf.PYU('alice'): '/tmp/alice.csv', sf.PYU('bob'): '/tmp/bob.csv'},
    spu=spu
)

# 执行PSI
comparator = SPUComparator(spu)
result = comparator.equal(['id'])

# 5. 查看结果
intersection = pd.read_csv('/tmp/alice.csv')
intersection = intersection[intersection['id'].isin(alice_data) & intersection['id'].isin(bob_data)]

print("\n✅ PSI计算完成！")
print(f"   Alice有 {len(alice_data)} 个用户")
print(f"   Bob有 {len(bob_data)} 个用户")
print(f"   共同用户：{list(intersection['id'])}")
print(f"   (双方的非交集用户保持隐私)")

# 6. 清理
sf.shutdown()

