import type { Config } from "tailwindcss";
// tailwind config is required for editor support
import sharedConfig from "@dub/tailwind-config/tailwind.config.ts";

const config: Pick<Config, "presets" | "content"> = {
  presets: [sharedConfig],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}"
  ],
};

export default config;
