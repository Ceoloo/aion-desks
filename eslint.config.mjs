import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** Next.js ESLint flat config (eslint-config-next via FlatCompat). */
const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
