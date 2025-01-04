import type { Meta, StoryObj } from '@storybook/react';

import { ShimmerDots } from './shimmer-dots';

const meta: Meta<typeof ShimmerDots> = {
    title: 'Components/ShimmerDots',
    component: ShimmerDots,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A shimmer dots animation component using WebGL for smooth performance.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ShimmerDots>;

export const Default: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg">
            <ShimmerDots />
        </div>
    ),
};

export const WithCustomSize: Story = {
    render: () => (
        <div className="relative w-96 h-48 bg-gray-100 rounded-lg">
            <ShimmerDots dotSize={2} cellSize={4} />
        </div>
    ),
};

export const WithCustomSpeed: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg">
            <ShimmerDots speed={10} />
        </div>
    ),
};

export const WithDarkBackground: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gray-900 rounded-lg">
            <ShimmerDots className="opacity-20" />
        </div>
    ),
};

export const WithGradientBackground: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
            <ShimmerDots className="opacity-30" />
        </div>
    ),
};

export const SmallDots: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg">
            <ShimmerDots dotSize={0.5} cellSize={2} />
        </div>
    ),
};

export const LargeDots: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg">
            <ShimmerDots dotSize={3} cellSize={6} />
        </div>
    ),
};

export const SlowAnimation: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg">
            <ShimmerDots speed={2} />
        </div>
    ),
};

export const FastAnimation: Story = {
    render: () => (
        <div className="relative w-64 h-64 bg-gray-100 rounded-lg">
            <ShimmerDots speed={15} />
        </div>
    ),
};

export const WithCard: Story = {
    render: () => (
        <div className="relative w-96 p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-lg font-medium mb-4">Loading Card</h3>
            <div className="relative h-32 bg-gray-100 rounded-lg">
                <ShimmerDots dotSize={1.5} cellSize={4} speed={7} />
            </div>
            <p className="mt-4 text-gray-600">Content loading...</p>
        </div>
    ),
}; 