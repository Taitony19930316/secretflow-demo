import{_ as n,c as a,a as e,o as l}from"./app-DF4nYWyA.js";const i={};function p(t,s){return l(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="psi-密码学技术详解" tabindex="-1"><a class="header-anchor" href="#psi-密码学技术详解"><span>PSI 密码学技术详解</span></a></h1><h2 id="🎯-真正的-secretflow-psi-用了哪些技术" tabindex="-1"><a class="header-anchor" href="#🎯-真正的-secretflow-psi-用了哪些技术"><span>🎯 真正的 SecretFlow PSI 用了哪些技术？</span></a></h2><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">简化版 PSI：哈希 + 集合求交</span>
<span class="line">    ↓</span>
<span class="line">真正的 PSI：椭圆曲线 + OT 协议 + 加盐随机化</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_1️⃣-椭圆曲线加密-ecc" tabindex="-1"><a class="header-anchor" href="#_1️⃣-椭圆曲线加密-ecc"><span>1️⃣ 椭圆曲线加密（ECC）</span></a></h2><h3 id="什么是椭圆曲线" tabindex="-1"><a class="header-anchor" href="#什么是椭圆曲线"><span>什么是椭圆曲线？</span></a></h3><p><strong>数学定义</strong>：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">y² = x³ + ax + b</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><strong>可视化</strong>（像一个对称的曲线）：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">      y</span>
<span class="line">      ↑</span>
<span class="line">      |     ╱╲</span>
<span class="line">      |    ╱  ╲</span>
<span class="line">  ————|———╱────╲————→ x</span>
<span class="line">      |  ╱      ╲</span>
<span class="line">      | ╱        ╲</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="为什么用椭圆曲线" tabindex="-1"><a class="header-anchor" href="#为什么用椭圆曲线"><span>为什么用椭圆曲线？</span></a></h3><h4 id="传统加密-rsa-vs-椭圆曲线-ecc" tabindex="-1"><a class="header-anchor" href="#传统加密-rsa-vs-椭圆曲线-ecc"><span>传统加密 RSA vs 椭圆曲线 ECC</span></a></h4><table><thead><tr><th>对比</th><th>RSA</th><th>ECC</th></tr></thead><tbody><tr><td><strong>密钥长度</strong></td><td>2048 位</td><td>256 位</td></tr><tr><td><strong>安全强度</strong></td><td>相同</td><td>相同</td></tr><tr><td><strong>计算速度</strong></td><td>慢</td><td>快</td></tr><tr><td><strong>适合移动设备</strong></td><td>❌</td><td>✅</td></tr></tbody></table><p><strong>类比</strong>：</p><ul><li><strong>RSA</strong>：像一把巨大的钥匙（2048位）</li><li><strong>ECC</strong>：像一把小巧的钥匙（256位），但同样安全</li></ul><hr><h3 id="椭圆曲线在-psi-中的应用" tabindex="-1"><a class="header-anchor" href="#椭圆曲线在-psi-中的应用"><span>椭圆曲线在 PSI 中的应用</span></a></h3><h4 id="ecdh-psi-协议-secretflow-使用的" tabindex="-1"><a class="header-anchor" href="#ecdh-psi-协议-secretflow-使用的"><span>ECDH-PSI 协议（SecretFlow 使用的）</span></a></h4><p><strong>核心思想</strong>：利用椭圆曲线的特殊性质</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">数学性质（交换律）：</span>
<span class="line">a × (b × G) = b × (a × G)</span>
<span class="line">    ↓</span>
<span class="line">双方用不同密钥加密，结果相同！</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>具体过程</strong>：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">医院 A 的数据：[1001, 1002, 1003]</span>
<span class="line">医院 B 的数据：[1002, 1004, 1005]</span>
<span class="line"></span>
<span class="line">步骤1：医院 A 生成私钥 a</span>
<span class="line">步骤2：医院 B 生成私钥 b</span>
<span class="line"></span>
<span class="line">步骤3：医院 A 加密自己的数据</span>
<span class="line">    加密(1001) = a × Hash(1001)  → A₁</span>
<span class="line">    加密(1002) = a × Hash(1002)  → A₂</span>
<span class="line">    加密(1003) = a × Hash(1003)  → A₃</span>
<span class="line">    </span>
<span class="line">步骤4：医院 A 发送 [A₁, A₂, A₃] 给医院 B</span>
<span class="line"></span>
<span class="line">步骤5：医院 B 再次加密（用自己的密钥 b）</span>
<span class="line">    b × A₁ = b × (a × Hash(1001))</span>
<span class="line">    b × A₂ = b × (a × Hash(1002))</span>
<span class="line">    b × A₃ = b × (a × Hash(1003))</span>
<span class="line">    </span>
<span class="line">步骤6：医院 B 也加密自己的数据</span>
<span class="line">    加密(1002) = a × Hash(1002)  → B₁</span>
<span class="line">    加密(1004) = a × Hash(1004)  → B₂</span>
<span class="line">    加密(1005) = a × Hash(1005)  → B₃</span>
<span class="line"></span>
<span class="line">步骤7：医院 B 发送给医院 A，A 再加密</span>
<span class="line">    a × B₁ = a × (b × Hash(1002))</span>
<span class="line">    </span>
<span class="line">步骤8：比较双重加密的结果</span>
<span class="line">    a × (b × Hash(1002)) = b × (a × Hash(1002))</span>
<span class="line">    ↑ 医院 B 的      ↑ 医院 A 的</span>
<span class="line">    </span>
<span class="line">    两个结果相同！→ 找到交集：1002</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关键点</strong>：</p><ul><li>✅ 双方都不知道对方的原始数据</li><li>✅ 双方都不知道对方的私钥</li><li>✅ 只有交集的双重加密结果相同</li><li>✅ 无法暴力破解（椭圆曲线离散对数难题）</li></ul><hr><h3 id="为什么无法暴力破解" tabindex="-1"><a class="header-anchor" href="#为什么无法暴力破解"><span>为什么无法暴力破解？</span></a></h3><p><strong>椭圆曲线离散对数问题</strong>：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">已知：G（基点）、a × G（公钥）</span>
<span class="line">求：a（私钥）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>难度</strong>：</p><ul><li>RSA 2048位 ≈ 需要 2¹¹² 次运算</li><li>ECC 256位 ≈ 需要 2¹²⁸ 次运算</li></ul><p><strong>时间估算</strong>：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">假设你有全世界最快的超级计算机：</span>
<span class="line">- 速度：1 Exaflop = 10¹⁸ 次运算/秒</span>
<span class="line">- 破解 ECC-256：需要 10²² 年</span>
<span class="line">- 宇宙年龄：只有 138 亿年（10¹⁰ 年）</span>
<span class="line"></span>
<span class="line">结论：比宇宙寿命还长 1 万亿倍！</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_2️⃣-ot-协议-不经意传输" tabindex="-1"><a class="header-anchor" href="#_2️⃣-ot-协议-不经意传输"><span>2️⃣ OT 协议（不经意传输）</span></a></h2><h3 id="什么是-ot" tabindex="-1"><a class="header-anchor" href="#什么是-ot"><span>什么是 OT？</span></a></h3><p><strong>英文</strong>：Oblivious Transfer<br><strong>核心</strong>：选择性接收信息，发送方不知道你选了什么</p><h3 id="生活类比" tabindex="-1"><a class="header-anchor" href="#生活类比"><span>生活类比</span></a></h3><p><strong>场景</strong>：图书馆借书</p><p><strong>普通方式</strong>（不安全）：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">你：我要借《密码学》</span>
<span class="line">图书管理员：好的（知道你借了什么）</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>OT 方式</strong>（安全）：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">你：我要借 [秘密选择：第3本]</span>
<span class="line">图书管理员：这是所有书的加密版本</span>
<span class="line">你：[只解密第3本]</span>
<span class="line"></span>
<span class="line">结果：</span>
<span class="line">- ✅ 你拿到了《密码学》</span>
<span class="line">- ✅ 图书管理员不知道你借了哪本</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="ot-在-psi-中的应用" tabindex="-1"><a class="header-anchor" href="#ot-在-psi-中的应用"><span>OT 在 PSI 中的应用</span></a></h3><h4 id="_1-out-of-2-ot-最基础的" tabindex="-1"><a class="header-anchor" href="#_1-out-of-2-ot-最基础的"><span>1-out-of-2 OT（最基础的）</span></a></h4><p><strong>场景</strong>：医院 A 想知道患者 1002 是否在医院 B</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">医院 B 有数据：[1002, 1004, 1005]</span>
<span class="line"></span>
<span class="line">医院 A 想查询：1002 在不在？</span>
<span class="line"></span>
<span class="line">传统方式：</span>
<span class="line">医院 A：你有 1002 吗？</span>
<span class="line">医院 B：有</span>
<span class="line">    ↓</span>
<span class="line">问题：医院 B 知道医院 A 在查谁</span>
<span class="line"></span>
<span class="line">OT 方式：</span>
<span class="line">步骤1：医院 B 准备两个消息</span>
<span class="line">    m₀ = &quot;不在&quot;（加密）</span>
<span class="line">    m₁ = &quot;在&quot;（加密）</span>
<span class="line"></span>
<span class="line">步骤2：医院 A 秘密选择（基于 1002 是否在自己数据里）</span>
<span class="line">    选择 b ∈ {0, 1}</span>
<span class="line"></span>
<span class="line">步骤3：医院 A 只能解密一个消息</span>
<span class="line">    如果 1002 在：解密 m₁ → &quot;在&quot;</span>
<span class="line">    如果不在：解密 m₀ → &quot;不在&quot;</span>
<span class="line"></span>
<span class="line">结果：</span>
<span class="line">- ✅ 医院 A 知道了结果</span>
<span class="line">- ✅ 医院 B 不知道医院 A 查了什么</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h4 id="kkrt-psi-secretflow-另一种协议" tabindex="-1"><a class="header-anchor" href="#kkrt-psi-secretflow-另一种协议"><span>KKRT-PSI（SecretFlow 另一种协议）</span></a></h4><p><strong>使用大量 OT 来实现大规模 PSI</strong></p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">医院 A 有 10,000 个患者</span>
<span class="line">医院 B 有 10,000 个患者</span>
<span class="line"></span>
<span class="line">使用 KKRT：</span>
<span class="line">1. 用 OT 扩展技术（减少计算量）</span>
<span class="line">2. 批量处理（并行计算）</span>
<span class="line">3. 只传输最小必要信息</span>
<span class="line"></span>
<span class="line">性能：</span>
<span class="line">- 普通 OT：10,000 × 10,000 = 1亿次 OT</span>
<span class="line">- KKRT：只需要约 10,000 次 OT</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="ot-的数学原理-简化版" tabindex="-1"><a class="header-anchor" href="#ot-的数学原理-简化版"><span>OT 的数学原理（简化版）</span></a></h3><p><strong>基于 RSA 的 OT</strong>：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">发送方有两个消息：m₀ 和 m₁</span>
<span class="line">接收方想要 mᵦ（b 是 0 或 1）</span>
<span class="line"></span>
<span class="line">步骤1：发送方生成 RSA 密钥对</span>
<span class="line">    公钥：(N, e)</span>
<span class="line">    私钥：d</span>
<span class="line"></span>
<span class="line">步骤2：发送方生成两个随机数</span>
<span class="line">    x₀, x₁</span>
<span class="line"></span>
<span class="line">步骤3：接收方选择 b，生成随机数 k</span>
<span class="line">    如果 b=0：v = (x₀ + k^e) mod N</span>
<span class="line">    如果 b=1：v = (x₁ + k^e) mod N</span>
<span class="line">    </span>
<span class="line">步骤4：发送方计算</span>
<span class="line">    k₀ = (v - x₀)^d mod N</span>
<span class="line">    k₁ = (v - x₁)^d mod N</span>
<span class="line">    </span>
<span class="line">    如果接收方选了 b=0：k₀ = k（正确）</span>
<span class="line">    如果接收方选了 b=1：k₁ = k（正确）</span>
<span class="line"></span>
<span class="line">步骤5：发送方加密消息</span>
<span class="line">    发送 m₀ + k₀ 和 m₁ + k₁</span>
<span class="line"></span>
<span class="line">步骤6：接收方只能解密正确的</span>
<span class="line">    如果 b=0：(m₀ + k₀) - k = m₀ ✅</span>
<span class="line">    如果 b=1：(m₁ + k₁) - k = m₁ ✅</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_3️⃣-加盐-salt-和随机化" tabindex="-1"><a class="header-anchor" href="#_3️⃣-加盐-salt-和随机化"><span>3️⃣ 加盐（Salt）和随机化</span></a></h2><h3 id="什么是加盐" tabindex="-1"><a class="header-anchor" href="#什么是加盐"><span>什么是加盐？</span></a></h3><p><strong>简化版（不安全）</strong>：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token builtin">hash</span> <span class="token operator">=</span> SHA256<span class="token punctuation">(</span><span class="token string">&quot;1001&quot;</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 问题：每次结果都一样</span></span>
<span class="line"><span class="token comment"># &quot;1001&quot; 永远是 &quot;8d969eef...&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>加盐版（安全）</strong>：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line">salt <span class="token operator">=</span> random_bytes<span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span>  <span class="token comment"># 随机生成</span></span>
<span class="line"><span class="token builtin">hash</span> <span class="token operator">=</span> SHA256<span class="token punctuation">(</span><span class="token string">&quot;1001&quot;</span> <span class="token operator">+</span> salt<span class="token punctuation">)</span></span>
<span class="line"><span class="token comment"># 每次结果都不同</span></span>
<span class="line"><span class="token comment"># 第1次：&quot;a3f7c2e9...&quot;</span></span>
<span class="line"><span class="token comment"># 第2次：&quot;b9d4e1f6...&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="为什么需要加盐" tabindex="-1"><a class="header-anchor" href="#为什么需要加盐"><span>为什么需要加盐？</span></a></h3><h4 id="防止彩虹表攻击" tabindex="-1"><a class="header-anchor" href="#防止彩虹表攻击"><span>防止彩虹表攻击</span></a></h4><p><strong>彩虹表</strong>：预先计算的哈希表</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">没有加盐的情况：</span>
<span class="line">攻击者预先计算：</span>
<span class="line">1000 → &quot;8a7f3c2e...&quot;</span>
<span class="line">1001 → &quot;8d969eef...&quot;</span>
<span class="line">1002 → &quot;ad57366e...&quot;</span>
<span class="line">...</span>
<span class="line">9999 → &quot;f4e9d7c5...&quot;</span>
<span class="line"></span>
<span class="line">然后直接查表破解 ❌</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>加盐后</strong>：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">每次盐都不同，攻击者无法预先计算</span>
<span class="line">1001 + salt1 → &quot;a3f7c2e9...&quot;</span>
<span class="line">1001 + salt2 → &quot;b9d4e1f6...&quot;</span>
<span class="line"></span>
<span class="line">彩虹表失效 ✅</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="在-psi-中的加盐" tabindex="-1"><a class="header-anchor" href="#在-psi-中的加盐"><span>在 PSI 中的加盐</span></a></h3><p><strong>双重加盐</strong>：</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># SecretFlow PSI 的实际做法</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 步骤1：医院 A 生成随机盐</span></span>
<span class="line">salt_a <span class="token operator">=</span> random_bytes<span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 步骤2：加盐哈希</span></span>
<span class="line">data <span class="token operator">=</span> <span class="token number">1001</span></span>
<span class="line">hashed <span class="token operator">=</span> SHA256<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">+</span> salt_a<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 步骤3：椭圆曲线加密</span></span>
<span class="line">encrypted <span class="token operator">=</span> privatekey_a × Hash_to_Point<span class="token punctuation">(</span>hashed<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 步骤4：医院 B 再加盐再加密</span></span>
<span class="line">salt_b <span class="token operator">=</span> random_bytes<span class="token punctuation">(</span><span class="token number">32</span><span class="token punctuation">)</span></span>
<span class="line">hashed2 <span class="token operator">=</span> SHA256<span class="token punctuation">(</span>encrypted <span class="token operator">+</span> salt_b<span class="token punctuation">)</span></span>
<span class="line">encrypted2 <span class="token operator">=</span> privatekey_b × Hash_to_Point<span class="token punctuation">(</span>hashed2<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多层保护</strong>：</p><ol><li>✅ 盐保护原始数据</li><li>✅ 椭圆曲线加密保护哈希</li><li>✅ 双方都不知道对方的盐和私钥</li></ol><hr><h3 id="随机化-randomization" tabindex="-1"><a class="header-anchor" href="#随机化-randomization"><span>随机化（Randomization）</span></a></h3><p><strong>目的</strong>：隐藏数据集大小和分布</p><div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre><code class="language-python"><span class="line"><span class="token comment"># 真实数据集</span></span>
<span class="line">real_data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1001</span><span class="token punctuation">,</span> <span class="token number">1002</span><span class="token punctuation">,</span> <span class="token number">1003</span><span class="token punctuation">]</span>  <span class="token comment"># 3个</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加虚假数据（padding）</span></span>
<span class="line">noise_data <span class="token operator">=</span> <span class="token punctuation">[</span>random_id<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>random<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">padded_data <span class="token operator">=</span> real_data <span class="token operator">+</span> noise_data</span>
<span class="line"><span class="token comment"># [1001, 1002, 1003, 8374, 2918, 5647, ...]  # 3-13个</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 随机排序</span></span>
<span class="line">shuffled <span class="token operator">=</span> shuffle<span class="token punctuation">(</span>padded_data<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>好处</strong>：</p><ul><li>✅ 攻击者不知道真实数据集有多大</li><li>✅ 无法通过统计分析推断</li></ul><hr><h2 id="🔄-完整的-psi-流程-所有技术结合" tabindex="-1"><a class="header-anchor" href="#🔄-完整的-psi-流程-所有技术结合"><span>🔄 完整的 PSI 流程（所有技术结合）</span></a></h2><h3 id="真正的-secretflow-ecdh-psi" tabindex="-1"><a class="header-anchor" href="#真正的-secretflow-ecdh-psi"><span>真正的 SecretFlow ECDH-PSI</span></a></h3><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">医院 A                                医院 B</span>
<span class="line">  |                                      |</span>
<span class="line">  | 1. 生成私钥 a                        | 1. 生成私钥 b</span>
<span class="line">  |    salt_a                            |    salt_b</span>
<span class="line">  |                                      |</span>
<span class="line">  | 2. 加盐哈希                          | 2. 加盐哈希</span>
<span class="line">  |    h_a = SHA256(data + salt_a)      |    h_b = SHA256(data + salt_b)</span>
<span class="line">  |                                      |</span>
<span class="line">  | 3. 椭圆曲线加密                      | 3. 椭圆曲线加密</span>
<span class="line">  |    E_a = a × Hash_to_Point(h_a)     |    E_b = b × Hash_to_Point(h_b)</span>
<span class="line">  |                                      |</span>
<span class="line">  | 4. 添加随机噪声                      | 4. 添加随机噪声</span>
<span class="line">  |    E_a&#39; = E_a + random_points       |    E_b&#39; = E_b + random_points</span>
<span class="line">  |                                      |</span>
<span class="line">  | 5. 发送 E_a&#39; ──────────────────────→ |</span>
<span class="line">  |                                      | 6. 用 b 再加密</span>
<span class="line">  |                                      |    E_ab = b × E_a&#39;</span>
<span class="line">  | ←────────────────────── 发送 E_ab   |</span>
<span class="line">  |                                      |</span>
<span class="line">  | 7. 发送 E_b&#39; ───────────────────────→|</span>
<span class="line">  |                                      | 8. 用 a 再加密  </span>
<span class="line">  | 9. 用 a 再加密                       |    E_ba = a × E_b&#39;</span>
<span class="line">  |    E_ab = a × E_b&#39;                   |</span>
<span class="line">  |                                      |</span>
<span class="line">  | 10. 比较 E_ab 和 E_ba               | 10. 比较 E_ab 和 E_ba</span>
<span class="line">  |     相同 → 交集                      |     相同 → 交集</span>
<span class="line">  |                                      |</span>
<span class="line">  | 11. 使用 OT 协议确认                 | 11. OT 验证</span>
<span class="line">  |     （双方不知道对方查了什么）       |</span>
<span class="line">  |                                      |</span>
<span class="line">  | 12. 输出交集                         | 12. 输出交集</span>
<span class="line">  |     [1002, 1003]                     |     [1002, 1003]</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="📊-安全性对比" tabindex="-1"><a class="header-anchor" href="#📊-安全性对比"><span>📊 安全性对比</span></a></h2><h3 id="简化版-vs-真正的-secretflow" tabindex="-1"><a class="header-anchor" href="#简化版-vs-真正的-secretflow"><span>简化版 vs 真正的 SecretFlow</span></a></h3><table><thead><tr><th>攻击方式</th><th>简化版</th><th>SecretFlow PSI</th></tr></thead><tbody><tr><td><strong>暴力破解</strong></td><td>❌ 可以</td><td>✅ 不可以（椭圆曲线）</td></tr><tr><td><strong>彩虹表</strong></td><td>❌ 可以</td><td>✅ 不可以（加盐）</td></tr><tr><td><strong>推断数据量</strong></td><td>❌ 可以</td><td>✅ 不可以（随机化）</td></tr><tr><td><strong>监听网络</strong></td><td>❌ 可以推断</td><td>✅ 只看到加密数据</td></tr><tr><td><strong>推断查询内容</strong></td><td>❌ 可以</td><td>✅ 不可以（OT）</td></tr></tbody></table><hr><h2 id="💡-技术组合的威力" tabindex="-1"><a class="header-anchor" href="#💡-技术组合的威力"><span>💡 技术组合的威力</span></a></h2><h3 id="为什么需要这么多技术" tabindex="-1"><a class="header-anchor" href="#为什么需要这么多技术"><span>为什么需要这么多技术？</span></a></h3><p><strong>每个技术防御一类攻击</strong>：</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">椭圆曲线加密</span>
<span class="line">    ↓ 防止：暴力破解原始数据</span>
<span class="line">    </span>
<span class="line">加盐</span>
<span class="line">    ↓ 防止：彩虹表攻击</span>
<span class="line">    </span>
<span class="line">随机化</span>
<span class="line">    ↓ 防止：统计分析攻击</span>
<span class="line">    </span>
<span class="line">OT 协议</span>
<span class="line">    ↓ 防止：推断查询内容</span>
<span class="line">    </span>
<span class="line">多层组合</span>
<span class="line">    ↓ 结果：无法攻破 ✅</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="🎓-性能对比" tabindex="-1"><a class="header-anchor" href="#🎓-性能对比"><span>🎓 性能对比</span></a></h2><h3 id="计算复杂度" tabindex="-1"><a class="header-anchor" href="#计算复杂度"><span>计算复杂度</span></a></h3><table><thead><tr><th>操作</th><th>简化版</th><th>SecretFlow PSI</th></tr></thead><tbody><tr><td><strong>加密</strong></td><td>O(n)</td><td>O(n log n)</td></tr><tr><td><strong>通信</strong></td><td>O(n)</td><td>O(n)</td></tr><tr><td><strong>内存</strong></td><td>O(n)</td><td>O(n)</td></tr></tbody></table><p><strong>示例</strong>（10,000 条数据）：</p><ul><li>简化版：0.1 秒</li><li>SecretFlow：5-10 秒</li></ul><p><strong>但 SecretFlow 换来了</strong>：</p><ul><li>✅ 密码学级别的安全保证</li><li>✅ 可以用于真实生产环境</li></ul><hr><h2 id="🔬-深入学习资源" tabindex="-1"><a class="header-anchor" href="#🔬-深入学习资源"><span>🔬 深入学习资源</span></a></h2><h3 id="想了解更多" tabindex="-1"><a class="header-anchor" href="#想了解更多"><span>想了解更多？</span></a></h3><p><strong>椭圆曲线密码学</strong>：</p><ul><li>📖 书籍：《深入浅出密码学》</li><li>🎓 课程：Coursera - Cryptography I</li></ul><p><strong>OT 协议</strong>：</p><ul><li>📄 论文：Ishai et al. &quot;Extending Oblivious Transfers Efficiently&quot;</li><li>🔗 博客：https://bristolcrypto.blogspot.com/2016/10/what-is-oblivious-transfer.html</li></ul><p><strong>SecretFlow 实现</strong>：</p><ul><li>📚 官方文档：https://www.secretflow.org.cn</li><li>💻 源代码：https://github.com/secretflow/secretflow</li></ul><hr><h2 id="✨-总结" tabindex="-1"><a class="header-anchor" href="#✨-总结"><span>✨ 总结</span></a></h2><h3 id="三大技术的作用" tabindex="-1"><a class="header-anchor" href="#三大技术的作用"><span>三大技术的作用</span></a></h3><table><thead><tr><th>技术</th><th>作用</th><th>类比</th></tr></thead><tbody><tr><td><strong>椭圆曲线</strong></td><td>无法破解的加密</td><td>保险箱</td></tr><tr><td><strong>OT 协议</strong></td><td>隐藏查询意图</td><td>匿名信箱</td></tr><tr><td><strong>加盐随机化</strong></td><td>防止统计分析</td><td>烟雾弹</td></tr></tbody></table><h3 id="为什么-day1-4-不用这些" tabindex="-1"><a class="header-anchor" href="#为什么-day1-4-不用这些"><span>为什么 Day1-4 不用这些？</span></a></h3><ol><li>✅ <strong>目标不同</strong>：演示原理 vs 生产部署</li><li>✅ <strong>复杂度</strong>：50行 vs 500+行</li><li>✅ <strong>时间成本</strong>：5分钟 vs 2小时</li><li>✅ <strong>理解难度</strong>：简单 vs 需要密码学基础</li></ol><p><strong>Day5-7 战略文档中可以提到</strong>：</p><blockquote><p>&quot;演示版展示核心概念，生产环境将使用 SecretFlow 的 ECDH-PSI 协议，包含椭圆曲线加密、OT 协议和加盐随机化，确保密码学级别的安全性&quot;</p></blockquote><p>这样既完成任务，又展示了技术深度！🎯</p><hr><p><strong>你对密码学的好奇心非常棒！这些技术虽然复杂，但理解它们能让你在面试和工作中脱颖而出！</strong> 💪</p>`,122)])])}const c=n(i,[["render",p]]),r=JSON.parse('{"path":"/devlog/tech-principles/PSI%E5%AF%86%E7%A0%81%E5%AD%A6%E6%8A%80%E6%9C%AF%E8%AF%A6%E8%A7%A3.html","title":"PSI 密码学技术详解","lang":"zh-CN","frontmatter":{},"git":{"updatedTime":1761803161000,"contributors":[{"name":"tailunyu","username":"tailunyu","email":"tailunyu@example.com","commits":1,"url":"https://github.com/tailunyu"}],"changelog":[{"hash":"6ef86c47225087bdb49e72347ae00f4edeae475d","time":1761803161000,"email":"tailunyu@example.com","author":"tailunyu","message":"扩展开发手记：添加技术原理、部署指南、问题解决、开发总结四大分类（移除敏感信息）"}]},"filePathRelative":"devlog/tech-principles/PSI密码学技术详解.md"}');export{c as comp,r as data};
