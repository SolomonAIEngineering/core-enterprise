import type { Meta, StoryObj } from '@storybook/react';

import { LinkLogo } from './link-logo';

const meta: Meta<typeof LinkLogo> = {
    title: 'Components/LinkLogo',
    component: LinkLogo,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A component for displaying logos with link functionality.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof LinkLogo>;

export const Default: Story = {
    render: () => (
        <LinkLogo href="https://example.com" />
    ),
};

export const WithCustomSize: Story = {
    render: () => (
        <LinkLogo href="https://example.com" className="h-12 w-12" />
    ),
};

export const WithBackground: Story = {
    render: () => (
        <div className="bg-gray-100 p-4 rounded-lg">
            <LinkLogo href="https://example.com" />
        </div>
    ),
};

export const WithGradient: Story = {
    render: () => (
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg">
            <LinkLogo href="https://example.com" />
        </div>
    ),
};

export const WithCustomColor: Story = {
    render: () => (
        <LinkLogo href="https://example.com" className="text-blue-500" />
    ),
};

export const WithHoverEffect: Story = {
    render: () => (
        <LinkLogo
            href="https://example.com"
            className="transition-transform hover:scale-110"
        />
    ),
};

export const WithTooltip: Story = {
    render: () => (
        <div className="group relative">
            <LinkLogo href="https://example.com" />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded bg-gray-900 px-2 py-1 text-xs text-white">
                    Visit our website
                </div>
            </div>
        </div>
    ),
};

export const WithBorder: Story = {
    render: () => (
        <LinkLogo
            href="https://example.com"
            className="rounded-full border-2 border-gray-200 p-1"
        />
    ),
};

export const WithShadow: Story = {
    render: () => (
        <LinkLogo
            href="https://example.com"
            className="shadow-lg hover:shadow-xl transition-shadow"
        />
    ),
};

export const WithCustomTarget: Story = {
    render: () => (
        <LinkLogo
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
        />
    ),
}; 