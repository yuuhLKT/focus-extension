import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        options: resolve(__dirname, "options.html"),
        service_worker: resolve(__dirname, "src/background/background.ts"),
        content: resolve(__dirname, "src/content/index.ts"),
        audio_script: resolve(__dirname, "src/utils/playAudio.ts"),
      },
      output: {
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[ext]",
        entryFileNames: "[name].js",
        dir: "dist",
      },
    },
  }
});
