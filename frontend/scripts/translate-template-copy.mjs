import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const sourceRoots = [
  path.join(root, "src", "views", "home-service-one"),
  path.join(root, "src", "views", "home-two"),
  path.join(root, "src", "views", "home-twelve"),
  path.join(root, "src", "views", "tour", "tour-grid"),
  path.join(root, "src", "views", "visa", "visa-grid"),
  path.join(root, "src", "components", "common-header"),
  path.join(root, "src", "components", "common-footer"),
  path.join(root, "src", "core"),
  path.join(root, "src", "components")
];

const skipExact = new Set([
  "DreamsTour",
  "Hani",
  "USD",
  "ENG",
  "ARA",
  "FRE",
  "YEN",
  "EURO"
]);

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function walk(dir, extension, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, extension, files);
    } else if (entry.name.endsWith(extension)) {
      files.push(full);
    }
  }
  return files;
}

const strings = new Set();
for (const sourceRoot of sourceRoots) {
  if (!fs.existsSync(sourceRoot)) continue;
  for (const file of walk(sourceRoot, ".tsx")) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(/>\s*([^<>{}\n][^<>{}]*?)\s*</g)) {
      const value = normalize(match[1]);
      if (value.length < 3) continue;
      if (!/[A-Za-z]/.test(value)) continue;
      if (skipExact.has(value)) continue;
      strings.add(value);
    }
  }
}

const values = [...strings].sort((a, b) => a.localeCompare(b));
console.log(`extracted ${values.length} unique strings`);

const delimiter = "\n<<<HANI>>>\n";

async function translateBatch(batch, target) {
  const text = batch.join(delimiter);
  const url =
    "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
    target +
    "&dt=t&q=" +
    encodeURIComponent(text);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`status ${response.status}`);
      }
      const json = await response.json();
      const translated = json[0].map((part) => part[0]).join("");
      const parts = translated.split("<<<HANI>>>");
      if (parts.length !== batch.length) {
        throw new Error(`expected ${batch.length} parts, got ${parts.length}`);
      }
      return parts.map((part) => normalize(part));
    } catch (error) {
      console.warn(`retry ${target} batch (${attempt + 1}): ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, 1200 * (attempt + 1)));
    }
  }

  // Fallback: translate each item separately when the batch delimiter is not preserved.
  const fallback = [];
  for (const item of batch) {
    try {
      const url =
        "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=" +
        target +
        "&dt=t&q=" +
        encodeURIComponent(item);
      const response = await fetch(url);
      const json = await response.json();
      fallback.push(normalize(json[0].map((part) => part[0]).join("")));
    } catch {
      fallback.push(null);
    }
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
  return fallback;
}

async function translateAll(target) {
  const output = {};
  const batchSize = 20;
  for (let index = 0; index < values.length; index += batchSize) {
    const batch = values.slice(index, index + batchSize);
    const translated = await translateBatch(batch, target);
    batch.forEach((source, i) => {
      if (translated[i]) output[source] = translated[i];
    });
    console.log(`${target}: ${Math.min(index + batchSize, values.length)}/${values.length}`);
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return output;
}

const messagesDir = path.join(root, "src", "messages");
fs.mkdirSync(messagesDir, { recursive: true });

const fa = await translateAll("fa");
fs.writeFileSync(
  path.join(messagesDir, "template.fa.json"),
  JSON.stringify(fa, null, 2) + "\n",
  "utf8"
);

const ar = await translateAll("ar");
fs.writeFileSync(
  path.join(messagesDir, "template.ar.json"),
  JSON.stringify(ar, null, 2) + "\n",
  "utf8"
);

console.log(`wrote fa=${Object.keys(fa).length} ar=${Object.keys(ar).length}`);
