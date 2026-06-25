PetVitals 项目状态摘要（2026-06-22 · 第三轮 · 网站优化补强）
当前状态
代码位置: D:\projects\petvitals
线上地址: https://getpetvitals.com
技术栈: Next.js 16.2.7 (Turbopack) + TypeScript + Tailwind CSS 4 + shadcn/ui + Prisma
部署: Vercel (henrygxy-2286s-projects)，token 部署方式
Google AdSense: ca-pub-7248211571487483，手动广告单元 slot 1350552751
Google Analytics: G-GDWKQMY31K

本轮审查与改动

文件清单（共 19 个文件）

新增:
  src/app/insurance/page.tsx            # 保险类型对比索引页（四种计划 + 如何选择 + 购买前必问）
修改:
  src/app/page.tsx                      # Footer "Legal"→"Company"，新增 About Us 链接，
                                        # Feeding Calculator 链接 /sign-in→/feeding-calculator，
                                        # 保险区新增 "Compare all plans →" 入口
  src/app/sitemap.ts                    # 新增 /about 和 /insurance 条目
  src/app/contact/page.tsx              # robots index:false→true（改为可索引）
  src/app/toxicity/page.tsx             # Popular Searches 标签指向对应博客文章（不再全部指向同一链接）
  src/app/about/page.tsx                # 加入 JsonLdOrganization 结构化数据
  src/lib/blog.ts                       # BlogPostMeta 接口新增 author?: string
  src/app/blog/[slug]/page.tsx          # 文章 meta 区显示作者署名（User 图标），fallback "PetVitals Editorial Team"
  src/content/blog/*.mdx（11 个文件）    # 每个 frontmatter 新增 author: "PetVitals Editorial Team"

改动详情

1. Footer 修复（page.tsx）
   - 标题 "Legal" → "Company"
   - 新增 <li><a href="/about">About Us</a></li>
   - Feeding Calculator 链接从 /sign-in?redirect=/dashboard 改为 /feeding-calculator（该工具无需登录）
   - 保险 section 上方新增 "Compare all plans →" 链接指向 /insurance

2. Sitemap 补全（sitemap.ts）
   - 新增 /about 条目（priority 0.6, monthly）
   - 新增 /insurance 条目（priority 0.75, monthly）
   - 博客文章 lastModified 已正确使用 post.date（无需修改）

3. /contact 可索引（contact/page.tsx）
   - robots 从 { index: false, follow: true } 改为 { index: true, follow: true }
   - 该页有实质内容（联系方式 + 帮助范围 + 紧急警告），对 EEAT 有益

4. Toxicity Popular Searches 修正（toxicity/page.tsx）
   - grapes → /blog/can-dogs-eat-grapes
   - chocolate → /blog/dog-chocolate-toxicity
   - avocado → /blog/can-dogs-eat-avocado
   - onions → /blog/can-dogs-eat-onions
   - garlic → /blog/can-dogs-eat-onions（同属葱科）
   - lilies → /blog/lily-toxicity-cats
   - xylitol / macadamia nuts / coffee / alcohol → /blog/category/nutrition-and-safety（暂无专属文章）

5. /about 页面结构化数据（about/page.tsx）
   - 加入 <JsonLdOrganization />，复用首页已有的 Organization schema

6. /insurance 索引页（新建 insurance/page.tsx）
   - 四种保险计划对比卡片（Accident-Only / Accident & Illness / Comprehensive / Lifetime）
   - "How to Choose" 选择指南（按年龄/品种/预算推荐）
   - "Before You Buy" 六个关键问题（等待期/既往症/报销比例/年度上限/保费增长/网络限制）
   - 教育免责声明

7. 博客作者署名（blog.ts + [slug]/page.tsx + 11 个 .mdx）
   - BlogPostMeta 新增 author?: string
   - 文章页日期和阅读时间之间显示作者（User 图标）
   - 11 个 MDX frontmatter 全部加上 author: "PetVitals Editorial Team"

构建验证
  npx next build → 40 页面全部生成，TypeScript 0 错误
  Vercel 部署 → 33s 构建完成，getpetvitals.com 已生效

部署命令
  cd D:\projects\petvitals
  npx vercel --token [REDACTED] --prod --yes

已知注意事项（继承自第二轮）
  - Turbopack 会把 <head> 内 <script> 转成 __next_s.push，AdSense 全局脚本已正确放在 <body> 顶部
  - ads.txt 内容正确已部署
  - PowerShell Set-Content 会损坏 UTF-8 特殊字符（如 em-dash），应使用 [System.IO.File]::WriteAllText
  - Vercel CLI 从本机可能 TLS 连接失败，token 方式可绕过
  - /contact 已改为可索引（本轮修改）

尚未处理（低优先级建议）
  - next/image 迁移（性能优化）
  - GA Script 改用 Partytown/worker 策略（@next/third-parties 已安装）
  - 薄博客内容扩展（3 篇 ~1200 字 → 1800+ 字）
  - 501 个毒性条目各自生成独立页面（/toxicity/[item]）
  - Newsletter 邮件订阅
