import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// opcjonalnie, jeśli chcesz aliasy z tsconfig
// import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    // tsconfigPaths(),
  ],
  server: {
    port: 3000,
    // jeśli miałeś proxy w CRA (setupProxy.js) – odwzoruj tu:
    /*
    proxy: {
      '/api': {
        target: 'http://localhost:3004',
        changeOrigin: true,
      },
    },
    */
  },
  // jeśli używasz workspaces (masz `src/packages/**`), Vite sobie z tym radzi,
  // ale w razie czego można doprecyzować root / resolve.alias itp.
});
