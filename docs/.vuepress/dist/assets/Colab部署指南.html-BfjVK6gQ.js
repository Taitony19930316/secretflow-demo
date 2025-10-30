import{_ as n,c as a,e,o as l}from"./app-CEn4AbFl.js";const i={};function p(c,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="google-colab-部署指南" tabindex="-1"><a class="header-anchor" href="#google-colab-部署指南"><span>Google Colab 部署指南</span></a></h1><h2 id="🎯-目标" tabindex="-1"><a class="header-anchor" href="#🎯-目标"><span>🎯 目标</span></a></h2><p>将 PSI 演示代码部署到 Google Colab，并获取可分享的链接，嵌入到 VuePress 网站。</p><hr><h2 id="📝-步骤1-创建-colab-笔记本" tabindex="-1"><a class="header-anchor" href="#📝-步骤1-创建-colab-笔记本"><span>📝 步骤1：创建 Colab 笔记本</span></a></h2><h3 id="_1-访问-google-colab" tabindex="-1"><a class="header-anchor" href="#_1-访问-google-colab"><span>1. 访问 Google Colab</span></a></h3><p>https://colab.research.google.com</p><h3 id="_2-登录-google-账号" tabindex="-1"><a class="header-anchor" href="#_2-登录-google-账号"><span>2. 登录 Google 账号</span></a></h3><p>使用你的 Google 账号登录</p><h3 id="_3-创建新笔记本" tabindex="-1"><a class="header-anchor" href="#_3-创建新笔记本"><span>3. 创建新笔记本</span></a></h3><p>点击 <code>文件</code> → <code>新建笔记本</code></p><hr><h2 id="📄-步骤2-添加内容" tabindex="-1"><a class="header-anchor" href="#📄-步骤2-添加内容"><span>📄 步骤2：添加内容</span></a></h2><h3 id="_1-添加标题-markdown-单元格" tabindex="-1"><a class="header-anchor" href="#_1-添加标题-markdown-单元格"><span>1. 添加标题（Markdown 单元格）</span></a></h3><p>点击 <code>+ 文本</code> 添加 Markdown 单元格，输入：</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code class="language-markdown"><span class="line"><span class="token title important"><span class="token punctuation">#</span> 隐语 PSI（隐私求交）完整演示</span></span>
<span class="line"></span>
<span class="line">本笔记本演示了隐私求交（Private Set Intersection, PSI）的核心原理和实现。</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">##</span> 什么是 PSI？</span></span>
<span class="line"></span>
<span class="line">PSI 允许多方在不泄露各自数据的情况下，计算出数据集的交集。</span>
<span class="line"></span>
<span class="line"><span class="token bold"><span class="token punctuation">**</span><span class="token content">应用场景</span><span class="token punctuation">**</span></span>：</span>
<span class="line"><span class="token list punctuation">-</span> 🏥 医疗：多家医院找出共同患者</span>
<span class="line"><span class="token list punctuation">-</span> 💰 金融：银行间黑名单比对</span>
<span class="line"><span class="token list punctuation">-</span> 🏛️ 政务：跨部门数据协同</span>
<span class="line"></span>
<span class="line"><span class="token bold"><span class="token punctuation">**</span><span class="token content">运行方式</span><span class="token punctuation">**</span></span>：</span>
<span class="line"><span class="token list punctuation">1.</span> 点击菜单栏 <span class="token code-snippet code keyword">\`代码执行程序\`</span> → <span class="token code-snippet code keyword">\`全部运行\`</span></span>
<span class="line"><span class="token list punctuation">2.</span> 或按 <span class="token code-snippet code keyword">\`Ctrl+F9\`</span>（Mac: <span class="token code-snippet code keyword">\`Cmd+F9\`</span>）</span>
<span class="line"><span class="token list punctuation">3.</span> 等待几秒，查看输出结果</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-添加代码-代码单元格" tabindex="-1"><a class="header-anchor" href="#_2-添加代码-代码单元格"><span>2. 添加代码（代码单元格）</span></a></h3><p>点击 <code>+ 代码</code>，复制粘贴 <code>/Users/tailunyu/Desktop/sf/secretflow-demo/colab-psi-demo.py</code> 的全部内容</p><h3 id="_3-添加说明-markdown-单元格" tabindex="-1"><a class="header-anchor" href="#_3-添加说明-markdown-单元格"><span>3. 添加说明（Markdown 单元格）</span></a></h3><p>在代码下方添加说明：</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code class="language-markdown"><span class="line"><span class="token title important"><span class="token punctuation">##</span> 📊 演示说明</span></span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">###</span> 第一部分：简化版 PSI</span></span>
<span class="line"><span class="token list punctuation">-</span> 使用 SHA-256 哈希模拟加密</span>
<span class="line"><span class="token list punctuation">-</span> 展示 PSI 的核心思想</span>
<span class="line"><span class="token list punctuation">-</span> 适合理解原理</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">###</span> 第二部分：ECDH-PSI 协议</span></span>
<span class="line"><span class="token list punctuation">-</span> 模拟真正的 SecretFlow 流程</span>
<span class="line"><span class="token list punctuation">-</span> 使用椭圆曲线密码学思想</span>
<span class="line"><span class="token list punctuation">-</span> 展示双重加密机制</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">###</span> 第三部分：对比说明</span></span>
<span class="line"><span class="token list punctuation">-</span> 简化版 vs 真正的 SecretFlow</span>
<span class="line"><span class="token list punctuation">-</span> 性能和安全性对比</span>
<span class="line"><span class="token list punctuation">-</span> 生产环境注意事项</span>
<span class="line"></span>
<span class="line"><span class="token title important"><span class="token punctuation">##</span> 🔧 自定义数据</span></span>
<span class="line"></span>
<span class="line">想尝试不同的数据？修改代码中的这两行：</span>
<span class="line"></span>
<span class="line">\`\`\`python</span>
<span class="line">hospital_a.load_data([1001, 1002, 1003, 1005, 1007, 1009, 1010])</span>
<span class="line">hospital_b.load_data([1002, 1003, 1004, 1006, 1008, 1009, 1011])</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>改成你想要的患者 ID，然后重新运行！</p><h2 id="📚-深入学习" tabindex="-1"><a class="header-anchor" href="#📚-深入学习"><span>📚 深入学习</span></a></h2><ul><li>📖 <a href="https://www.secretflow.org.cn" target="_blank" rel="noopener noreferrer">隐语官方文档</a></li><li>💻 <a href="https://github.com/secretflow/secretflow" target="_blank" rel="noopener noreferrer">GitHub 源码</a></li><li>🎓 <a href="https://www.secretflow.org.cn/docs/secretflow/latest/zh-CN/tutorial/psi" target="_blank" rel="noopener noreferrer">PSI 技术论文</a></li></ul><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">## 💾 步骤3：保存笔记本</span>
<span class="line"></span>
<span class="line">### 1. 重命名笔记本</span>
<span class="line">点击左上角的笔记本名称，改为：\`隐语PSI演示\`</span>
<span class="line"></span>
<span class="line">### 2. 保存到 Google Drive</span>
<span class="line">\`文件\` → \`保存\` （会自动保存到你的 Google Drive）</span>
<span class="line"></span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">## 🔗 步骤4：获取分享链接</span>
<span class="line"></span>
<span class="line">### 1. 点击右上角的 \`共享\` 按钮</span>
<span class="line"></span>
<span class="line">### 2. 设置访问权限</span>
<span class="line">- 选择 \`获取链接\`</span>
<span class="line">- 设置为 \`知道此链接的任何人都可以查看\`</span>
<span class="line">- 点击 \`复制链接\`</span>
<span class="line"></span>
<span class="line">### 3. 链接格式</span>
<span class="line">你会得到类似这样的链接：</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>https://colab.research.google.com/drive/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line"></span>
<span class="line">---</span>
<span class="line"></span>
<span class="line">## 📝 步骤5：更新 VuePress 网站</span>
<span class="line"></span>
<span class="line">### 1. 打开 docs/tech/README.md</span>
<span class="line"></span>
<span class="line">### 2. 找到这一行：</span>
<span class="line">\`\`\`markdown</span>
<span class="line">&lt;a href=&quot;https://colab.research.google.com/drive/YOUR_COLAB_LINK&quot; target=&quot;_blank&quot;&gt;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-替换为你的-colab-链接" tabindex="-1"><a class="header-anchor" href="#_3-替换为你的-colab-链接"><span>3. 替换为你的 Colab 链接：</span></a></h3><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code class="language-markdown"><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://colab.research.google.com/drive/1AbCdEfGhIjKlMnOpQrStUvWxYz1234567<span class="token punctuation">&quot;</span></span> <span class="token attr-name">target</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>_blank<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><hr><h2 id="✅-步骤6-测试" tabindex="-1"><a class="header-anchor" href="#✅-步骤6-测试"><span>✅ 步骤6：测试</span></a></h2><h3 id="_1-本地测试" tabindex="-1"><a class="header-anchor" href="#_1-本地测试"><span>1. 本地测试</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">cd</span> /Users/tailunyu/Desktop/sf/secretflow-demo</span>
<span class="line"><span class="token function">npm</span> run docs:dev</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>访问 http://localhost:8080/secretflow-demo/tech/</p><h3 id="_2-测试交互演示" tabindex="-1"><a class="header-anchor" href="#_2-测试交互演示"><span>2. 测试交互演示</span></a></h3><ul><li>修改输入框中的数据</li><li>点击&quot;计算隐私交集&quot;按钮</li><li>查看结果</li></ul><h3 id="_3-测试-colab-链接" tabindex="-1"><a class="header-anchor" href="#_3-测试-colab-链接"><span>3. 测试 Colab 链接</span></a></h3><ul><li>点击 &quot;Open In Colab&quot; 按钮</li><li>确认能打开你的笔记本</li><li>运行代码验证</li></ul><hr><h2 id="🚀-步骤7-部署到线上" tabindex="-1"><a class="header-anchor" href="#🚀-步骤7-部署到线上"><span>🚀 步骤7：部署到线上</span></a></h2><h3 id="_1-构建网站" tabindex="-1"><a class="header-anchor" href="#_1-构建网站"><span>1. 构建网站</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">cd</span> /Users/tailunyu/Desktop/sf/secretflow-demo</span>
<span class="line"><span class="token function">npm</span> run docs:build</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-推送到-github" tabindex="-1"><a class="header-anchor" href="#_2-推送到-github"><span>2. 推送到 GitHub</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token builtin class-name">cd</span> docs/.vuepress/dist</span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;添加交互式PSI演示&quot;</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> https://github.com/Paopaotai/secretflow-demo.git main:gh-pages</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-访问线上网站" tabindex="-1"><a class="header-anchor" href="#_3-访问线上网站"><span>3. 访问线上网站</span></a></h3><p>https://paopaotai.github.io/secretflow-demo/tech/</p><hr><h2 id="🎨-美化建议-可选" tabindex="-1"><a class="header-anchor" href="#🎨-美化建议-可选"><span>🎨 美化建议（可选）</span></a></h2><h3 id="在-colab-中添加图片" tabindex="-1"><a class="header-anchor" href="#在-colab-中添加图片"><span>在 Colab 中添加图片</span></a></h3><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md"><pre><code class="language-markdown"><span class="line"><span class="token title important"><span class="token punctuation">##</span> 流程图</span></span>
<span class="line"></span>
<span class="line"><span class="token url"><span class="token operator">!</span>[<span class="token content">PSI流程</span>](<span class="token url">https://your-image-url.com/psi-flow.png</span>)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加交互式小部件" tabindex="-1"><a class="header-anchor" href="#添加交互式小部件"><span>添加交互式小部件</span></a></h3><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token keyword">from</span> ipywidgets <span class="token keyword">import</span> interact<span class="token punctuation">,</span> IntText</span>
<span class="line"></span>
<span class="line"><span class="token keyword">def</span> <span class="token function">run_psi</span><span class="token punctuation">(</span>patient_a<span class="token operator">=</span><span class="token number">1001</span><span class="token punctuation">,</span> patient_b<span class="token operator">=</span><span class="token number">1002</span><span class="token punctuation">)</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment"># 动态运行 PSI</span></span>
<span class="line">    <span class="token keyword">pass</span></span>
<span class="line"></span>
<span class="line">interact<span class="token punctuation">(</span>run_psi<span class="token punctuation">,</span> patient_a<span class="token operator">=</span>IntText<span class="token punctuation">(</span><span class="token number">1001</span><span class="token punctuation">)</span><span class="token punctuation">,</span> patient_b<span class="token operator">=</span>IntText<span class="token punctuation">(</span><span class="token number">1002</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="⚠️-注意事项" tabindex="-1"><a class="header-anchor" href="#⚠️-注意事项"><span>⚠️ 注意事项</span></a></h2><h3 id="_1-colab-运行时限制" tabindex="-1"><a class="header-anchor" href="#_1-colab-运行时限制"><span>1. Colab 运行时限制</span></a></h3><ul><li>免费版有运行时间限制（12小时）</li><li>闲置90分钟会断开连接</li><li>对于演示代码没有影响（秒级完成）</li></ul><h3 id="_2-数据隐私" tabindex="-1"><a class="header-anchor" href="#_2-数据隐私"><span>2. 数据隐私</span></a></h3><ul><li>Colab 笔记本存储在你的 Google Drive</li><li>设置为&quot;任何人可查看&quot;时，所有人都能看到</li><li>不要在演示代码中包含真实敏感数据</li></ul><h3 id="_3-依赖安装" tabindex="-1"><a class="header-anchor" href="#_3-依赖安装"><span>3. 依赖安装</span></a></h3><ul><li>本演示只使用 Python 标准库</li><li>不需要安装额外依赖</li><li>如果要用真正的 SecretFlow，需要 <code>!pip install secretflow</code></li></ul><hr><h2 id="📊-完成检查清单" tabindex="-1"><a class="header-anchor" href="#📊-完成检查清单"><span>📊 完成检查清单</span></a></h2><ul><li>[ ] Colab 笔记本已创建</li><li>[ ] 代码已粘贴并运行成功</li><li>[ ] 笔记本已保存到 Google Drive</li><li>[ ] 分享链接已获取</li><li>[ ] VuePress 中的链接已更新</li><li>[ ] JavaScript 交互演示工作正常</li><li>[ ] 本地测试通过</li><li>[ ] 已部署到 GitHub Pages</li><li>[ ] 线上网站访问正常</li></ul><hr><h2 id="🎯-预期效果" tabindex="-1"><a class="header-anchor" href="#🎯-预期效果"><span>🎯 预期效果</span></a></h2><h3 id="用户体验流程" tabindex="-1"><a class="header-anchor" href="#用户体验流程"><span>用户体验流程</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">用户访问你的网站</span>
<span class="line">    ↓</span>
<span class="line">看到交互式 PSI 演示（JavaScript 版）</span>
<span class="line">    ↓</span>
<span class="line">可以直接在网页上修改数据、点击按钮</span>
<span class="line">    ↓</span>
<span class="line">立即看到结果（无需跳转）</span>
<span class="line">    ↓</span>
<span class="line">想深入了解？</span>
<span class="line">    ↓</span>
<span class="line">点击 &quot;Open in Colab&quot; 按钮</span>
<span class="line">    ↓</span>
<span class="line">跳转到 Colab 看完整代码</span>
<span class="line">    ↓</span>
<span class="line">可以修改代码并运行</span>
<span class="line">    ↓</span>
<span class="line">完整体验！✅</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="💡-故障排除" tabindex="-1"><a class="header-anchor" href="#💡-故障排除"><span>💡 故障排除</span></a></h2><h3 id="问题1-colab-链接无法访问" tabindex="-1"><a class="header-anchor" href="#问题1-colab-链接无法访问"><span>问题1：Colab 链接无法访问</span></a></h3><p><strong>解决</strong>：检查分享权限，确保设置为&quot;知道链接的任何人&quot;</p><h3 id="问题2-javascript-演示不显示" tabindex="-1"><a class="header-anchor" href="#问题2-javascript-演示不显示"><span>问题2：JavaScript 演示不显示</span></a></h3><p><strong>解决</strong>：</p><ol><li>检查浏览器控制台是否有错误</li><li>确认 VuePress 构建成功</li><li>清除浏览器缓存</li></ol><h3 id="问题3-样式显示异常" tabindex="-1"><a class="header-anchor" href="#问题3-样式显示异常"><span>问题3：样式显示异常</span></a></h3><p><strong>解决</strong>：</p><ol><li>检查 CSS 是否正确嵌入</li><li>使用浏览器开发者工具检查样式</li></ol><hr><h2 id="🎉-完成" tabindex="-1"><a class="header-anchor" href="#🎉-完成"><span>🎉 完成！</span></a></h2><p>现在你有了：</p><ol><li>✅ 交互式网页演示（JavaScript 版）</li><li>✅ Google Colab 完整代码（Python 版）</li><li>✅ 完美的用户体验</li></ol><p>符合 Day2 的所有要求：</p><ul><li>✅ 可在网页运行</li><li>✅ 有操作说明</li><li>✅ 展示 PSI 原理</li><li>✅ 提供深入学习资源</li></ul><p><strong>时间投入</strong>：约 2 小时<br><strong>效果</strong>：⭐⭐⭐⭐⭐</p><hr><p><strong>现在去创建你的 Colab 笔记本吧！</strong> 🚀</p>`,86)])])}const d=n(i,[["render",p]]),r=JSON.parse('{"path":"/devlog/deployment/Colab%E9%83%A8%E7%BD%B2%E6%8C%87%E5%8D%97.html","title":"Google Colab 部署指南","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1761803161000,"contributors":[{"name":"tailunyu","username":"tailunyu","email":"tailunyu@example.com","commits":1,"url":"https://github.com/tailunyu"}],"changelog":[{"hash":"6ef86c47225087bdb49e72347ae00f4edeae475d","time":1761803161000,"email":"tailunyu@example.com","author":"tailunyu","message":"扩展开发手记：添加技术原理、部署指南、问题解决、开发总结四大分类（移除敏感信息）"}]},"filePathRelative":"devlog/deployment/Colab部署指南.md"}');export{d as comp,r as data};
