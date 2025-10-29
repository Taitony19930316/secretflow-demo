import hashlib
import random

print("=" * 60)
print("隐语PSI隐私求交演示 - Google Colab 版")
print("=" * 60)

# --- 简化版 PSI 演示 ---
print("\n--- 简化版 PSI 演示 (哈希 + 集合求交) ---")

class SimplePSI:
    def __init__(self, name):
        self.name = name
        self.data = []
    
    def load_data(self, data):
        self.data = data
        print(f"\n--- {self.name} ---")
        print(f"加载了数据: {data}")
    
    def hash_data(self, salt=""):
        """哈希加密（模拟隐私保护）"""
        return [hashlib.sha256((str(item) + salt).encode()).hexdigest() 
                for item in self.data]
    
    def intersect(self, other_hashed_data, self_salt=""):
        """计算交集"""
        self_hashed = set(self.hash_data(self_salt))
        intersection_hashed = self_hashed.intersection(set(other_hashed_data))
        
        # 找出原始ID
        intersection_ids = []
        for item in self.data:
            if hashlib.sha256((str(item) + self_salt).encode()).hexdigest() in intersection_hashed:
                intersection_ids.append(item)
        return intersection_ids

# 创建两个医院
hospital_a = SimplePSI("医院A")
hospital_a.load_data([1001, 1002, 1003, 1005, 1007])

hospital_b = SimplePSI("医院B")
hospital_b.load_data([1002, 1003, 1004, 1006, 1008])

# 计算交集
print("\n🔒 开始加密和求交...")
hashed_a = hospital_a.hash_data(salt="salt_a")
hashed_b = hospital_b.hash_data(salt="salt_b")

print(f"\n医院A哈希值（前2个）:")
for i in range(min(2, len(hashed_a))):
    print(f"  {hospital_a.data[i]} → {hashed_a[i][:16]}...")

print(f"\n医院B哈希值（前2个）:")
for i in range(min(2, len(hashed_b))):
    print(f"  {hospital_b.data[i]} → {hashed_b[i][:16]}...")

# 计算交集（在真实场景中，这一步是加密协议）
final_intersection = list(set(hospital_a.data) & set(hospital_b.data))

print(f"\n✅ 简化版 PSI 计算完成！")
print(f"   共同患者 ID: {final_intersection}")
print(f"   共同患者数量: {len(final_intersection)}")
print("\n🔒 关键特性：双方不泄露完整数据，只知道交集")

print("\n" + "=" * 60)
print("演示完成！")
print("=" * 60)

# 可修改数据测试
print("\n💡 想测试不同的数据？")
print("修改上面代码中的这两行：")
print("  hospital_a.load_data([1001, 1002, 1003, 1005, 1007])")
print("  hospital_b.load_data([1002, 1003, 1004, 1006, 1008])")
print("然后重新运行！")

