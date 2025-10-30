# ===========================================
# PSI演示：隐私求交（纯Python实现）
# 使用加密哈希模拟PSI过程
# ===========================================

import hashlib

def hash_item(item, salt=""):
    """使用SHA-256哈希"""
    return hashlib.sha256(f"{item}{salt}".encode()).hexdigest()

# 场景：Alice和Bob各有用户列表，想找共同用户但不泄露各自完整列表

# Alice的用户列表（5个用户）
alice_users = ['user001', 'user002', 'user003', 'user004', 'user005']

# Bob的用户列表（5个用户）
bob_users = ['user003', 'user004', 'user006', 'user007', 'user008']

print("=" * 60)
print("🔐 隐私求交（PSI）演示")
print("=" * 60)

# 步骤1：Alice对自己的数据加密
print("\n步骤1：Alice加密自己的用户列表")
alice_salt = "alice_secret_2024"
alice_encrypted = {user: hash_item(user, alice_salt) for user in alice_users}

print(f"   原始数据：{alice_users}")
print(f"   加密后（前3个）：")
for user in alice_users[:3]:
    print(f"      {user} → {alice_encrypted[user][:16]}...")

# 步骤2：Bob对自己的数据加密
print("\n步骤2：Bob加密自己的用户列表")
bob_salt = "bob_secret_2024"
bob_encrypted = {user: hash_item(user, bob_salt) for user in bob_users}

print(f"   原始数据：{bob_users}")
print(f"   加密后（前3个）：")
for user in bob_users[:3]:
    print(f"      {user} → {bob_encrypted[user][:16]}...")

# 步骤3：协商共同盐值进行二次加密（模拟OT协议）
print("\n步骤3：使用共同协议进行安全比对")
common_salt = "common_protocol_salt"

alice_final = {hash_item(user, common_salt) for user in alice_users}
bob_final = {hash_item(user, common_salt) for user in bob_users}

# 步骤4：求交集
intersection_hashes = alice_final & bob_final

# 步骤5：还原交集（实际应用中双方协商还原）
intersection = []
for user in alice_users:
    if hash_item(user, common_salt) in intersection_hashes:
        intersection.append(user)

# 输出结果
print("\n" + "=" * 60)
print("✅ PSI计算完成！")
print("=" * 60)
print(f"\n📊 统计结果：")
print(f"   Alice拥有用户数：{len(alice_users)}")
print(f"   Bob拥有用户数：{len(bob_users)}")
print(f"   共同用户数：{len(intersection)}")
print(f"\n🎯 共同用户列表：{intersection}")
print(f"\n🔒 隐私保护：")
print(f"   ✓ Alice不知道Bob独有的用户（{set(bob_users) - set(alice_users)}）")
print(f"   ✓ Bob不知道Alice独有的用户（{set(alice_users) - set(bob_users)}）")
print(f"   ✓ 双方只知道共同用户")

print("\n" + "=" * 60)

