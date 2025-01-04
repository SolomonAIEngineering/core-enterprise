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
};

export default meta;
type Story = StoryObj<typeof Areas>;

// Sample data
const generateData = (days: number) => {
    const data: Array<{
        date: Date;
        values: {
            primary: number;
            secondary: number;
        };
    }> = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (days - i - 1));
        data.push({
            date,
            values: {
                primary: Math.floor(Math.random() * 1000),
                secondary: Math.floor(Math.random() * 500),
            },
        } as const);
    }
    return data;
};

const sampleData = generateData(30);

export const Default: Story = {
    render: () => (
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart
                data={sampleData}
                series={[
                    {
                        id: "primary",
                        valueAccessor: (d) => d.values.primary,
                        colorClassName: "text-blue-500",
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
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart
                data={sampleData}
                series={[
                    {
                        id: "primary",
                        valueAccessor: (d) => d.values.primary,
                        colorClassName: "text-blue-500",
                    },
                ]}
            >
                <Areas
                    seriesStyles={[
                        {
                            id: "primary",
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
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart
                data={sampleData}
                series={[
                    {
                        id: "primary",
                        valueAccessor: (d) => d.values.primary,
                        colorClassName: "text-blue-500",
                    },
                    {
                        id: "secondary",
                        valueAccessor: (d) => d.values.secondary,
                        colorClassName: "text-green-500",
                    },
                ]}
            >
                <Areas
                    seriesStyles={[
                        {
                            id: "primary",
                            gradientClassName: "text-blue-500/50",
                            lineClassName: "text-blue-700",
                        },
                        {
                            id: "secondary",
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