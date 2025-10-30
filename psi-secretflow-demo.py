# SecretFlow PSI 演示：隐私求交
# 场景：Alice和Bob各有用户列表，想找出共同用户但不泄露各自完整列表

import secretflow as sf

# 1. 初始化SecretFlow环境
sf.init(['alice', 'bob'], address='local')

# 2. 创建参与方
alice = sf.PYU('alice')
bob = sf.PYU('bob')

# 3. 准备数据
# Alice的用户列表
alice_data = ['user001', 'user002', 'user003', 'user004', 'user005']

# Bob的用户列表  
bob_data = ['user003', 'user004', 'user006', 'user007', 'user008']

# 4. 保存到临时文件
import pandas as pd
pd.DataFrame({'id': alice_data}).to_csv('/tmp/alice.csv', index=False)
pd.DataFrame({'id': bob_data}).to_csv('/tmp/bob.csv', index=False)

# 5. 执行PSI求交
from secretflow.data import FedNdarray
from secretflow.preprocessing import PSI

psi = PSI(protocol='KKRT')
result = psi.psi(
    keys=['id'],
    inputs=['/tmp/alice.csv', '/tmp/bob.csv'],
    outputs=['/tmp/alice_output.csv', '/tmp/bob_output.csv'],
    receiver='alice',
    broadcast_result=True
)

# 6. 查看结果
intersection = pd.read_csv('/tmp/alice_output.csv')

print(f"✅ PSI计算完成！")
print(f"   Alice有 {len(alice_data)} 个用户")
print(f"   Bob有 {len(bob_data)} 个用户")
print(f"   共同用户：{list(intersection['id'])}")
print(f"   (双方的非交集用户保持隐私)")

# 清理
sf.shutdown()

