import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//REVIEW[epic=PWA, seq=1] 8- Install vite-plugin-pwa and create manifest
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //REVIEW[epic=deploy, seq=7] 7- To make sure vite starts always in the same port, to match CORS options
  server: {
    port: 5173,
  },
});
