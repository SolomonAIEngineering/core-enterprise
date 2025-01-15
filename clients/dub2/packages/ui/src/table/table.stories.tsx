import type { Meta, StoryObj } from '@storybook/react'
import {
  createColumnHelper,
  type PaginationState,
  type VisibilityState,
} from '@tanstack/react-table'
import React from 'react'
import { Table, useTable } from './table'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = Omit<StoryObj<typeof meta>, 'args'>

// Example data types
type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'guest'
  status: 'active' | 'inactive'
  lastLogin: string
  actions: string[]
}

const userData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-03-20T10:00:00',
    actions: ['edit', 'delete'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    lastLogin: '2024-03-19T15:30:00',
    actions: ['edit'],
  },
  {
    id: '3',
    name: 'Guest User',
    email: 'guest@example.com',
    role: 'guest',
    status: 'inactive',
    lastLogin: '2024-03-15T09:15:00',
    actions: [],
  },
]

const columnHelper = createColumnHelper<User>()

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <div className="font-medium text-gray-900">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => <div className="text-gray-500">{info.getValue()}</div>,
  }),
  columnHelper.accessor('role', {
    header: 'Role',
    cell: (info) => {
      const roleColors = {
        admin: 'bg-purple-100 text-purple-800',
        user: 'bg-blue-100 text-blue-800',
        guest: 'bg-gray-100 text-gray-800',
      }
      return (
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${roleColors[info.getValue()]}`}
        >
          {info.getValue()}
        </span>
      )
    },
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
          info.getValue() === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor('lastLogin', {
    header: 'Last Login',
    cell: (info) => (
      <div className="text-gray-500">
        {new Date(info.getValue()).toLocaleDateString()}
      </div>
    ),
  }),
  columnHelper.accessor('actions', {
    header: 'Actions',
    cell: (info) => (
      <div className="flex gap-2">
        {info.getValue().map((action) => (
          <button
            type="button"
            key={action}
            className="text-xs text-blue-600 hover:text-blue-800"
            onClick={() =>
              console.log(`${action} clicked for ${info.row.original.name}`)
            }
          >
            {action}
          </button>
        ))}
      </div>
    ),
  }),
]

// Basic Table with Styling
export const BasicStyled: Story = {
  render: () => {
    const tableInstance = useTable({
      data: userData,
      columns,
      containerClassName: 'shadow-sm',
    })
    return <Table {...tableInstance} />
  },
}

// Interactive Table with Row Click
export const Interactive: Story = {
  render: () => {
    const tableInstance = useTable({
      data: userData,
      columns,
      onRowClick: (row) => {
        console.log('Row clicked:', row.original)
      },
    })
    return <Table {...tableInstance} />
  },
}
// Sortable and Paginated
export const SortableAndPaginated: Story = {
  render: () => {
    const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 0, // Start at first page (0-based index)
      pageSize: 2,
    })

    const tableInstance = useTable({
      data: userData,
      columns,
      pagination,
      onPaginationChange: setPagination,
      rowCount: userData.length,
      sortableColumns: ['name', 'email', 'lastLogin'],
      onSortChange: ({ sortBy, sortOrder }) => {
        console.log('Sort changed:', { sortBy, sortOrder })
      },
    })

    return <Table {...tableInstance} />
  },
}

// Custom Column Visibility
export const CustomColumns: Story = {
  render: () => {
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({
        email: false,
        role: true,
        status: true,
        lastLogin: false,
      })

    const tableInstance = useTable({
      data: userData,
      columns,
      columnVisibility,
      onColumnVisibilityChange: (visibility) => setColumnVisibility(visibility),
    })

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {Object.keys(columnVisibility).map((column) => (
            <button
              type="button"
              key={column}
              className={`rounded px-3 py-1 text-sm ${
                columnVisibility[column]
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() =>
                setColumnVisibility((prev) => ({
                  ...prev,
                  [column]: !prev[column],
                }))
              }
            >
              {column}
            </button>
          ))}
        </div>
        <Table {...tableInstance} />
      </div>
    )
  },
}

// Loading State with Custom Empty State
export const LoadingAndEmpty: Story = {
  render: () => {
    const tableInstance = useTable({
      data: [],
      columns,
      loading: true,
      emptyState: (
        <div className="p-8 text-center">
          <div className="text-lg text-gray-500">No users found</div>
          <button
            type="button"
            onClick={() => console.log('Add User clicked')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
          >
            Add User
          </button>
        </div>
      ),
    })

    return <Table {...tableInstance} />
  },
}
