import { defineConfig, loadEnv } from "vite";

import http from "https";
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./testSetup.js",
      coverage: {
        functions: 100,
        lines: 100,
        statements: 100,
        branches: 100,
      },
    },
    // server: {
    //   port: 3000,
    //   proxy: {
    //     "/api/v1": {
    //       target: env.VITE_API_HOST,
    //       changeOrigin: true,
    //       secure: false,
    //       agent: new http.Agent(),
    //     },
    //   },
    // },
    server: {
      host: "0.0.0.0",
      port: 3000,
      cors: true,
    },
    optimizeDeps: {
      exclude: ["@fortawesome/fontawesome-svg-core"]
    }
  };
});