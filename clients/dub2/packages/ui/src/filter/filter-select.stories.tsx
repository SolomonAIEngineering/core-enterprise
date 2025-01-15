import type { Meta, StoryObj } from '@storybook/react'
import { Calendar, ListFilter, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { FilterSelect } from './filter-select'
import type { Filter, FilterOption } from './types'

const meta: Meta<typeof FilterSelect> = {
  title: 'Components/FilterSelect',
  component: FilterSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A dropdown component for selecting and managing filters with search, keyboard shortcuts, and AI capabilities.',
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
} satisfies Meta<typeof FilterSelect>

export default meta
type Story = StoryObj<typeof FilterSelect>

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
    >([])

    const handleSelect = (key: string, value: FilterOption['value']) => {
      const filter = filters.find((f) => f.key === key)
      if (filter?.multiple) {
        const existing = activeFilters.find((f) => f.key === key)
        if (existing) {
          const values = Array.isArray(existing.value)
            ? existing.value
            : [existing.value]
          setActiveFilters([
            ...activeFilters.filter((f) => f.key !== key),
            { key, value: [...values, value] },
          ])
        } else {
          setActiveFilters([...activeFilters, { key, value: [value] }])
        }
      } else {
        setActiveFilters([
          ...activeFilters.filter((f) => f.key !== key),
          { key, value },
        ])
      }
    }

    return (
      <div className="w-[300px]">
        <FilterSelect
          filters={filters}
          activeFilters={activeFilters}
          onSelect={handleSelect}
          onRemove={(key, value) => {
            setActiveFilters(
              activeFilters.filter((f) => !(f.key === key && f.value === value))
            )
          }}
        />
      </div>
    )
  },
}

export const WithAISupport: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([])

    return (
      <div className="w-[300px]">
        <FilterSelect
          filters={filters}
          activeFilters={activeFilters}
          askAI
          onSelect={(key, value) => {
            if (key === 'ai') {
              console.log('AI Query:', value)
            } else {
              setActiveFilters([...activeFilters, { key, value }])
            }
          }}
          onRemove={(key, value) => {
            setActiveFilters(
              activeFilters.filter((f) => !(f.key === key && f.value === value))
            )
          }}
        />
      </div>
    )
  },
}

export const WithCustomEmptyState: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([])

    return (
      <div className="w-[300px]">
        <FilterSelect
          filters={filters}
          activeFilters={activeFilters}
          onSelect={(key, value) =>
            setActiveFilters([...activeFilters, { key, value }])
          }
          onRemove={(key, value) => {
            setActiveFilters(
              activeFilters.filter((f) => !(f.key === key && f.value === value))
            )
          }}
          emptyState={{
            default: 'Try searching for something else',
            status: 'No matching status found',
            assignee: 'No matching users found',
          }}
        />
      </div>
    )
  },
}

export const WithCustomChildren: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([])

    return (
      <div className="w-[300px]">
        <FilterSelect
          filters={filters}
          activeFilters={activeFilters}
          onSelect={(key, value) =>
            setActiveFilters([...activeFilters, { key, value }])
          }
          onRemove={(key, value) => {
            setActiveFilters(
              activeFilters.filter((f) => !(f.key === key && f.value === value))
            )
          }}
        >
          Click to filter results
        </FilterSelect>
      </div>
    )
  },
}
