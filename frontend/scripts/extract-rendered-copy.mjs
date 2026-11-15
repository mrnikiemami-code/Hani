import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const urls = [
  "http://localhost:3000/en",
  "http://localhost:3000/en/tour/tour-grid",
  "http://localhost:3000/en/visa/visa-grid",
  "http://localhost:3000/en/hotel/hotel-grid",
  "http://localhost:3000/en/tour/tour-details",
  "http://localhost:3000/en/settings/experience"
];

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function dump(url) {
  return new Promise((resolve, reject) => {
    execFile(
      edge,
      [
        "--headless=new",
        "--disable-gpu",
        "--virtual-time-budget=8000",
        "--dump-dom",
        url
      ],
      { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
      (error, stdout) => {
        if (error) reject(error);
        else resolve(stdout);
      }
    );
  });
}

function extract(html) {
  const values = new Set();
  for (const match of html.matchAll(/>\s*([^<>{}\n][^<>{}]*?)\s*</g)) {
    const value = normalize(match[1]);
    if (value.length < 3) continue;
    if (!/[A-Za-z]/.test(value)) continue;
    values.add(value);
  }
  for (const match of html.matchAll(/(?:placeholder|title|aria-label)="([^"]+)"/g)) {
    const value = normalize(match[1]);
    if (value.length < 3) continue;
    if (/[A-Za-z]/.test(value)) values.add(value);
  }
  return values;
}

const dictionaryPath = path.join(root, "src", "messages", "template.fa.json");
const fa = JSON.parse(fs.readFileSync(dictionaryPath, "utf8"));
const ar = JSON.parse(fs.readFileSync(path.join(root, "src", "messages", "template.ar.json"), "utf8"));

const known = new Set(Object.keys(fa));
const missing = new Set();
for (const url of urls) {
  console.log(`extract ${url}`);
  const html = await dump(url);
  for (const value of extract(html)) {
    if (!known.has(value)) missing.add(value);
  }
}

const values = [...missing].sort((a, b) => a.localeCompare(b));
console.log(`missing ${values.length}`);

async function translateBatch(batch, target) {
  const text = batch.join("\n<<<HANI>>>\n");
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
    target +
    "&dt=t&q=" +
    encodeURIComponent(text);
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const parts = json[0].map((part) => part[0]).join("").split("<<<HANI>>>");
      if (parts.length !== batch.length) throw new Error("delimiter mismatch");
      return parts.map(normalize);
    } catch (error) {
      await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
    }
  }
  const parts = [];
  for (const item of batch) {
    try {
      const response = await fetch(
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
          target +
          "&dt=t&q=" +
          encodeURIComponent(item)
      );
      const json = await response.json();
      parts.push(normalize(json[0].map((part) => part[0]).join("")));
    } catch {
      parts.push(item);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  return parts;
}

async function translateAll(target, output) {
  for (let index = 0; index < values.length; index += 15) {
    const batch = values.slice(index, index + 15);
    const parts = await translateBatch(batch, target);
    batch.forEach((source, i) => {
      if (parts[i]) output[source] = parts[i];
    });
    console.log(`${target}: ${Math.min(index + 15, values.length)}/${values.length}`);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
}

await translateAll("fa", fa);
await translateAll("ar", ar);

fs.writeFileSync(dictionaryPath, JSON.stringify(fa, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(root, "src", "messages", "template.ar.json"),
  JSON.stringify(ar, null, 2) + "\n",
  "utf8"
);
console.log(`wrote fa=${Object.keys(fa).length} ar=${Object.keys(ar).length}`);
