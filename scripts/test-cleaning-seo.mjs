import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import rehypeSlug from "rehype-slug";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");

function loadComponent(file, states = [], context = {}) {
  let hook = 0;
  const effects = [];
  const events = [];
  const react = {
    ...React,
    useState(initial) {
      const index = hook++;
      if (!(index in states)) states[index] = initial;
      return [states[index], (value) => { states[index] = value; }];
    },
    useMemo: (fn) => fn(),
    useEffect: (fn) => effects.push(fn),
    useId: () => "test-contents",
  };
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, file), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    exports,
    require: (name) => name === "react" ? react : name === "@/lib/analytics"
      ? { trackAnalyticsEvent: (...args) => events.push(args) } : require(name),
    URL,
    ...context,
  });
  return { exports, effects, events, render(name) {
    hook = 0;
    return renderToStaticMarkup(exports[name]());
  } };
}

const checkerFile = "src/components/tools/cleaning-ingredient-checker.tsx";
const checkerEvidence = loadComponent(checkerFile).render("CleaningIngredientChecker");
assert.match(checkerEvidence, /Evidence and limits/);
assert.match(checkerEvidence, /does not measure concentration/);
assert.match(checkerEvidence, /https:\/\/www.cdc.gov\/healthy-pets\/about\/cleaning-and-disinfecting-pet-supplies.html/);
for (const query of ["peroxide", "3% hydrogen peroxide", "hydrogen peroxide 3%", "HYDROGEN PEROXIDE", "H2O2"]) {
  const html = loadComponent(checkerFile, [query, "phenols", false]).render("CleaningIngredientChecker");
  assert.match(html, /<h3[^>]*>Hydrogen peroxide<\/h3>/);
  assert.match(html, /Use caution/);
  assert.doesNotMatch(html, /Usually safer|<h3[^>]*>3% hydrogen peroxide/);
}
for (const query of ["Lysol", "Pine-Sol", "disinfecting wipe", "unknown cleaner", "benzoyl peroxide"]) {
  const html = loadComponent(checkerFile, [query, "phenols", false]).render("CleaningIngredientChecker");
  assert.match(html, /Ingredient not identified/);
  assert.doesNotMatch(html, /<h3[^>]*>Phenols/);
}
for (const query of ["vinegar", "castile", "enzymatic"]) {
  const html = loadComponent(checkerFile, [query, "phenols", false]).render("CleaningIngredientChecker");
  assert.match(html, /Check the product label/);
  assert.doesNotMatch(html, /<h3[^>]*>Phenols/);
}
for (const query of ["benzalkonium", "benzalkonium chloride", "alkyl dimethyl benzyl ammonium chloride", "didecyl dimethyl ammonium chloride"]) {
  assert.match(loadComponent(checkerFile, [query, "phenols", false]).render("CleaningIngredientChecker"), /Do not use surface wipes on paws/);
}
assert.match(loadComponent(checkerFile, ["2-phenylphenol", "phenols", false]).render("CleaningIngredientChecker"), /<h3[^>]*>Phenols/);
console.log("PASS: ingredient matches, unknown products, concentration and safety cautions");

{
  const observed = [];
  let disconnected = false;
  const headings = [
    { id: "answer", textContent: " Answer ", tagName: "H2" },
    { id: "faq", textContent: "FAQ", tagName: "H3" },
    { id: "", textContent: "Outside heading", tagName: "H2" },
    { id: "blank", textContent: " ", tagName: "H2" },
    { id: "answer", textContent: "Duplicate", tagName: "H2" },
  ];
  const toc = loadComponent("src/components/blog/table-of-contents.tsx", [], {
    document: { querySelectorAll(selector) {
      assert.equal(selector, "article .prose-custom h2[id], article .prose-custom h3[id]");
      return headings;
    } },
    IntersectionObserver: class {
      observe(element) { observed.push(element.id); }
      disconnect() { disconnected = true; }
    },
  });
  assert.equal(toc.render("TableOfContents"), "");
  const cleanup = toc.effects[0]();
  const html = toc.render("TableOfContents");
  assert.match(html, /aria-expanded="false"/);
  assert.match(html, /href="#answer"/);
  assert.match(html, /href="#faq"/);
  assert.doesNotMatch(html, /href="#"|Duplicate|Outside heading|href="#blank"/);
  assert.deepEqual(observed, ["answer", "faq"]);
  cleanup();
  assert.equal(disconnected, true);
}
console.log("PASS: body-only TOC, duplicate/empty anchors, responsive defaults and observer cleanup");

