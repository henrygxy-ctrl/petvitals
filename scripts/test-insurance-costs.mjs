import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "..");
const pages = {};

for (const [slug, count] of [["pet-insurance-cost", 12], ["dog-insurance-cost", 10], ["cat-insurance-cost", 11]]) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, "src/app/insurance", slug, "page.tsx"), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, {
    exports,
    require(name) {
      if (name === "next/link") return { default: (props) => React.createElement("a", props) };
      if (name === "../_components/commercial-insurance-page") return { CommercialInsurancePage: () => null };
      if (name === "@/components/insurance/insurance-cost-estimator") return { InsuranceCostEstimator: () => React.createElement("div", { "data-estimator": true }) };
      if (name === "@/lib/constants") return { SITE_BASE_URL: "https://www.getpetvitals.com", SITE_NAME: "PetVitals" };
      return require(name);
    },
  });
  const props = exports.default().props;
  pages[slug] = props;
  assert.equal(exports.metadata.alternates.canonical, `https://www.getpetvitals.com/insurance/${slug}`);
  assert.ok(exports.metadata.description.length <= 160);
  assert.match(props.intro, /2025.*2026/);
  assert.equal(props.faq.length, count);
  assert.equal(new Set(props.faq.map((item) => item.question)).size, count);
  assert.ok(props.faq.some((item) => /per year/.test(item.question)));
  assert.ok(props.sources.some((source) => source.href === "https://www.nerdwallet.com/insurance/pet/learn/cost-of-pet-insurance"));
  assert.ok(props.sections.findIndex((section) => /Average|Per Month and Year/.test(section.title)) < props.sections.findIndex((section) => /Calculator/.test(section.title)));
  const html = props.sections.map((section) => renderToStaticMarkup(section.content)).join("");
  if (props.secondaryCtaHref.startsWith("#")) assert.ok(html.includes(`id="${props.secondaryCtaHref.slice(1)}"`));
  for (const guide of props.relatedGuides) assert.ok(fs.existsSync(path.join(root, "src/app", guide.href, "page.tsx")));
  console.log(`PASS: ${slug}: canonical, dated benchmarks, answer-before-calculator, ${count} FAQs and sources`);
}

const budget = pages["pet-insurance-cost"].sections.find((section) => section.content.props.id === "annual-budget");
assert.ok(budget);
const html = renderToStaticMarkup(budget.content);
assert.match(html, /hypothetical plans/);
assert.match(html, /unused annual deductible before reimbursement/);
assert.match(html, /enough payout limit remaining/);
assert.match(html, /no excluded charges or other claims/);
const table = budget.content.props.children[1].props.children;
const rows = table.props.children[2].props.children;
for (const [index, monthly, deductible, reimbursement] of [[0, 30, 1000, 0.7], [1, 50, 250, 0.8]]) {
  const premiums = monthly * 12;
  const treatmentShare = 3000 - (3000 - deductible) * reimbursement;
  const money = (amount) => `$${amount.toLocaleString("en-US")}`;
  const cells = rows[index].props.children.map((cell) => cell.props.children);
  assert.deepEqual(Array.from(cells).slice(1), [money(premiums), money(treatmentShare), money(premiums + treatmentShare)]);
}
for (const slug of ["dog-insurance-cost", "cat-insurance-cost"]) {
  assert.match(pages[slug].sections.map((section) => renderToStaticMarkup(section.content)).join(""), /href="\/insurance\/pet-insurance-cost#annual-budget"/);
}
console.log("PASS: annual comparison math, visible assumptions and species-guide links");
