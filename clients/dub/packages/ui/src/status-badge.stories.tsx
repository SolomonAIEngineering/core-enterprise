import type { Meta, StoryObj } from '@storybook/react'
import { CircleCheck, CircleWarning } from './icons'

import { StatusBadge } from './status-badge'

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A status badge component with various styles and icon support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof StatusBadge>

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge>Default Status</StatusBadge>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge variant="neutral">Neutral Status</StatusBadge>
      <StatusBadge variant="new">New Status</StatusBadge>
      <StatusBadge variant="success">Success Status</StatusBadge>
      <StatusBadge variant="pending">Pending Status</StatusBadge>
      <StatusBadge variant="warning">Warning Status</StatusBadge>
      <StatusBadge variant="error">Error Status</StatusBadge>
    </div>
  ),
}

export const WithCustomIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge variant="success" icon={CircleCheck}>
        Custom Success Icon
      </StatusBadge>
      <StatusBadge variant="warning" icon={CircleWarning}>
        Custom Warning Icon
      </StatusBadge>
      <StatusBadge variant="error" icon={CircleWarning}>
        Custom Error Icon
      </StatusBadge>
    </div>
  ),
}

export const WithoutIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge variant="success" icon={null}>
        No Icon Success
      </StatusBadge>
      <StatusBadge variant="warning" icon={null}>
        No Icon Warning
      </StatusBadge>
      <StatusBadge variant="error" icon={null}>
        No Icon Error
      </StatusBadge>
    </div>
  ),
}

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge
        variant="success"
        onClick={() => console.log('Clicked success badge')}
      >
        Clickable Success
      </StatusBadge>
      <StatusBadge
        variant="warning"
        onClick={() => console.log('Clicked warning badge')}
      >
        Clickable Warning
      </StatusBadge>
      <StatusBadge
        variant="error"
        onClick={() => console.log('Clicked error badge')}
      >
        Clickable Error
      </StatusBadge>
    </div>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge variant="success" className="font-bold">
        Bold Success
      </StatusBadge>
      <StatusBadge variant="warning" className="uppercase tracking-wide">
        Uppercase Warning
      </StatusBadge>
      <StatusBadge variant="error" className="px-4 py-2">
        Large Error
      </StatusBadge>
    </div>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="w-96 space-y-4 rounded-xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Project Status</h3>
        <StatusBadge variant="success">Active</StatusBadge>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Deployment</h3>
        <StatusBadge variant="pending">In Progress</StatusBadge>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Security</h3>
        <StatusBadge variant="warning">Updates Available</StatusBadge>
      </div>
    </div>
  ),
}

export const WithLongText: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge variant="success">
        This is a very long status message that should wrap nicely
      </StatusBadge>
      <StatusBadge variant="warning">
        Another long status message with multiple words
      </StatusBadge>
    </div>
  ),
}

export const Compact: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge variant="success" className="px-1.5 py-0.5 text-xs">
        Compact Success
      </StatusBadge>
      <StatusBadge variant="warning" className="px-1.5 py-0.5 text-xs">
        Compact Warning
      </StatusBadge>
      <StatusBadge variant="error" className="px-1.5 py-0.5 text-xs">
        Compact Error
      </StatusBadge>
    </div>
  ),
}

export const WithGradients: Story = {
  render: () => (
    <div className="space-y-4">
      <StatusBadge
        variant="success"
        className="bg-gradient-to-r from-green-500/[.15] to-emerald-500/[.15]"
      >
        Gradient Success
      </StatusBadge>
      <StatusBadge
        variant="warning"
        className="bg-gradient-to-r from-yellow-500/[.15] to-orange-500/[.15]"
      >
        Gradient Warning
      </StatusBadge>
      <StatusBadge
        variant="error"
        className="bg-gradient-to-r from-red-500/[.15] to-rose-500/[.15]"
      >
        Gradient Error
      </StatusBadge>
    </div>
  ),
}
