import type { Meta, StoryObj } from '@storybook/react'
import { LinksGraphic } from './links-graphic'

const meta = {
  component: LinksGraphic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinksGraphic>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const CustomSize: Story = {
  args: {
    width: '500',
    height: '500',
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
