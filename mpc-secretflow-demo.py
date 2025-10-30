# SecretFlow MPC 演示：双方联合求和
# 场景：Alice和Bob各有一个数字，想计算总和但不互相透露

import secretflow as sf

# 1. 初始化SecretFlow环境（模拟2方）
sf.init(['alice', 'bob'], address='local')

# 2. 创建参与方
alice = sf.PYU('alice')
bob = sf.PYU('bob')

# 3. 创建SPU设备（安全计算单元）
spu = sf.SPU(sf.utils.testing.cluster_def(['alice', 'bob']))

# 4. Alice和Bob的私密数据
alice_data = alice(lambda: 100)()  # Alice有100
bob_data = bob(lambda: 200)()      # Bob有200

# 5. 转移到SPU进行安全计算
alice_secret = alice_data.to(spu)
bob_secret = bob_data.to(spu)

# 6. 在SPU中安全计算（加法）
def secure_sum(x, y):
    return x + y

result_secret = spu(secure_sum)(alice_secret, bob_secret)

# 7. 揭示结果（双方都能看到）
result = sf.reveal(result_secret)

print(f"✅ 安全计算完成！")
print(f"   总和 = {result}")
print(f"   (但Alice和Bob互不知道对方的原始数据)")

# 清理
sf.shutdown()

