import type { Meta, StoryObj } from '@storybook/react'

import { InlineSnippet } from './inline-snippet'

const meta: Meta<typeof InlineSnippet> = {
  title: 'Components/InlineSnippet',
  component: InlineSnippet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An inline code snippet component with copy functionality.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InlineSnippet>

export const Default: Story = {
  render: () => <InlineSnippet>npm install @package/name</InlineSnippet>,
}

export const WithCustomIcon: Story = {
  render: () => (
    <InlineSnippet>git clone https://github.com/user/repo.git</InlineSnippet>
  ),
}

export const WithCopyButton: Story = {
  render: () => <InlineSnippet>echo "Hello, World!"</InlineSnippet>,
}

export const WithCustomStyling: Story = {
  render: () => (
    <InlineSnippet>const greeting = 'Hello, World!';</InlineSnippet>
  ),
}

export const WithLongContent: Story = {
  render: () => (
    <div className="max-w-2xl">
      <InlineSnippet>
        {`export const someFunction = (param1: string, param2: number): boolean => {
                    return param1.length > param2;
                }`}
      </InlineSnippet>
    </div>
  ),
}

export const WithLanguageIndicator: Story = {
  render: () => (
    <InlineSnippet>console.log('Hello from JavaScript!');</InlineSnippet>
  ),
}

export const WithCustomTooltip: Story = {
  render: () => (
    <InlineSnippet>SELECT * FROM users WHERE active = true;</InlineSnippet>
  ),
}

export const InParagraph: Story = {
  render: () => (
    <p className="max-w-2xl text-gray-600">
      To install the package, run <InlineSnippet>npm install</InlineSnippet> in
      your terminal. For development, you might want to use{' '}
      <InlineSnippet>npm install --save-dev</InlineSnippet> instead.
    </p>
  ),
}

export const WithError: Story = {
  render: () => (
    <InlineSnippet>Error: Command failed with exit code 1</InlineSnippet>
  ),
}

export const WithSuccess: Story = {
  render: () => (
    <InlineSnippet>Build completed successfully in 2.3s</InlineSnippet>
  ),
}
