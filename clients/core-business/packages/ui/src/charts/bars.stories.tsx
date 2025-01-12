import type { Meta, StoryObj } from '@storybook/react'

import { Bars } from './bars'
import { TimeSeriesChart } from './time-series-chart'
import { XAxis } from './x-axis'
import { YAxis } from './y-axis'

const meta: Meta<typeof Bars> = {
  title: 'Charts/Bars',
  component: Bars,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '2em', background: 'white', padding: '1em' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Bars>

// Sample data
const generateData = (days: number) => {
  const data: Array<{
    date: Date
    values: {
      value: number
      secondValue: number
    }
  }> = []
  const now = new Date()
  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (days - i - 1))
    data.push({
      date,
      values: {
        value: Math.floor(Math.random() * 1000) + 100,
        secondValue: Math.floor(Math.random() * 500) + 50,
      },
    })
  }
  return data
}

const sampleData = generateData(30)

// Generate weekly data with positive and negative values
const generateWeeklyData = (weeks: number) => {
  const data: Array<{
    date: Date
    values: {
      value: number
      change: number
    }
  }> = []
  const now = new Date()
  for (let i = 0; i < weeks; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (weeks - i - 1) * 7)
    data.push({
      date,
      values: {
        value: Math.floor(Math.random() * 2000) - 1000, // -1000 to 1000
        change: Math.floor(Math.random() * 200) - 100, // -100 to 100
      },
    })
  }
  return data
}

const weeklyData = generateWeeklyData(12)

export const Default: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
        ]}
      >
        <Bars />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              barClassName: 'text-blue-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

export const MultiSeries: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
          {
            id: 'secondValue',
            valueAccessor: (d) => d.values.secondValue,
            colorClassName: 'text-green-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              barClassName: 'text-blue-700',
            },
            {
              id: 'secondValue',
              gradientClassName: 'text-green-500/50',
              barClassName: 'text-green-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

export const CustomRadius: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-purple-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-purple-500/50',
              barClassName: 'text-purple-700',
              barFill: 'url(#value-background)',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Demonstrates a bar chart with negative values, useful for showing profit/loss
 * or any metric that can go below zero.
 */
export const NegativeValues: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={weeklyData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              barClassName: 'text-blue-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Shows bars with conditional coloring based on value.
 * Positive values are shown in green, negative in red.
 */
export const ConditionalColoring: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={weeklyData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-green-500',
            isActive: true,
          },
        ]}
      >
        <Bars />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Demonstrates a dense bar chart with many data points and custom bar width
 */
export const DenseBarChart: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={generateData(60)}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-indigo-500',
            isActive: true,
          },
        ]}
      >
        <Bars />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Shows a bar chart with custom hover effects and tooltips
 */
export const CustomHoverEffects: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-violet-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-violet-500/50 hover:text-violet-600/50',
              barClassName:
                'text-violet-700 transition-colors duration-200 hover:text-violet-800',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Demonstrates a stacked bar chart with multiple series
 */
export const StackedBars: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
          {
            id: 'secondValue',
            valueAccessor: (d) => d.values.secondValue,
            colorClassName: 'text-green-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              barClassName: 'text-blue-700',
            },
            {
              id: 'secondValue',
              gradientClassName: 'text-green-500/50',
              barClassName: 'text-green-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Shows a bar chart with custom bar spacing
 */
export const CustomSpacing: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        padding={{ top: 0.2, bottom: 0.2 }}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-amber-500',
            isActive: true,
          },
        ]}
      >
        <Bars />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Demonstrates a bar chart with custom patterns
 */
export const PatternedBars: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-teal-500',
            isActive: true,
          },
        ]}
      >
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="4" height="4">
            <circle cx="2" cy="2" r="1" className="fill-current" />
          </pattern>
        </defs>
        <Bars
          seriesStyles={[
            {
              id: 'value',
              barFill: 'url(#dots)',
              barClassName: 'text-teal-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Shows a bar chart with rounded corners
 */
export const RoundedBars: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-pink-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-pink-500/50',
              barClassName: 'text-pink-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Demonstrates a bar chart with custom animations
 */
export const CustomAnimations: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-cyan-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-cyan-500/50',
              barClassName: 'text-cyan-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Shows a minimal bar chart without grid lines or axes
 */
export const MinimalStyle: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-gray-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-gray-500/50',
              barClassName: 'text-gray-700',
            },
          ]}
        />
      </TimeSeriesChart>
    </div>
  ),
}
