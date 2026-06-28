getpetvitals.com — 项目摘要（2026-06-28 · 已迁移至 D 盘）
-----------------------------------------------------------
项目路径: D:\projects\petvitals
技术栈: Next.js 16.2.7 (Turbopack) + TypeScript + Tailwind 4 + shadcn/ui + Prisma + SQLite + Partytown
域名: https://getpetvitals.com（→ www 308 重定向）
GitHub: git@github.com:henrygxy-ctrl/petvitals.git（SSH），分支 main
部署: Vercel (henrygxy-2286s-projects)，GitHub 关联自动部署
AdSense: ca-pub-7248211571487483 | GA: G-GDWKQMY31K

项目状态
--------
- 496 页 SSG 构建，TypeScript 0 错误
- 博客 25 篇，毒性查询 439 个独立页面
- Affiliate 变现系统就绪（Impact/保险/Amazon/Chewy）
- 全站 SEO（canonical/OG/面包屑/结构化数据）已完成

本轮优化（2026-06-28）
-----------------------
1. 博客分页 — 每页 10 篇 + "Load More" 按钮（已适应搜索/筛选状态）
2. MDX 文章图片 — 改用 next/Image（自动 WebP + responsive，性能优化）
3. FAQ Schema — 保险首页添加 4 条 FAQ 结构化数据
4. 首页 meta description — 加入社交证明文案，提升搜索 CTR
5. CSP 图片域名收紧 — 从 `https://**` 限定为 getpetvitals.com / www. / vercel.app
6. README — 替换为项目专属 README

迁移记录
--------
- 从 C:\Users\alienware\Documents\宠物网站20 → D:\projects\petvitals
- C 盘可清理：删除 C 盘副本可释放数 GB（含 node_modules + .next）
- D 盘需重新安装依赖：cd D:\projects\petvitals && npm install && npx prisma generate && npm run build

待办事项
--------
- 注册 Affiliate 程序链接后填 .env
- AdSense 审核等待中
- 后续可选：博客继续扩篇、社区页建设、GSC sitemap 提交
