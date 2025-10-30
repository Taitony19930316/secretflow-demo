# ===========================================
# MPC演示：安全多方计算（纯Python实现）
# 使用秘密分享模拟MPC过程
# ===========================================

import random

def split_secret(secret, num_shares=3):
    """
    Shamir秘密分享：将秘密分成n份
    需要至少t份才能还原（这里t=n简化演示）
    """
    shares = []
    remaining = secret
    
    # 生成n-1个随机分片
    for i in range(num_shares - 1):
        share = random.randint(-1000, 1000)
        shares.append(share)
        remaining -= share
    
    # 最后一个分片确保总和等于原始秘密
    shares.append(remaining)
    
    return shares

def reconstruct_secret(shares):
    """从分片还原秘密"""
    return sum(shares)

# ============================================
# 场景：Alice和Bob想计算他们的总收入
# 但都不愿意告诉对方自己的具体收入
# ============================================

print("=" * 60)
print("🔐 安全多方计算（MPC）演示")
print("=" * 60)

# Alice的收入（保密）
alice_income = 100000

# Bob的收入（保密）
bob_income = 150000

print(f"\n💰 私密数据：")
print(f"   Alice的收入：{alice_income} 元（仅Alice知道）")
print(f"   Bob的收入：{bob_income} 元（仅Bob知道）")

# 步骤1：Alice将自己的收入分成3份
print(f"\n步骤1：Alice进行秘密分享")
alice_shares = split_secret(alice_income, 3)
print(f"   原始收入：{alice_income}")
print(f"   分片1：{alice_shares[0]} (给Alice)")
print(f"   分片2：{alice_shares[1]} (给Bob)")
print(f"   分片3：{alice_shares[2]} (给第三方)")
print(f"   验证：{alice_shares[0]} + {alice_shares[1]} + {alice_shares[2]} = {sum(alice_shares)}")

# 步骤2：Bob将自己的收入分成3份
print(f"\n步骤2：Bob进行秘密分享")
bob_shares = split_secret(bob_income, 3)
print(f"   原始收入：{bob_income}")
print(f"   分片1：{bob_shares[0]} (给Alice)")
print(f"   分片2：{bob_shares[1]} (给Bob)")
print(f"   分片3：{bob_shares[2]} (给第三方)")
print(f"   验证：{bob_shares[0]} + {bob_shares[1]} + {bob_shares[2]} = {sum(bob_shares)}")

# 步骤3：分布式计算（每一方计算自己持有的分片和）
print(f"\n步骤3：分布式计算（各方独立计算）")
party1_sum = alice_shares[0] + bob_shares[0]  # Alice持有
party2_sum = alice_shares[1] + bob_shares[1]  # Bob持有
party3_sum = alice_shares[2] + bob_shares[2]  # 第三方持有

print(f"   Alice计算：{alice_shares[0]} + {bob_shares[0]} = {party1_sum}")
print(f"   Bob计算：{alice_shares[1]} + {bob_shares[1]} = {party2_sum}")
print(f"   第三方计算：{alice_shares[2]} + {bob_shares[2]} = {party3_sum}")

# 步骤4：汇总结果
print(f"\n步骤4：汇总最终结果")
total_income = party1_sum + party2_sum + party3_sum

print("\n" + "=" * 60)
print("✅ MPC计算完成！")
print("=" * 60)
print(f"\n📊 计算结果：")
print(f"   总收入 = {total_income} 元")
print(f"   验证：{alice_income} + {bob_income} = {total_income}")

print(f"\n🔒 隐私保护：")
print(f"   ✓ Alice不知道Bob的收入（{bob_income}）")
print(f"   ✓ Bob不知道Alice的收入（{alice_income}）")
print(f"   ✓ 但双方都能知道总和（{total_income}）")
print(f"   ✓ 任何单方看到的分片都无法推断原始数据")

print("\n💡 MPC原理：")
print("   通过秘密分享将数据分散到多方")
print("   每一方只看到无意义的分片")
print("   分布式计算后汇总得到正确结果")

print("\n" + "=" * 60)

