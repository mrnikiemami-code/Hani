import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const srcRoot = join(process.cwd(), "src");
const violations = [];

const allowedPrimeReactCalendar = new Set([
  "components/common-date-picker/appDatePicker.tsx"
]);
const allowedCalendarPackagePrefixes = [
  "components/hani/date/",
  "lib/hani/calendar/"
];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
      continue;
    }

    if (!/\.(ts|tsx)$/.test(entry)) {
      continue;
    }

    check(path);
  }
}

function check(path) {
  const rel = relative(srcRoot, path).split(sep).join("/");
  const text = readFileSync(path, "utf8");

  if (text.includes("toLocaleDateString(")) {
    violations.push(`${rel}: raw toLocaleDateString is not allowed`);
  }

  if (
    text.includes("new Intl.DateTimeFormat") &&
    rel !== "lib/hani/calendar/format.ts"
  ) {
    violations.push(`${rel}: use formatIsoDate/formatIsoInstant`);
  }

  if (
    /from\s+["']primereact\/calendar["']/.test(text) &&
    !allowedPrimeReactCalendar.has(rel)
  ) {
    violations.push(`${rel}: direct PrimeReact Calendar import is not allowed`);
  }

  if (
    /from\s+["']react-multi-date-picker["']/.test(text) &&
    !allowedCalendarPackagePrefixes.some((prefix) => rel.startsWith(prefix))
  ) {
    violations.push(`${rel}: calendar package import must stay in the date adapter`);
  }

  if (
    /from\s+["']react-date-object\//.test(text) &&
    !allowedCalendarPackagePrefixes.some((prefix) => rel.startsWith(prefix))
  ) {
    violations.push(`${rel}: calendar plugin import must stay in the date adapter`);
  }
}

walk(srcRoot);

if (violations.length > 0) {
  console.error("Date architecture violations:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Date architecture guard passed.");
