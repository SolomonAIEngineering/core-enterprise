import type { Meta, StoryObj } from '@storybook/react'

import { Areas } from './areas'
import { Bars } from './bars'
import { TimeSeriesChart } from './time-series-chart'
import { XAxis } from './x-axis'
import { YAxis } from './y-axis'

const meta: Meta<typeof TimeSeriesChart> = {
  title: 'Charts/TimeSeriesChart',
  component: TimeSeriesChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# TimeSeriesChart Component

A flexible container component for visualizing time-based data with support for multiple chart types.
                `,
      },
    },
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
type Story = StoryObj<typeof TimeSeriesChart>

// Sample data
const generateData = (days: number) => {
  const data: Array<{
    date: Date
    values: {
      visitors: number
      conversions: number
    }
  }> = []
  const now = new Date()
  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (days - i - 1))
    data.push({
      date,
      values: {
        visitors: Math.floor(Math.random() * 1000) + 100,
        conversions: Math.floor(Math.random() * 100) + 10,
      },
    })
  }
  return data
}

const sampleData = generateData(30)

export const AreaChart: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Basic area chart visualization with a single series.',
      },
    },
  },
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'visitors',
            valueAccessor: (d) => d.values.visitors,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'visitors',
              gradientClassName: 'text-blue-500/50',
              lineClassName: 'text-blue-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

export const BarChart: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Bar chart visualization showing conversion metrics.',
      },
    },
  },
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
            id: 'conversions',
            valueAccessor: (d) => d.values.conversions,
            colorClassName: 'text-green-500',
            isActive: true,
          },
        ]}
      >
        <Bars
          seriesStyles={[
            {
              id: 'conversions',
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

export const MultiSeriesChart: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Combined visualization showing multiple metrics.',
      },
    },
  },
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'visitors',
            valueAccessor: (d) => d.values.visitors,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
          {
            id: 'conversions',
            valueAccessor: (d) => d.values.conversions,
            colorClassName: 'text-green-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'visitors',
              gradientClassName: 'text-blue-500/50',
              lineClassName: 'text-blue-700',
            },
            {
              id: 'conversions',
              gradientClassName: 'text-green-500/50',
              lineClassName: 'text-green-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}
