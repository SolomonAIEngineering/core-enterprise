import type { Meta, StoryObj } from '@storybook/react'

import { Trigger } from './trigger'

const meta = {
  title: 'Components/DateTrigger',
  component: Trigger,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A button component designed for date picker inputs with various states and styling options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
    },
    hasError: {
      control: 'boolean',
      description: 'Show error state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the trigger',
    },
  },
} satisfies Meta<typeof Trigger>

export default meta
type Story = StoryObj<typeof Trigger>

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Trigger placeholder="Select date..." />
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="w-[300px]">
      <Trigger>January 1, 2024</Trigger>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-[300px]">
      <Trigger hasError placeholder="Select date..." />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="w-[300px]">
      <Trigger disabled placeholder="Select date..." />
    </div>
  ),
}

export const WithCustomClassName: Story = {
  render: () => (
    <div className="w-[300px]">
      <Trigger
        className="border-blue-500 focus-visible:border-blue-600"
        placeholder="Custom styled trigger"
      />
    </div>
  ),
}
