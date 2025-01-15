import type { Meta, StoryObj } from '@storybook/react'

import { TimeSeriesChart } from './time-series-chart'
import { XAxis } from './x-axis'
import { YAxis } from './y-axis'

const meta: Meta<typeof XAxis> = {
  title: 'Charts/Axes',
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
  },
]

export const XAxisExample: StoryObj<typeof XAxis> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart data={sampleData} series={series}>
        <XAxis showGridLines maxTicks={6} />
      </TimeSeriesChart>
    </div>
  ),
}

export const YAxisExample: StoryObj<typeof YAxis> = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart data={sampleData} series={series}>
        <YAxis showGridLines numTicks={5} />
      </TimeSeriesChart>
    </div>
  ),
}

export const BothAxes: StoryObj = {
  render: () => (
    <div className="h-[400px] w-[600px]">
      <TimeSeriesChart data={sampleData} series={series}>
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}
