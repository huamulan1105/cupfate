import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the CUPFATE experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>纸杯命运 · CUPFATE<\/title>/i);
  assert.match(html, /今日运势/);
  assert.match(html, /心中一问/);
  assert.match(html, /一张牌/);
  assert.match(html, /三张牌/);
  assert.match(html, /塔罗仅供娱乐与自我反思/);
  assert.match(html, /rel="manifest" href="\/manifest\.webmanifest"/);
});

test("keeps the tarot deck, sharing, and offline support self-contained", async () => {
  const [page, manifest, serviceWorker] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
  ]);

  assert.equal((page.match(/\{ number: /g) ?? []).length, 22);
  assert.match(page, /navigator\.share/);
  assert.match(page, /crypto\.getRandomValues/);
  assert.match(page, /does not predict certain outcomes/);
  assert.equal(JSON.parse(manifest).short_name, "CUPFATE");
  assert.match(serviceWorker, /precacheApp/);
  assert.match(serviceWorker, /caches\.match/);
});
