import type { Meta, StoryObj } from '@storybook/react'

import { Wordmark } from './wordmark'

// Define the meta properly with correct typing
const meta: Meta<typeof Wordmark> = {
  title: 'Components/Wordmark',
  component: Wordmark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

// Make sure to export meta as default
export default meta

// Define Story type
type Story = StoryObj<typeof Wordmark>

// Export individual stories
export const Default: Story = {
  args: {},
}

export const CustomClassName: Story = {
  args: {
    className: 'h-12 w-auto text-blue-500',
  },
}

export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
}

export const LightMode: Story = {
  args: {},
  parameters: {
    backgrounds: {
      default: 'light',
    },
  },
}
