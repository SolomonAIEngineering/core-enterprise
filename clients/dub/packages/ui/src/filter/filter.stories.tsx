import type { StoryObj } from '@storybook/react'
import { Calendar, ListFilter, Mail, User } from 'lucide-react'
import type { Filter, FilterOption } from './types'

import { useState } from 'react'
import { FilterList } from './filter-list'
import { FilterSelect } from './filter-select'

const meta = {
  title: 'Components/Filter',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A powerful filtering system with two main components:
- FilterSelect: A dropdown menu for selecting filters and their values
- FilterList: A list of active filters with remove functionality

## Features
- Multiple filter types support
- Single and multiple selection modes
- Search functionality
- Keyboard shortcuts
- AI-powered filtering (optional)
- Custom icons and styling
- Responsive design
- Accessible keyboard navigation
                `,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta

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
      { label: 'Custom range', value: 'custom' },
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

// FilterSelect Stories
type FilterSelectStory = StoryObj<typeof FilterSelect>

export const BasicFilterSelect: FilterSelectStory = {
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

    const handleRemove = (key: string, value: FilterOption['value']) => {
      const filter = filters.find((f) => f.key === key)
      if (filter?.multiple) {
        const existing = activeFilters.find((f) => f.key === key)
        if (existing && Array.isArray(existing.value)) {
          const values = existing.value.filter((v) => v !== value)
          if (values.length === 0) {
            setActiveFilters(activeFilters.filter((f) => f.key !== key))
          } else {
            setActiveFilters([
              ...activeFilters.filter((f) => f.key !== key),
              { key, value: values },
            ])
          }
        }
      } else {
        setActiveFilters(activeFilters.filter((f) => f.key !== key))
      }
    }

    return (
      <div className="w-[600px]">
        <FilterSelect
          filters={filters}
          activeFilters={activeFilters}
          onSelect={handleSelect}
          onRemove={handleRemove}
        />
      </div>
    )
  },
}

export const WithAISupport: FilterSelectStory = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([])

    return (
      <div className="w-[600px]">
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

// FilterList Stories
type FilterListStory = StoryObj<typeof FilterList>

export const BasicFilterList: FilterListStory = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<
      Array<{ key: string; value: FilterOption['value'] }>
    >([
      { key: 'status', value: 'active' },
      { key: 'assignee', value: ['john', 'jane'] },
    ])

    return (
      <div className="w-[800px]">
        <FilterList
          filters={filters}
          activeFilters={activeFilters}
          onRemove={(key, value) => {
            setActiveFilters(
              activeFilters.filter((f) => !(f.key === key && f.value === value))
            )
          }}
          onRemoveAll={() => setActiveFilters([])}
        />
      </div>
    )
  },
}

export const EmptyFilterList: FilterListStory = {
  render: () => (
    <div className="w-[800px]">
      <FilterList
        filters={filters}
        activeFilters={[]}
        onRemove={() => {}}
        onRemoveAll={() => {}}
      />
    </div>
  ),
}

export const LoadingFilterList: FilterListStory = {
  render: () => (
    <div className="w-[800px]">
      <FilterList
        filters={filters}
        activeFilters={[
          { key: 'loader', value: '1' },
          { key: 'loader', value: '2' },
        ]}
        onRemove={() => {}}
        onRemoveAll={() => {}}
      />
    </div>
  ),
}
