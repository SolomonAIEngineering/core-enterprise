import type { Meta, StoryObj } from '@storybook/react'
import { Check, Code, Copy, Terminal } from 'lucide-react'

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
    <InlineSnippet icon={<Terminal className="h-4 w-4" />}>
      git clone https://github.com/user/repo.git
    </InlineSnippet>
  ),
}

export const WithCopyButton: Story = {
  render: () => (
    <InlineSnippet
      copyButton={{
        defaultIcon: <Copy className="h-4 w-4" />,
        successIcon: <Check className="h-4 w-4" />,
        successDuration: 2000,
      }}
    >
      echo "Hello, World!"
    </InlineSnippet>
  ),
}

export const WithCustomStyling: Story = {
  render: () => (
    <InlineSnippet className="border-blue-200 bg-blue-50 text-blue-700">
      const greeting = 'Hello, World!';
    </InlineSnippet>
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
    <InlineSnippet
      prefix={<Code className="h-4 w-4 text-gray-400" />}
      language="javascript"
    >
      console.log('Hello from JavaScript!');
    </InlineSnippet>
  ),
}

export const WithCustomTooltip: Story = {
  render: () => (
    <InlineSnippet
      copyButton={{
        tooltip: 'Copy to clipboard',
        successTooltip: 'Copied!',
      }}
    >
      SELECT * FROM users WHERE active = true;
    </InlineSnippet>
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
    <InlineSnippet
      className="border-red-200 bg-red-50 text-red-700"
      icon={<Terminal className="h-4 w-4 text-red-500" />}
    >
      Error: Command failed with exit code 1
    </InlineSnippet>
  ),
}

export const WithSuccess: Story = {
  render: () => (
    <InlineSnippet
      className="border-green-200 bg-green-50 text-green-700"
      icon={<Check className="h-4 w-4 text-green-500" />}
    >
      Build completed successfully in 2.3s
    </InlineSnippet>
  ),
}
