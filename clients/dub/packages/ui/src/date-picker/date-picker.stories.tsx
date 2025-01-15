import type { StoryObj } from '@storybook/react'
import { addDays, addMonths, startOfToday, subDays } from 'date-fns'
import type { DateRange, DateRangePreset } from './types'

import { useState } from 'react'
import { Calendar } from './calendar'
import { DateRangePicker } from './date-range-picker'

const meta = {
  title: 'Components/DatePicker',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A comprehensive date picking solution that includes both a Calendar component for embedding
and a DateRangePicker component for selecting date ranges with presets.

## Features
- Single date and date range selection
- Customizable presets with keyboard shortcuts
- Responsive design (mobile-friendly)
- Year navigation
- Localization support
- Disabled dates support
- Accessible keyboard navigation
- Custom styling options
                `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

// Calendar Stories
type CalendarStory = StoryObj<typeof Calendar>

export const SingleDateCalendar: CalendarStory = {
  render: () => {
    const [selected, setSelected] = useState<Date>()
    return (
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        className="rounded-md border"
      />
    )
  },
}

export const DateRangeCalendar: CalendarStory = {
  render: () => {
    const [range, setRange] = useState<DateRange>()
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className="rounded-md border"
      />
    )
  },
}

export const WithYearNavigation: CalendarStory = {
  render: () => (
    <Calendar mode="single" showYearNavigation className="rounded-md border" />
  ),
}

// DateRangePicker Stories
type DateRangePickerStory = StoryObj<typeof DateRangePicker>

const today = startOfToday()
const presets: DateRangePreset[] = [
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
    id: 'last30',
    label: 'Last 30 days',
    shortcut: '3',
    dateRange: {
      from: subDays(today, 29),
      to: today,
    },
  },
  {
    id: 'future',
    label: 'Next 3 months',
    dateRange: {
      from: today,
      to: addMonths(today, 3),
    },
  },
]

export const BasicDateRangePicker: DateRangePickerStory = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>()
    return (
      <div className="w-[300px]">
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>
    )
  },
}

export const WithPresets: DateRangePickerStory = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>()
    return (
      <div className="w-[300px]">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          presets={presets}
        />
      </div>
    )
  },
}

export const WithDisabledDates: DateRangePickerStory = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>()
    return (
      <div className="w-[300px]">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          disabledDays={[
            { from: subDays(today, 7), to: subDays(today, 1) },
            { from: addDays(today, 1), to: addDays(today, 7) },
          ]}
        />
      </div>
    )
  },
}

export const WithError: DateRangePickerStory = {
  render: () => (
    <div className="w-[300px]">
      <DateRangePicker hasError />
    </div>
  ),
}

export const Disabled: DateRangePickerStory = {
  render: () => (
    <div className="w-[300px]">
      <DateRangePicker disabled />
    </div>
  ),
}
