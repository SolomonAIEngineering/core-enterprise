import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertCircle,
  Box,
  ShoppingCart as CartIcon,
  Database as DatabaseIcon,
  FileQuestion,
  Image,
  Inbox,
  Search,
  Settings as SettingsIcon,
  Users as UsersIcon,
} from 'lucide-react'

import { EmptyState } from './empty-state'

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An empty state component for displaying when there is no content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  render: () => (
    <EmptyState
      icon={Box}
      title="No items found"
      description="There are no items to display at this time."
    />
  ),
}

export const WithLearnMore: Story = {
  render: () => (
    <EmptyState
      icon={FileQuestion}
      title="No documents"
      description="Get started by creating your first document."
      learnMore="https://example.com/docs"
    />
  ),
}

export const WithCustomButton: Story = {
  render: () => (
    <EmptyState
      icon={Inbox}
      title="Empty inbox"
      description="You've processed all your messages."
    >
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
      >
        Refresh inbox
      </button>
    </EmptyState>
  ),
}

export const SearchResults: Story = {
  render: () => (
    <EmptyState
      icon={Search}
      title="No results found"
      description="Try adjusting your search terms or filters to find what you're looking for."
    />
  ),
}

export const SettingsExample: Story = {
  render: () => (
    <EmptyState
      icon={SettingsIcon}
      title="No settings available"
      description="There are no configurable settings for this feature yet."
      learnMore="https://example.com/settings"
    />
  ),
}

export const ShoppingCartExample: Story = {
  render: () => (
    <EmptyState
      icon={CartIcon}
      title="Your cart is empty"
      description="Browse our products and add items to your cart."
    >
      <button
        type="button"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
      >
        Start shopping
      </button>
    </EmptyState>
  ),
}

export const UsersExample: Story = {
  render: () => (
    <EmptyState
      icon={UsersIcon}
      title="No team members"
      description="Start building your team by inviting members."
    >
      <button
        type="button"
        className="mt-4 rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
      >
        Invite members
      </button>
    </EmptyState>
  ),
}

export const ErrorExample: Story = {
  render: () => (
    <EmptyState
      icon={AlertCircle}
      title="Something went wrong"
      description="We encountered an error while loading your data. Please try again later."
    >
      <button
        type="button"
        className="mt-4 rounded-md bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
      >
        Try again
      </button>
    </EmptyState>
  ),
}

export const DatabaseExample: Story = {
  render: () => (
    <EmptyState
      icon={DatabaseIcon}
      title="No data available"
      description="Connect your database to start seeing your data."
      learnMore="https://example.com/connect-db"
    >
      <div className="mt-4 space-x-3">
        <button
          type="button"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
        >
          Connect database
        </button>
        <button
          type="button"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
        >
          View documentation
        </button>
      </div>
    </EmptyState>
  ),
}

export const Gallery: Story = {
  render: () => (
    <EmptyState
      icon={Image}
      title="No images uploaded"
      description="Upload images to start building your gallery."
    >
      <div className="mt-4">
        <label className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
          Upload images
          <input type="file" className="hidden" accept="image/*" multiple />
        </label>
      </div>
    </EmptyState>
  ),
}
