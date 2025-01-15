import type { Meta, StoryObj } from '@storybook/react'

import { Areas } from './areas'
import { Bars } from './bars'
import { TimeSeriesChart } from './time-series-chart'
import { XAxis } from './x-axis'
import { YAxis } from './y-axis'

const meta: Meta = {
  title: 'Charts/Elements',
  parameters: {
    layout: 'centered',
  },
}

export default meta

// Sample data
const sampleData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 0, i + 1),
  values: { value: Math.random() * 100 },
}))

const series = [
  {
    id: 'value',
    valueAccessor: (d: { values: { value: number } }) => d.values.value,
    colorClassName: 'text-blue-500',
  },
]

export const AreasExample: StoryObj<typeof Areas> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart data={sampleData} series={series}>
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

export const BarsExample: StoryObj<typeof Bars> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart type="bar" data={sampleData} series={series}>
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
