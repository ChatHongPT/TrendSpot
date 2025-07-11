import tseslint from "typescript-eslint";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // 정확한 tsconfig 경로
        sourceType: "module",
      },
    },
  },
];
