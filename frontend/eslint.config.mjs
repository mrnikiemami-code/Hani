import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Global ignores (must be in their own object to apply to every config below)
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/style/icon/fontawesome/js/fontawesome.min.js",
      "src/style/icon/fontawesome/js/v4-shims.min.js",
      "**/*.min.js",
    ],
  },
  // Next.js rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Custom rule overrides
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
];

export default eslintConfig;
