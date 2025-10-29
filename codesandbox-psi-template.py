#!/usr/bin/env python3
"""
隐语PSI (Private Set Intersection) 隐私求交演示
用于CodeSandbox在线演示

功能：演示两家医院的ID对齐过程，数据在加密状态下进行交集计算
"""

import secretflow as sf
from secretflow.data import FedNdarray, PartitionWay
import numpy as np

# 初始化隐语环境（在CodeSandbox中可能需要调整配置）
# 注意：这需要多节点部署，CodeSandbox中可以做模拟演示
try:
    # 创建模拟的数据
    # 医院A的患者ID
    hospital_a_ids = [1001, 1002, 1003, 1005, 1008]
    
    # 医院B的患者ID  
    hospital_b_ids = [1002, 1003, 1004, 1007, 1008, 1009]
    
    print("=" * 50)
    print("隐语PSI隐私求交演示")
    print("=" * 50)
    print(f"\n医院A患者ID: {hospital_a_ids}")
    print(f"医院B患者ID: {hospital_b_ids}")
    
    # 计算交集（明文演示，实际PSI会在加密状态下进行）
    intersection = list(set(hospital_a_ids) & set(hospital_b_ids))
    
    print(f"\n✅ 隐私求交结果: {intersection}")
    print(f"   共同患者数量: {len(intersection)}")
    
    print("\n📝 说明：")
    print("  - 在真实的PSI计算中，双方的原始数据不会明文传输")
    print("  - 使用OT（Oblivious Transfer）协议确保隐私")
    print("  - 只有交集结果会被双方知晓，其他数据保持加密状态")
    
    # 实际PSI代码示例（需要多节点环境）
    print("\n" + "=" * 50)
    print("完整PSI代码示例（需要配置隐语环境）：")
    print("=" * 50)
    print("""
# 初始化隐语环境
import secretflow as sf
sf.init(['alice', 'bob'], address='local')

# 创建数据
alice_data = [1001, 1002, 1003, 1005, 1008]
bob_data = [1002, 1003, 1004, 1007, 1008, 1009]

# 执行PSI
from secretflow.preprocessing.psi import psi

result = psi({'alice': alice_data, 'bob': bob_data})
# result: [1002, 1003, 1008]
    """)
    
except ImportError as e:
    print("⚠️  隐语SecretFlow未安装")
    print("   在CodeSandbox中安装依赖：")
    print("   pip install secretflow")
    print("\n   或者使用简化版本（仅演示逻辑）：")
    
    # 简化版本演示
    hospital_a_ids = [1001, 1002, 1003, 1005, 1008]
    hospital_b_ids = [1002, 1003, 1004, 1007, 1008, 1009]
    
    print(f"\n医院A患者ID: {hospital_a_ids}")
    print(f"医院B患者ID: {hospital_b_ids}")
    
    intersection = list(set(hospital_a_ids) & set(hospital_b_ids))
    print(f"\n✅ 隐私求交结果: {intersection}")
    print(f"   共同患者数量: {len(intersection)}")

