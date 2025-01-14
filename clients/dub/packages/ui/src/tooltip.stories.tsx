import type { Meta, StoryObj } from '@storybook/react'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import { Button } from './button'
import { Tooltip } from './tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tooltip component that provides additional information on hover.',
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Tooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
    </div>
  ),
}

export const WithDelay: Story = {
  render: () => (
    <Tooltip content="This tooltip has a custom delay" disableHoverableContent>
      <Button variant="outline">Hover me (with delay)</Button>
    </Tooltip>
  ),
}

export const WithHTML: Story = {
  render: () => (
    <Tooltip
      content={
        <div className="text-sm">
          <p className="font-medium">Custom HTML Content</p>
          <p className="text-gray-500">With multiple lines of text</p>
        </div>
      }
    >
      <Button variant="outline">Hover for rich content</Button>
    </Tooltip>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <Tooltip
      content="Custom styled tooltip"
      contentClassName="bg-purple-500 text-white"
    >
      <Button variant="outline">Hover for custom style</Button>
    </Tooltip>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Tooltip content="Settings">
      <Button variant="secondary" aria-label="Settings">
        <span className="i-lucide-settings" />
      </Button>
    </Tooltip>
  ),
}

export const WithDisabledButton: Story = {
  render: () => (
    <Tooltip content="This button is disabled">
      <button
        type="button"
        className="cursor-not-allowed"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
          }
        }}
        onClick={(e) => e.preventDefault()}
      >
        <Button variant="outline" disabled>
          Disabled Button
        </Button>
      </button>
    </Tooltip>
  ),
}

export const WithLongContent: Story = {
  render: () => (
    <Tooltip
      content="This is a very long tooltip content that will wrap to multiple lines when it exceeds the maximum width of the tooltip container."
      contentClassName="max-w-xs"
    >
      <Button variant="outline">Hover for long content</Button>
    </Tooltip>
  ),
}

export const InContext: Story = {
  render: () => (
    <div className="w-96 space-y-4 rounded-xl bg-white p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Project Settings</h3>
        <Tooltip content="Project configuration options">
          <Button variant="secondary" aria-label="Project settings info">
            <span className="i-lucide-info" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">Save Changes</Button>
        <Tooltip content="Discard all changes">
          <Button variant="secondary" aria-label="Discard changes">
            <span className="i-lucide-trash-2" />
          </Button>
        </Tooltip>
      </div>
    </div>
  ),
}
