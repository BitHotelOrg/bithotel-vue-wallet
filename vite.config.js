import { fileURLToPath, URL } from "url";

import { defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), splitVendorChunkPlugin(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      util: "rollup-plugin-node-polyfills/polyfills/util",
    },
  },
  server: {
    port: 8080,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    lib: {
      entry: fileURLToPath(new URL("index.ts", import.meta.url)),
      name: "bithotel-vue-wallet",
      fileName: (format) => `bithotel-vue-wallet.${format}.js`,
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});

// "exports": {
//   ".": {
//     "imports": "./dist/bithotel-vue-wallet.es.js",
//     "require": "./dist/bithotel-vue-wallet.umd.js"
//   },
//   "./dist/style.css": "./dist/style.css"
// },
