import { defineConfig } from "vite";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import sass from "sass";

export default defineConfig({
  base: "./",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["interactive"],
        },
      },
    },
  },
  css: {
    transformer: "lightningcss",
  },
  plugins: [
    {
      name: "postcss-sync",
      async buildEnd() {
        const css = await postcss([autoprefixer]).process(
          globalThis.css || "",
          { from: undefined }
        );
        globalThis.css = css.css;
      },
    },
  ],
});