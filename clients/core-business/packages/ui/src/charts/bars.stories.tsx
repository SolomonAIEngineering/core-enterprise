import type { Meta, StoryObj } from "@storybook/react";

import { Bars } from "./bars";
import React from "react";
import { TimeSeriesChart } from "./time-series-chart";
import { XAxis } from "./x-axis";
import { YAxis } from "./y-axis";

const meta: Meta<typeof Bars> = {
    title: "Charts/Bars",
    component: Bars,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof Bars>;

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
        });
    }
    return data;
};

const sampleData = generateData(30);

export const Default: Story = {
    render: () => (
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart
                type="bar"
                data={sampleData}
                series={[
                    {
                        id: "primary",
                        valueAccessor: (d) => d.values.primary,
                        colorClassName: "text-blue-500",
                    },
                ]}
            >
                <Bars />
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
                type="bar"
                data={sampleData}
                series={[
                    {
                        id: "primary",
                        valueAccessor: (d) => d.values.primary,
                        colorClassName: "text-blue-500",
                    },
                ]}
            >
                <Bars
                    seriesStyles={[
                        {
                            id: "primary",
                            gradientClassName: "text-blue-500/50",
                            barClassName: "text-blue-700",
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
                type="bar"
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
                <Bars
                    seriesStyles={[
                        {
                            id: "primary",
                            gradientClassName: "text-blue-500/50",
                            barClassName: "text-blue-700",
                        },
                        {
                            id: "secondary",
                            gradientClassName: "text-green-500/50",
                            barClassName: "text-green-700",
                        },
                    ]}
                />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
};

export const CustomRadius: Story = {
    render: () => (
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart
                type="bar"
                data={sampleData}
                series={[
                    {
                        id: "primary",
                        valueAccessor: (d) => d.values.primary,
                        colorClassName: "text-purple-500",
                    },
                ]}
            >
                <Bars
                    seriesStyles={[
                        {
                            id: "primary",
                            gradientClassName: "text-purple-500/50",
                            barClassName: "text-purple-700",
                            barFill: "url(#primary-background)",
                        },
                    ]}
                />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
}; 