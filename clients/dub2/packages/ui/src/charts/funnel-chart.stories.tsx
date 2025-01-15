import type { Meta, StoryObj } from '@storybook/react'

import { FunnelChart } from './funnel-chart'

const meta: Meta<typeof FunnelChart> = {
  title: 'Charts/FunnelChart',
  component: FunnelChart,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof FunnelChart>

export const Default: Story = {
  args: {
    steps: [
      {
        id: 'visitors',
        label: 'Total Visitors',
        value: 1000,
        colorClassName: 'text-blue-500',
      },
      {
        id: 'interested',
        label: 'Interested Users',
        value: 750,
        colorClassName: 'text-blue-600',
      },
      {
        id: 'engaged',
        label: 'Engaged Users',
        value: 500,
        colorClassName: 'text-blue-700',
      },
      {
        id: 'converted',
        label: 'Converted Users',
        value: 250,
        colorClassName: 'text-blue-800',
      },
    ],
  },
  render: (args) => (
    <div className="h-[400px] w-[600px]">
      <FunnelChart {...args} />
    </div>
  ),
}

export const WithAdditionalValues: Story = {
  args: {
    steps: [
      {
        id: 'visitors',
        label: 'Total Visitors',
        value: 1000,
        additionalValue: 0,
        colorClassName: 'text-blue-500',
      },
      {
        id: 'interested',
        label: 'Interested Users',
        value: 750,
        additionalValue: 1500,
        colorClassName: 'text-blue-600',
      },
      {
        id: 'converted',
        label: 'Converted Users',
        value: 250,
        additionalValue: 5000,
        colorClassName: 'text-blue-800',
      },
    ],
  },
}
