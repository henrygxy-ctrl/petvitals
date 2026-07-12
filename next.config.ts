import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-frontmatter", ["yaml"]]],
    rehypePlugins: [
      ["rehype-slug", {}],
      ["rehype-autolink-headings", { behavior: "wrap" }],
    ],
  },
});

const nextConfig: NextConfig = {
  experimental: {
    cpus: 2,
    nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'getpetvitals.com' },
      { protocol: 'https' as const, hostname: 'www.getpetvitals.com' },
      { protocol: 'https' as const, hostname: 'petvitals.vercel.app' },
    ],
  },
  output: "standalone",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  outputFileTracingIncludes: {
    "/api/auth": ["./node_modules/next-auth/**/*", "./node_modules/@auth/**/*"],
  },
};

export default withMDX(nextConfig);
