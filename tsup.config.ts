import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["lib/index.ts","lib/utils/memory.ts"],
  format: ["cjs", "esm", "iife"],
  dts: true,
  minify: true,
  minifySyntax: true,
  minifyWhitespace: true,
  splitting: true,
  sourcemap: true,
  minifyIdentifiers: true,
  clean: true,
});