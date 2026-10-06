import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";
import { compile } from "@mdx-js/mdx";

const root = process.cwd();
const posts = [
  "best-pet-safe-cleaning-products",
  "cat-friendly-cleaning-products",
  "bringing-home-new-puppy-checklist",
];
const assets = new Set();

for (const slug of posts) {
  const raw = await fs.readFile(path.join(root, "src/content/blog", `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  assert.match(data.featuredImage, /^\/images\/editorial\/[a-z-]+\.webp$/);
  assert.ok(data.featuredImageAlt?.length > 20, `${slug}: descriptive thumbnail alt`);
  assert.ok(content.includes(`src="${data.featuredImage}"`), `${slug}: body and thumbnail use the same asset`);
  assert.ok(content.includes(`alt="${data.featuredImageAlt}"`), `${slug}: descriptive body alt`);
  assert.ok(content.indexOf("## Quick Answer") < content.indexOf("<EditorialImage"), `${slug}: answer before photo`);
  await compile(content);

  const file = path.join(root, "public", data.featuredImage.slice(1));
  const meta = await sharp(file).metadata();
  assert.equal(meta.format, "webp");
  assert.equal(meta.width, 1536);
  assert.equal(meta.height, 1024);
  assert.ok((await fs.stat(file)).size < 160 * 1024, `${slug}: optimized image budget`);
  assets.add(data.featuredImage);
}

for (const hub of ["pet-safe-cleaning", "puppy-care"]) {
  const source = await fs.readFile(path.join(root, "src/app", hub, "page.tsx"), "utf8");
  const src = source.match(/src: "(\/images\/editorial\/[^\"]+)"/)?.[1];
  assert.ok(assets.has(src), `${hub}: reuse a validated local asset`);
}

const figure = await fs.readFile(path.join(root, "src/components/blog/editorial-image.tsx"), "utf8");
assert.ok(figure.includes("AI-generated illustration."));
assert.ok(figure.includes('loading="lazy"'));
assert.ok(figure.includes("width={1536}") && figure.includes("height={1024}"));
assert.ok(figure.includes("sizes="));
const components = await fs.readFile(path.join(root, "mdx-components.tsx"), "utf8");
assert.ok(components.includes("    EditorialImage,"));
console.log("Editorial images: 3 optimized assets, 3 articles and 2 hubs passed.");
