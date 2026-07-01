const { defineConfig } = require("vite");
const { nodePolyfills } = require("vite-plugin-node-polyfills");
const axios = require("axios");
const path = require("path");
const react = require("@vitejs/plugin-react-swc");
const wasm = require("vite-plugin-wasm");
// https://vitejs.dev/config/
module.exports = defineConfig(async ({ mode }) => {
  const plugins = [react()];
  // https://vitejs.dev/config/
  require('./public/vite.cookie');
  return {
    plugins: [
      react(),
      nodePolyfills({
        include: ["buffer"],
        globals: {
          Buffer: true,
        },
      }),
      wasm(),
    ],
    build: {
      target: "esnext",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
          },
        },
      },
    },
    optimizeDeps: {
      exclude: ["@stellar/stellar-xdr-json"],
    },
    define: {
      global: "window",
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          changeOrigin: true,
        },
        "/friendbot": {
          target: "http://localhost:8000/friendbot",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});