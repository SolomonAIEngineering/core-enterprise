import type { Meta, StoryObj } from '@storybook/react'
import { addMonths, startOfToday, subDays } from 'date-fns'
import { Presets } from './presets'
import type { DateRangePreset } from './types'

const meta = {
  title: 'Components/DatePresets',
  component: Presets,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A component for displaying and selecting date presets with keyboard shortcuts and tooltips.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Presets>

export default meta
type Story = StoryObj<typeof Presets>

const today = startOfToday()

const datePresets: DateRangePreset[] = [
  {
    id: 'today',
    label: 'Today',
    shortcut: 't',
    dateRange: {
      from: today,
      to: today,
    },
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
    shortcut: 'y',
    dateRange: {
      from: subDays(today, 1),
      to: subDays(today, 1),
    },
  },
  {
    id: 'last7',
    label: 'Last 7 days',
    shortcut: '7',
    dateRange: {
      from: subDays(today, 6),
      to: today,
    },
  },
  {
    id: 'next3months',
    label: 'Next 3 months',
    dateRange: {
      from: today,
      to: addMonths(today, 3),
    },
  },
]

export const Default: Story = {
  render: () => (
    <div className="w-[200px] rounded-lg border border-gray-200 p-4">
      <Presets
        presets={datePresets}
        onSelect={(preset) => console.log('Selected preset:', preset)}
      />
    </div>
  ),
}

export const WithCurrentValue: Story = {
  render: () => (
    <div className="w-[200px] rounded-lg border border-gray-200 p-4">
      <Presets
        presets={datePresets}
        onSelect={(preset) => console.log('Selected preset:', preset)}
        currentValue={{
          from: today,
          to: today,
        }}
      />
    </div>
  ),
}

export const WithUpgradeRequired: Story = {
  render: () => {
    const presetsWithUpgrade = [
      ...datePresets,
      {
        id: 'custom',
        label: 'Custom Range',
        requiresUpgrade: true,
        tooltipContent: 'Upgrade to Pro to use custom ranges',
        dateRange: {
          from: today,
          to: addMonths(today, 1),
        },
      },
    ]

    return (
      <div className="w-[200px] rounded-lg border border-gray-200 p-4">
        <Presets
          presets={presetsWithUpgrade}
          onSelect={(preset) => console.log('Selected preset:', preset)}
        />
      </div>
    )
  },
}
