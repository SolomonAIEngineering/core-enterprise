import type { Meta, StoryObj } from '@storybook/react'
import { Calendar, ListFilter, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { FilterList } from './filter-list'
import type { Filter, FilterOption } from './types'

const meta: Meta<typeof FilterList> = {
  title: 'Components/FilterList',
  component: FilterList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A list component for displaying and managing active filters with support for multiple selection and custom rendering.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="font-sans">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FilterList>

export default meta
type Story = StoryObj<typeof FilterList>

// Example filters for all stories
const filters: Filter[] = [
  {
    key: 'status',
    label: 'Status',
    icon: ListFilter,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Pending', value: 'pending' },
    ],
  },
  {
    key: 'date',
    label: 'Date',
    icon: Calendar,
    options: [
      { label: 'Today', value: 'today' },
      { label: 'Last 7 days', value: 'last7' },
      { label: 'Last 30 days', value: 'last30' },
    ],
  },
  {
    key: 'assignee',
    label: 'Assignee',
    icon: User,
    multiple: true,
    options: [
      { label: 'John Doe', value: 'john' },
      { label: 'Jane Smith', value: 'jane' },
      { label: 'Bob Johnson', value: 'bob' },
    ],
  },
  {
    key: 'type',
    label: 'Type',
    icon: Mail,
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'In Person', value: 'in-person' },
    ],
  },
]

export const Default: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([
      { key: 'status', value: 'active' },
      { key: 'date', value: 'today' },
    ])

    return (
      <div className="w-[600px]">
        <FilterList
          filters={filters}
          activeFilters={activeFilters}
          onRemove={(key, value) => {
            setActiveFilters(
              activeFilters.filter((f) => !(f.key === key && f.value === value))
            )
          }}
          onRemoveAll={() => {}}
        />
      </div>
    )
  },
}

export const WithMultipleSelection: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([
      { key: 'assignee', value: ['john', 'jane'] },
      { key: 'status', value: 'active' },
    ])

    return (
      <div className="w-[600px]">
        <FilterList
          filters={filters}
          activeFilters={activeFilters}
          onRemove={(key, value) => {
            if (Array.isArray(value)) {
              const filter = activeFilters.find((f) => f.key === key)
              if (filter && Array.isArray(filter.value)) {
                const newValue = filter.value.filter((v) => v !== value[0])
                if (newValue.length === 0) {
                  setActiveFilters(activeFilters.filter((f) => f.key !== key))
                } else {
                  setActiveFilters([
                    ...activeFilters.filter((f) => f.key !== key),
                    { key, value: newValue },
                  ])
                }
              }
            } else {
              setActiveFilters(
                activeFilters.filter(
                  (f) => !(f.key === key && f.value === value)
                )
              )
            }
          }}
          onRemoveAll={() => {}}
        />
      </div>
    )
  },
}

export const EmptyState: Story = {
  render: () => (
    <div className="w-[600px]">
      <FilterList
        filters={filters}
        activeFilters={[]}
        onRemove={() => {}}
        onRemoveAll={() => {}}
      />
    </div>
  ),
}

export const WithCustomRender: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([
      { key: 'status', value: 'active' },
      { key: 'date', value: 'today' },
    ])

    return (
      <div className="w-[600px]">
        <FilterList
          filters={filters}
          activeFilters={activeFilters}
          onRemove={(key, value) => {
            setActiveFilters(
              activeFilters.filter((f) => !(f.key === key && f.value === value))
            )
          }}
          onRemoveAll={() => {}}
        />
      </div>
    )
  },
}
