# SecretFlow MPC 演示
# 安装：!pip install -U secretflow

import secretflow as sf
import numpy as np

# 初始化三方环境
sf.init(['alice', 'bob', 'carol'], address='local', num_cpus=3, log_to_driver=False)
alice, bob, carol = sf.PYU('alice'), sf.PYU('bob'), sf.PYU('carol')

# 创建SPU设备（ABY3协议）
spu = sf.SPU(sf.utils.testing.cluster_def(
    parties=['alice', 'bob', 'carol'],
    runtime_config={'protocol': sf.spu.spu_pb2.ABY3, 'field': sf.spu.spu_pb2.FM64}
))

# 各方私密数据：银行客户信用评分
def gen_data_a(): return np.random.randint(600, 850, 1000)
def gen_data_b(): return np.random.randint(580, 820, 1200)
def gen_data_c(): return np.random.randint(620, 840, 800)

data_a = alice(gen_data_a)().to(spu)
data_b = bob(gen_data_b)().to(spu)
data_c = carol(gen_data_c)().to(spu)

# 安全计算：求加权平均（密文状态）
def secure_avg(a, b, c):
    import jax.numpy as jnp
    total = jnp.sum(a) + jnp.sum(b) + jnp.sum(c)
    count = len(a) + len(b) + len(c)
    return total / count, count

result = spu(secure_avg)(data_a, data_b, data_c)
avg, count = sf.reveal(result)

print(f"参与方: 3家银行")
print(f"总客户数: {int(count)}")
print(f"联合平均信用评分: {float(avg):.2f}")
print(f"隐私保护: 各方原始评分不泄露")

sf.shutdown()

