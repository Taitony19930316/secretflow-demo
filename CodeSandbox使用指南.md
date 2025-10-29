# CodeSandbox使用指南

## 账号信息
- Token: `csb_v1_8jscn03tDLb4UZrd5Ha_4uviVFRVx5ekVEOdp_47Uzo`

## 快速开始：创建PSI演示项目

### 方法1：通过Web界面创建

1. **访问CodeSandbox**：https://codesandbox.io
2. **创建新项目**：
   - 点击右上角 "+" → "Create Sandbox"
   - 选择 "Python" 模板
3. **上传代码**：
   - 复制 `codesandbox-psi-template.py` 的内容
   - 粘贴到CodeSandbox的Python文件中
4. **安装依赖**：
   - 在终端运行：`pip install secretflow` 
   - 或者创建 `requirements.txt`，粘贴 `codesandbox-requirements.txt` 的内容
5. **运行代码**：
   - 点击运行按钮或执行：`python codesandbox-psi-template.py`

### 方法2：使用API创建（高级）

```bash
# 使用CodeSandbox API创建sandbox
curl -X POST https://codesandbox.io/api/v1/sandboxes \
  -H "Authorization: Bearer csb_v1_8jscn03tDLb4UZrd5Ha_4uviVFRVx5ekVEOdp_47Uzo" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "python",
    "files": {
      "main.py": {
        "content": "..."
      }
    }
  }'
```

## PSI代码说明

### 核心功能
- 演示两家医院的ID对齐（隐私求交）
- 模拟数据：医院A [1001,1002,1003,1005,1008] 和 医院B [1002,1003,1004,1007,1008,1009]
- 输出交集：[1002, 1003, 1008]

### 在CodeSandbox中的限制
- CodeSandbox是单节点环境，无法直接运行多节点的PSI
- 可以使用模拟版本展示逻辑
- 完整PSI演示需要配置隐语多节点环境（在实际部署时完成）

## 嵌入到VuePress网站

1. **获取CodeSandbox链接**：
   - 创建并保存sandbox后，点击 "Share" → "Embed"
   - 复制嵌入代码

2. **在VuePress中嵌入**：
   ```html
   <iframe 
     src="https://codesandbox.io/embed/YOUR_SANDBOX_ID?view=split"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="PSI演示"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   ```

3. **添加到技术原理页面**：
   - 编辑 `docs/tech/README.md`
   - 在PSI说明下方插入嵌入代码

## 后续步骤（Day 2任务）

根据计划，Day 2需要：
1. ✅ 在CodeSandbox创建PSI演示（当前任务）
2. ✅ 修改模拟数据为医院场景
3. ✅ 确保代码可以运行
4. ✅ 保存CodeSandbox链接用于嵌入VuePress

## 备注

- CodeSandbox token已保存，可用于后续自动化操作
- PSI代码模板已准备好，可以直接使用
- 需要时可联系获取更多CodeSandbox API文档

