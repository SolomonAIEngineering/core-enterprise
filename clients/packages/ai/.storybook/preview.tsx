import '../styles/globals.css';

import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#ffffff',
                },
                {
                    name: 'dark',
                    value: '#1a1a1a',
                },
            ],
        },
        layout: 'fullscreen',
    },
    decorators: [
        (Story) => (
            <div className="min-h-screen bg-background p-4">
                <Story />
            </div>
        ),
    ],
};

export default preview; 