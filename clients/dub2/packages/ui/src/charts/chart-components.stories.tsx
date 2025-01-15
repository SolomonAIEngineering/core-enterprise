import type { Meta, StoryObj } from '@storybook/react'

import { Areas } from './areas'
import { Bars } from './bars'
import { TimeSeriesChart } from './time-series-chart'
import { XAxis } from './x-axis'
import { YAxis } from './y-axis'

const meta: Meta = {
  title: 'Charts/Components',
  parameters: {
    layout: 'centered',
  },
}

export default meta

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
        value: Math.floor(Math.random() * 1000),
        secondValue: Math.floor(Math.random() * 500),
      },
    })
  }
  return data
}

const sampleData = generateData(30)

export const SingleArea: StoryObj<typeof Areas> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
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

export const MultipleAreas: StoryObj<typeof Areas> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
          },
          {
            id: 'secondValue',
            valueAccessor: (d) => d.values.secondValue,
            colorClassName: 'text-green-500',
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              lineClassName: 'text-blue-700',
            },
            {
              id: 'secondValue',
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

export const SingleBar: StoryObj<typeof Bars> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
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

export const MultipleBars: StoryObj<typeof Bars> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart
        type="bar"
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
          },
          {
            id: 'secondValue',
            valueAccessor: (d) => d.values.secondValue,
            colorClassName: 'text-green-500',
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
