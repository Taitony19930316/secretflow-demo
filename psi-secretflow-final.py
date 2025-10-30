# SecretFlow PSI 演示
# 第一步：安装 SecretFlow（首次运行需要几分钟）
!pip install -q -U secretflow

import secretflow as sf
import pandas as pd

# 初始化双方环境
sf.init(['alice', 'bob'], address='local', num_cpus=2, log_to_driver=False)
alice, bob = sf.PYU('alice'), sf.PYU('bob')

# 准备数据：两家医院的患者ID
alice_data = pd.DataFrame({'patient_id': [f'P{i:04d}' for i in range(1, 501)]})
bob_data = pd.DataFrame({'patient_id': [f'P{i:04d}' for i in range(351, 951)]})

alice_data.to_csv('/tmp/alice.csv', index=False)
bob_data.to_csv('/tmp/bob.csv', index=False)

# 执行PSI（使用ECDH协议）
from secretflow.security.aggregation import SPUAggregator

spu = sf.SPU(sf.utils.testing.cluster_def(['alice', 'bob']))
spu_agg = SPUAggregator(spu)

result = spu_agg.psi_join_csv(
    input_path={alice: '/tmp/alice.csv', bob: '/tmp/bob.csv'},
    output_path='/tmp/result.csv',
    receiver='alice',
    protocol='ECDH_PSI_2PC',
    keys=['patient_id']
)

# 输出结果
result_df = pd.read_csv('/tmp/result.csv')
print(f"医院A: {len(alice_data)} 名患者")
print(f"医院B: {len(bob_data)} 名患者")
print(f"共同患者: {len(result_df)} 名")
print(f"前5个交集: {list(result_df['patient_id'].head())}")

sf.shutdown()

