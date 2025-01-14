import type { Meta, StoryObj } from '@storybook/react'
import { Code, Link, Mail, Share } from 'lucide-react'

import { CopyButton } from './copy-button'

const meta: Meta<typeof CopyButton> = {
  title: 'Components/CopyButton',
  component: CopyButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component for copying text to clipboard.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CopyButton>

export const Default: Story = {
  render: () => <CopyButton value="Text to copy" />,
}

export const WithCustomIcon: Story = {
  render: () => <CopyButton value="Text to copy" icon={Share} />,
}

export const WithSuccessMessage: Story = {
  render: () => (
    <CopyButton
      value="Custom success message"
      successMessage="Custom message copied!"
    />
  ),
}

export const NeutralVariant: Story = {
  render: () => <CopyButton value="Neutral variant" variant="neutral" />,
}

export const WithCustomClass: Story = {
  render: () => (
    <CopyButton
      value="Custom styled"
      className="bg-blue-100 hover:bg-blue-200"
    />
  ),
}

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex space-x-4">
      <CopyButton value="Link" icon={Link} />
      <CopyButton value="Code" icon={Code} />
      <CopyButton value="Email" icon={Mail} />
    </div>
  ),
}

export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Copy this text:</span>
      <CopyButton value="Inline text" />
    </div>
  ),
}

export const WithLongText: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <span className="max-w-xs truncate text-sm">
        This is a very long text that will be copied when clicking the button
      </span>
      <CopyButton value="This is a very long text that will be copied when clicking the button" />
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">API Key</span>
        <CopyButton value="sk_test_123456789" />
      </div>
      <div className="mt-1 font-mono text-sm text-gray-500">
        sk_test_123456789
      </div>
    </div>
  ),
}

export const MultipleButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
        <span className="text-sm">Public Key</span>
        <CopyButton value="pk_123456789" />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
        <span className="text-sm">Secret Key</span>
        <CopyButton value="sk_123456789" variant="neutral" />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
        <span className="text-sm">Webhook URL</span>
        <CopyButton value="https://api.example.com/webhook" icon={Link} />
      </div>
    </div>
  ),
}
