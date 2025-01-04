import type { Meta, StoryObj } from '@storybook/react';

import { Grid } from './grid';

const meta: Meta<typeof Grid> = {
    title: 'Components/Grid',
    component: Grid,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A grid component for creating responsive layouts with customizable patterns.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Grid>;

export const Default: Story = {
    render: () => (
        <Grid className="h-96 w-96" />
    ),
};

export const CustomCellSize: Story = {
    render: () => (
        <Grid className="h-96 w-96" cellSize={20} />
    ),
};

export const CustomStrokeWidth: Story = {
    render: () => (
        <Grid className="h-96 w-96" strokeWidth={2} />
    ),
};

export const CustomStrokeColor: Story = {
    render: () => (
        <Grid className="h-96 w-96" strokeColor="rgba(59, 130, 246, 0.2)" />
    ),
};

export const WithPatternOffset: Story = {
    render: () => (
        <Grid className="h-96 w-96" patternOffset={[10, 10]} />
    ),
};

export const WithContent: Story = {
    render: () => (
        <div className="relative h-96 w-96">
            <Grid className="absolute inset-0" />
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="rounded-lg bg-white/90 p-6 shadow-lg">
                    <h3 className="text-lg font-medium">Content Example</h3>
                    <p className="mt-2 text-gray-600">Content overlaid on grid pattern</p>
                </div>
            </div>
        </div>
    ),
};

export const AnimatedPattern: Story = {
    render: () => (
        <Grid
            className="h-96 w-96 transition-all duration-300 hover:opacity-50"
            patternOffset={[0, 0]}
            onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                el.style.setProperty('--pattern-offset-x', `${x}px`);
                el.style.setProperty('--pattern-offset-y', `${y}px`);
            }}
        />
    ),
};

export const ResponsiveGrid: Story = {
    render: () => (
        <Grid
            className="h-96 w-full max-w-4xl"
            cellSize={{
                base: 10,
                sm: 15,
                md: 20,
                lg: 25,
                xl: 30,
            }}
        />
    ),
};

export const GradientOverlay: Story = {
    render: () => (
        <div className="relative h-96 w-96">
            <Grid className="absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
        </div>
    ),
};

export const WithDarkTheme: Story = {
    render: () => (
        <div className="bg-gray-900 p-8">
            <Grid
                className="h-96 w-96"
                strokeColor="rgba(255, 255, 255, 0.1)"
            />
        </div>
    ),
}; 