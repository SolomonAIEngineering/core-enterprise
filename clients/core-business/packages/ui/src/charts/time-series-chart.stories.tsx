import type { Meta, StoryObj } from "@storybook/react";

import { Areas } from "./areas";
import { Bars } from "./bars";
import { TimeSeriesChart } from "./time-series-chart";
import { XAxis } from "./x-axis";
import { YAxis } from "./y-axis";

const meta: Meta<typeof TimeSeriesChart> = {
    title: "Charts/TimeSeriesChart",
    component: TimeSeriesChart,
    parameters: {
        layout: "centered",
    },
};

export default meta;
type Story = StoryObj<typeof TimeSeriesChart>;

// Sample data
const generateData = (days: number) => {
    const data = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
        const date = new Date(now);
        date.setDate(date.getDate() - (days - i - 1));
        data.push({
            date,
            values: {
                visitors: Math.floor(Math.random() * 1000),
                conversions: Math.floor(Math.random() * 100),
            },
        });
    }
    return data;
};

const sampleData = generateData(30);

export const AreaChart: Story = {
    args: {
        data: sampleData,
        series: [
            {
                id: "visitors",
                valueAccessor: (d) => d.values.visitors,
                colorClassName: "text-blue-500",
            },
        ],
    },
    render: (args) => (
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart {...args}>
                <Areas />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
};

export const BarChart: Story = {
    args: {
        type: "bar",
        data: sampleData,
        series: [
            {
                id: "conversions",
                valueAccessor: (d) => d.values.conversions,
                colorClassName: "text-green-500",
            },
        ],
    },
    render: (args) => (
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart {...args}>
                <Bars />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
};

export const MultiSeriesChart: Story = {
    args: {
        data: sampleData,
        series: [
            {
                id: "visitors",
                valueAccessor: (d) => d.values.visitors,
                colorClassName: "text-blue-500",
            },
            {
                id: "conversions",
                valueAccessor: (d) => d.values.conversions,
                colorClassName: "text-green-500",
            },
        ],
    },
    render: (args) => (
        <div className="h-[400px] w-[600px]">
            <TimeSeriesChart {...args}>
                <Areas />
                <XAxis showGridLines />
                <YAxis showGridLines />
            </TimeSeriesChart>
        </div>
    ),
}; 