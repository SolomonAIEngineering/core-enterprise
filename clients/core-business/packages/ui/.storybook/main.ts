import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
    ],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    core: {
        builder: "@storybook/builder-vite",
    },
    async viteFinal(config) {
        return {
            ...config,
            define: {
                ...config.define,
                'process.env': process.env,
            },
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve?.alias,
                    "@": "/src",
                },
            },
        };
    },
};

export default config; 