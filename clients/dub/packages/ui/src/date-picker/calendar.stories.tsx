import type { Meta, StoryObj } from '@storybook/react'
import { addDays, startOfToday, subDays } from 'date-fns'
import { useState } from 'react'
import { Calendar } from './calendar'
import type { DateRange as DateRangeType } from './types'

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible calendar component that supports single date and date range selection with customizable navigation and styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
      description: 'Selection mode of the calendar',
    },
    weekStartsOn: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'First day of the week (0 = Sunday)',
    },
    numberOfMonths: {
      control: 'number',
      description: 'Number of months to display',
    },
    showYearNavigation: {
      control: 'boolean',
      description: 'Show year navigation buttons',
    },
    disableNavigation: {
      control: 'boolean',
      description: 'Disable month/year navigation',
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof Calendar>

export const SingleDate: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date>()
    return (
      <div className="rounded-lg border border-gray-200">
        <Calendar mode="single" selected={selected} onSelect={setSelected} />
      </div>
    )
  },
}

export const DateRange: Story = {
  render: () => {
    const [range, setRange] = useState<DateRangeType>()
    return (
      <div className="rounded-lg border border-gray-200">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
        />
      </div>
    )
  },
}

export const WithYearNavigation: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date>()
    return (
      <div className="rounded-lg border border-gray-200">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          showYearNavigation
        />
      </div>
    )
  },
}

export const WithDisabledDates: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date>()
    const today = startOfToday()
    return (
      <div className="rounded-lg border border-gray-200">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          disabled={[
            { from: subDays(today, 5), to: subDays(today, 1) },
            { from: addDays(today, 1), to: addDays(today, 5) },
          ]}
        />
      </div>
    )
  },
}

export const MultipleMonths: Story = {
  render: () => {
    const [selected, setSelected] = useState<Date>()
    return (
      <div className="rounded-lg border border-gray-200">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          numberOfMonths={3}
        />
      </div>
    )
  },
}