let listener;
let removed = false;
class LinkTarget {
  constructor(href, retention = false) { this.href = href; this.retention = retention; }
  closest(selector) { return selector === ".prose-custom" ? null : this; }
  getAttribute(name) { return name === "href" ? this.href : null; }
  hasAttribute(name) { return name === "data-retention-event" && this.retention; }
}
const tracking = loadComponent("src/components/blog/article-link-tracking.tsx", [], {
  Element: LinkTarget,
  document: { querySelector: () => ({
    contains: () => true,
    addEventListener: (_, fn) => { listener = fn; },
    removeEventListener: (_, fn) => { removed = fn === listener; },
  }) },
  window: { location: new URL("https://www.getpetvitals.com/blog/test") },
});
tracking.render("ArticleLinkTracking");
const cleanupTracking = tracking.effects[0]();
for (const href of ["#faq", "/blog/test#answer", "mailto:someone@example.com", "/downloads/checklist.pdf"]) listener({ target: new LinkTarget(href) });
listener({ target: new LinkTarget("/pet-safe-cleaning", true) });
assert.equal(tracking.events.length, 0);
listener({ target: new LinkTarget("/blog/cat-friendly-cleaning-products?private=value") });
listener({ target: new LinkTarget("https://www.cdc.gov/page?private=value") });
assert.equal(JSON.stringify(tracking.events), JSON.stringify([
  ["article_internal_link_click", { destination_path: "/blog/cat-friendly-cleaning-products", link_context: "article_next_steps" }],
  ["article_source_click", { source_domain: "www.cdc.gov" }],
]));
cleanupTracking();
assert.equal(removed, true);
console.log("PASS: article click tracking excludes same-page anchors, non-web links and query parameters");

const faqs = loadComponent("src/lib/blog-faq.ts").exports.BLOG_FAQS;
for (const [slug, expected] of [
  ["best-pet-safe-cleaning-products", 11],
  ["cat-friendly-cleaning-products", 8],
  ["can-cats-eat-cantaloupe", 9],
  ["can-cats-walk-on-floors-after-mopping", 6],
  ["disinfectants-safe-for-cats", 6],
  ["is-vinegar-floor-cleaner-safe-for-pets", 4],
  ["are-essential-oil-cleaners-safe-for-cats", 4],
]) {
  const { data, content } = matter(fs.readFileSync(path.join(root, "src/content/blog", `${slug}.mdx`), "utf8"));
  const normalized = content.replace(/\r\n/g, "\n");
  const faqBody = normalized.match(/^## [^\n]*FAQ\n([\s\S]*)/m)?.[1].split("\n## ")[0];
  assert.ok(faqBody, `${slug}: visible FAQ section`);
  const visible = [...faqBody.matchAll(/^### (.+)\n\n([\s\S]*?)(?=\n### |$)/gm)]
    .map((match) => ({ question: match[1], answer: match[2].trim() }));
  assert.equal(visible.length, expected);
  assert.equal(JSON.stringify(visible), JSON.stringify(faqs[slug]));
  assert.ok(data.seo.title.length <= 65);
  assert.ok(data.seo.description.length <= 160);
  assert.ok(Date.parse(data.updated) >= Date.parse(data.date));
  for (const next of data.readNext) assert.ok(fs.existsSync(path.join(root, "src/content/blog", `${next}.mdx`)));
  const compiled = String(await compile(content, { rehypePlugins: [rehypeSlug] }));
  if (slug.startsWith("best")) assert.match(compiled, /two-real-product-examples-the-same-brand-does-not-mean-the-same-job/);
  if (slug === "can-cats-eat-cantaloupe") {
    assert.equal(data.seo.title, "Can Cats Eat Cantaloupe? Safe Amounts, Rind & Seeds");
    assert.match(data.seo.description, /rockmelon/);
    assert.match(compiled, /can-cats-eat-rockmelon/);
    assert.ok(data.sources.some((source) => source.url === "https://www.apvma.gov.au/crop-groups/fruiting-vegetables-cucurbits"));
  }
  if (slug === "can-cats-walk-on-floors-after-mopping") {
    assert.equal(data.seo.title, "Can Cats Walk on Floors After Mopping? When to Let Them In");
  }
  if (slug === "disinfectants-safe-for-cats") {
    assert.equal(data.seo.title, "Disinfectants Safe for Cats: Bleach, Wipes & Safe Use");
  }
  assert.doesNotMatch(content, /15\+ seconds|1:1 with water|Allow to sit for 10 minutes|Phenols \(Pine-Sol/);
  console.log(`PASS: ${slug}: MDX compilation, ${expected} exact FAQ matches, metadata and related links`);
}
