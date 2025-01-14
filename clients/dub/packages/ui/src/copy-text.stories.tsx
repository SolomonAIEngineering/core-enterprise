import type { Meta, StoryObj } from '@storybook/react'

import { CopyText } from './copy-text'

const meta: Meta<typeof CopyText> = {
  title: 'Components/CopyText',
  component: CopyText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A text component that copies its content to clipboard when clicked.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CopyText>

export const Default: Story = {
  render: () => <CopyText value="Text to copy">Click to copy</CopyText>,
}

export const WithCustomSuccessMessage: Story = {
  render: () => (
    <CopyText
      value="Custom success message"
      successMessage="Text copied successfully!"
    >
      Copy with custom message
    </CopyText>
  ),
}

export const WithCustomStyling: Story = {
  render: () => (
    <CopyText value="Styled text" className="text-blue-500 hover:text-blue-700">
      Custom styled copy text
    </CopyText>
  ),
}

export const WithLongText: Story = {
  render: () => (
    <CopyText value="This is a very long text that will be copied to the clipboard when clicked">
      This is a very long text that will be copied...
    </CopyText>
  ),
}

export const InParagraph: Story = {
  render: () => (
    <p className="max-w-md text-gray-600">
      This is a paragraph with some{' '}
      <CopyText value="copyable text">copyable text</CopyText> that can be
      clicked to copy.
    </p>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex items-center space-x-1">
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <title>Copy icon</title>
        <path
          fill="currentColor"
          d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
        />
      </svg>
      <CopyText value="Copy with icon">Copy text</CopyText>
    </div>
  ),
}

export const AsCode: Story = {
  render: () => (
    <CopyText
      value="npm install @package/name"
      className="rounded bg-gray-100 px-2 py-1 font-mono"
    >
      npm install @package/name
    </CopyText>
  ),
}

export const InList: Story = {
  render: () => (
    <ul className="space-y-2">
      <li>
        <CopyText value="First item">• First copyable item</CopyText>
      </li>
      <li>
        <CopyText value="Second item">• Second copyable item</CopyText>
      </li>
      <li>
        <CopyText value="Third item">• Third copyable item</CopyText>
      </li>
    </ul>
  ),
}

export const WithTooltip: Story = {
  render: () => (
    <div className="group relative">
      <CopyText value="Hover to see tooltip">Hover over me</CopyText>
      <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block">
        Click to copy
      </div>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div className="rounded-lg border border-gray-200 p-4">
      <h3 className="mb-2 text-sm font-medium">API Credentials</h3>
      <div className="space-y-2">
        <div>
          <span className="text-xs text-gray-500">API Key:</span>
          <CopyText
            value="sk_test_123456789"
            className="ml-2 font-mono text-sm"
          >
            sk_test_123456789
          </CopyText>
        </div>
        <div>
          <span className="text-xs text-gray-500">API Secret:</span>
          <CopyText
            value="sk_secret_987654321"
            className="ml-2 font-mono text-sm"
          >
            sk_secret_987654321
          </CopyText>
        </div>
      </div>
    </div>
  ),
}
