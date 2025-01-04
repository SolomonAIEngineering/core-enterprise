import type { Meta, StoryObj } from '@storybook/react';

import { MiniAreaChart } from './mini-area-chart';

const meta: Meta<typeof MiniAreaChart> = {
    title: 'Components/MiniAreaChart',
    component: MiniAreaChart,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A compact area chart component for displaying trends in a small space.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MiniAreaChart>;

const defaultData = [
    { date: new Date(2023, 0, 1), value: 10 },
    { date: new Date(2023, 1, 1), value: 15 },
    { date: new Date(2023, 2, 1), value: 8 },
    { date: new Date(2023, 3, 1), value: 12 },
    { date: new Date(2023, 4, 1), value: 20 },
    { date: new Date(2023, 5, 1), value: 18 },
    { date: new Date(2023, 6, 1), value: 25 },
];

export const Default: Story = {
    render: () => (
        <div className="w-32 h-32">
            <MiniAreaChart data={defaultData} />
        </div>
    ),
};

export const WithCustomSize: Story = {
    render: () => (
        <div className="w-64 h-32">
            <MiniAreaChart data={defaultData} />
        </div>
    ),
};

export const WithCustomColor: Story = {
    render: () => (
        <div className="w-32 h-32">
            <MiniAreaChart data={defaultData} />
        </div>
    ),
};

export const WithGradient: Story = {
    render: () => (
        <div className="w-32 h-32">
            <MiniAreaChart data={defaultData} />
        </div>
    ),
};

export const WithTooltip: Story = {
    render: () => (
        <div className="group relative w-32 h-32">
            <MiniAreaChart data={defaultData} />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded bg-gray-900 px-2 py-1 text-xs text-white whitespace-nowrap">
                    Trend over time
                </div>
            </div>
        </div>
    ),
};

export const WithDifferentData: Story = {
    render: () => (
        <div className="w-32 h-32">
            <MiniAreaChart
                data={[
                    { date: new Date(2023, 0, 1), value: 5 },
                    { date: new Date(2023, 1, 1), value: 25 },
                    { date: new Date(2023, 2, 1), value: 15 },
                    { date: new Date(2023, 3, 1), value: 35 },
                    { date: new Date(2023, 4, 1), value: 10 },
                    { date: new Date(2023, 5, 1), value: 30 },
                    { date: new Date(2023, 6, 1), value: 20 },
                ]}
            />
        </div>
    ),
};

export const WithCustomStroke: Story = {
    render: () => (
        <div className="w-32 h-32">
            <MiniAreaChart data={defaultData} />
        </div>
    ),
};

export const WithBackground: Story = {
    render: () => (
        <div className="w-32 h-32 bg-gray-100 p-4 rounded-lg">
            <MiniAreaChart data={defaultData} />
        </div>
    ),
};

export const WithCard: Story = {
    render: () => (
        <div className="w-64 h-64 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium mb-2">Monthly Trend</h3>
            <MiniAreaChart data={defaultData} />
            <p className="text-xs text-gray-500 mt-2">Last 7 months</p>
        </div>
    ),
};

export const Responsive: Story = {
    render: () => (
        <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-96 lg:h-96">
            <MiniAreaChart data={defaultData} />
        </div>
    ),
}; 