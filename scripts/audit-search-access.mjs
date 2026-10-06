// Basic HTTP checks, not an IP-verified crawler or firewall audit.
const base = new URL(process.argv[2] || "https://www.getpetvitals.com");
if (!["http:", "https:"].includes(base.protocol)) throw new Error("Use an HTTP or HTTPS base URL");
const canonicalBase = "https://www.getpetvitals.com";
const pages = [
  ["/blog/best-pet-safe-cleaning-products", "How to Choose Pet-Safe Cleaners"],
  ["/blog/cat-friendly-cleaning-products", "Cat-Friendly Cleaning Products"],
  ["/toxicity/wisteria", "Wisteria"],
  ["/toxicity/sago-palm", "Sago Palm"],
  ["/about", "PetVitals"],
  ["/contact", "Contact"],
];
let failures = 0;
function check(ok, label) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failures++;
}
async function get(route) {
  const url = new URL(route, base);
  const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
  check(response.status === 200, `${route}: HTTP ${response.status} -> ${response.url}`);
  return { response, body: await response.text() };
}
for (const [route, answer] of pages) {
  try {
    const { response, body } = await get(route);
    // Check actual server HTML rather than text inside Next's hydration scripts.
    const html = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    check(response.headers.get("content-type")?.includes("text/html"), `${route}: HTML response`);
    check((html.match(/<h1\b/gi) || []).length === 1 && html.includes(answer), `${route}: heading and answer in server HTML`);
    const canonical = html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
    check(canonical === `${canonicalBase}${route}`, `${route}: canonical ${canonical || "missing"}`);
    const restrictions = [response.headers.get("x-robots-tag") || "", ...(html.match(/<meta\b[^>]*name="(?:robots|googlebot|bingbot|oai-searchbot)"[^>]*>/gi) || [])].join(" ");
    check(!/\bnoindex\b|\bnosnippet\b|max-snippet\s*:\s*0\b/i.test(restrictions), `${route}: no detected noindex/nosnippet/zero-snippet restriction`);
    if (route.startsWith("/blog/") || route.startsWith("/toxicity/")) {
      const jsonLd = [...body.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => JSON.parse(match[1]));
      check(jsonLd.some((data) => data.dateModified), `${route}: dated structured data`);
      check(/href="https:\/\/(?:www\.)?(?:aspca\.org|cdc\.gov|petpoisonhelpline\.com)\//.test(html), `${route}: visible primary-source link`);
    }
  } catch (error) {
    check(false, `${route}: ${error.message}`);
  }
}
for (const route of ["/toxicity/category/plants", "/pet-safe-cleaning", "/downloads/pet-safe-cleaning-checklist.pdf", "/downloads/pet-poisoning-emergency-checklist.pdf"]) {
  try {
    const { response, body } = await get(route);
    if (route.endsWith(".pdf")) check(response.headers.get("content-type")?.includes("application/pdf") && body.startsWith("%PDF-"), `${route}: usable PDF response`);
  } catch (error) {
    check(false, `${route}: ${error.message}`);
  }
}
try {
  const { body } = await get("/robots.txt");
  check(/User-Agent:\s*\*/i.test(body), "robots: general crawler rule present");
  check(!/^Disallow:\s*\/\s*$/im.test(body), "robots: no site-wide block in current file");
  for (const route of ["/api/", "/dashboard", "/sign-in", "/sign-up", "/pets/"]) {
    check(body.includes(`Disallow: ${route}`), `robots: private-route exclusion ${route}`);
  }
  check(body.includes(`Sitemap: ${canonicalBase}/sitemap.xml`), "robots: canonical sitemap advertised");
  console.log(body.trim());
  const sitemap = await get("/sitemap.xml");
  for (const [route] of pages) check(sitemap.body.includes(`<loc>${canonicalBase}${route}</loc>`), `sitemap: ${route}`);
} catch (error) {
  check(false, `robots/sitemap: ${error.message}`);
}
console.log("LIMITS: ordinary HTTP requests only. No verified crawler IPs, WAF logs, indexing, AI citations, rankings or actual JavaScript-disabled browser test are established by this audit.");
console.log(`${failures} failed checks`);
process.exitCode = failures ? 1 : 0;
