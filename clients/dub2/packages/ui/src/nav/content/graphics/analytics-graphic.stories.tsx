import type { Meta, StoryObj } from '@storybook/react'
import { AnalyticsGraphic } from './analytics-graphic'

const meta = {
  component: AnalyticsGraphic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalyticsGraphic>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomSize: Story = {
  args: {
    width: '500',
    height: '400',
  },
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    className: 'dark',
  },
}
