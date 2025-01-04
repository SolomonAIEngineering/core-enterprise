import '../src/styles/globals.css';

import type { Preview, StoryFn } from "@storybook/react";

import React from 'react';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        layout: 'centered',
    },
    decorators: [
        (Story: StoryFn) => (
            <div className="min-h-screen">
                <Story />
            </div>
        ),
    ],
};

export default preview; 