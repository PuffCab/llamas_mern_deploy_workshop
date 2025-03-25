import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
//REVIEW[epic=PWA, seq=1] 8- Install vite-plugin-pwa and create manifest
const manifestForPlugIn: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "Petrol Raccoons MERN Spikes App",
    short_name: "PR MERN",
    description:
      "This app was created during live demos of MERN stack technologies.",
    icons: [
      {
        src: "assets/maskable_icon_x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "assets/maskable_icon_x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#171717",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  //REVIEW[epic=deploy, seq=7] 7- To make sure vite starts always in the same port, to match CORS options
  server: {
    port: 5173,
  },
});
