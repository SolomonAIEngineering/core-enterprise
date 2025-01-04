import type { Meta, StoryObj } from "@storybook/react";

import { Areas } from "./areas";
import React from "react";
import { TimeSeriesChart } from "./time-series-chart";
import { XAxis } from "./x-axis";
import { YAxis } from "./y-axis";

const meta: Meta<typeof Areas> = {
    title: "Charts/Areas",
    component: Areas,
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <div style={{ margin: '2em', background: 'white', padding: '1em' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Areas>;

// Sample data
const generateData = (days: number) => {
    const data: Array<{
        date: Date;
        values: {
            value: number;
            secondValue: number;
        };
    }> = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (days - i - 1));
        data.push({
            date,
            values: {
                value: Math.floor(Math.random() * 1000) + 100,
                secondValue: Math.floor(Math.random() * 500) + 50,
            },
        });
    }
    return data;
};

const sampleData = generateData(30);

export const Default: Story = {
    render: () => (
        <div style={{ width: '800px', height: '400px' }} className="border border-gray-200 rounded-lg p-4">
            <TimeSeriesChart
                data={sampleData}
                series={[
                    {
                        id: "value",
                        valueAccessor: (d) => d.values.value,
                        colorClassName: "text-blue-500",
                        isActive: true,
                    },
                ]}
            >
                <Areas />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
};

export const WithCustomStyles: Story = {
    render: () => (
        <div style={{ width: '800px', height: '400px' }} className="border border-gray-200 rounded-lg p-4">
            <TimeSeriesChart
                data={sampleData}
                series={[
                    {
                        id: "value",
                        valueAccessor: (d) => d.values.value,
                        colorClassName: "text-blue-500",
                        isActive: true,
                    },
                ]}
            >
                <Areas
                    seriesStyles={[
                        {
                            id: "value",
                            gradientClassName: "text-blue-500/50",
                            lineClassName: "text-blue-700",
                        },
                    ]}
                />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
};

export const MultiSeries: Story = {
    render: () => (
        <div style={{ width: '800px', height: '400px' }} className="border border-gray-200 rounded-lg p-4">
            <TimeSeriesChart
                data={sampleData}
                series={[
                    {
                        id: "value",
                        valueAccessor: (d) => d.values.value,
                        colorClassName: "text-blue-500",
                        isActive: true,
                    },
                    {
                        id: "secondValue",
                        valueAccessor: (d) => d.values.secondValue,
                        colorClassName: "text-green-500",
                        isActive: true,
                    },
                ]}
            >
                <Areas
                    seriesStyles={[
                        {
                            id: "value",
                            gradientClassName: "text-blue-500/50",
                            lineClassName: "text-blue-700",
                        },
                        {
                            id: "secondValue",
                            gradientClassName: "text-green-500/50",
                            lineClassName: "text-green-700",
                        },
                    ]}
                />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
}; 