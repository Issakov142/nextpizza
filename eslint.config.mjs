import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // {
  //   rules: {
  //     //should delete rules object in future
  //     "no-warning-comments": "off",
  //     "react-hooks/exhaustive-deps": "off",
  //     "no-console": "off",
  //     "no-unused-vars": "off",
  //     "no-debugger": "off",
  //     // Add more rules if needed
  //   },
  // },
];

export default eslintConfig;
