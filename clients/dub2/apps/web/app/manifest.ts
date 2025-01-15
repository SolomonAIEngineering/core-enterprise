import { BusinessConfig as platform } from "@dub/platform-config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: platform.company,
    short_name: platform.shortName,
    description: platform.title,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: platform.assets.faviconAndroid192,
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: platform.assets.faviconAndroid512,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
