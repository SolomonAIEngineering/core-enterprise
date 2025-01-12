import type { Meta, StoryObj } from '@storybook/react'

import { NavWordmark } from './nav-wordmark'

const meta: Meta<typeof NavWordmark> = {
  title: 'Components/NavWordmark',
  component: NavWordmark,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A navigation wordmark component with logo and context menu functionality.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NavWordmark>

export const Default: Story = {
  render: () => (
    <div className="p-4">
      <NavWordmark />
    </div>
  ),
}

export const SymbolOnly: Story = {
  render: () => (
    <div className="p-4">
      <NavWordmark variant="symbol" />
    </div>
  ),
}

export const InApp: Story = {
  render: () => (
    <div className="p-4">
      <NavWordmark isInApp />
    </div>
  ),
}

export const WithCustomClass: Story = {
  render: () => (
    <div className="p-4">
      <NavWordmark className="text-blue-500" />
    </div>
  ),
}

export const InAppSymbol: Story = {
  render: () => (
    <div className="p-4">
      <NavWordmark variant="symbol" isInApp />
    </div>
  ),
}

export const WithDarkBackground: Story = {
  render: () => (
    <div className="bg-gray-900 p-8">
      <NavWordmark className="text-white" />
    </div>
  ),
}

export const WithGradientBackground: Story = {
  render: () => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-8">
      <NavWordmark className="text-white" />
    </div>
  ),
}

export const WithCustomSize: Story = {
  render: () => (
    <div className="p-4">
      <NavWordmark className="scale-150" />
    </div>
  ),
}

export const WithHoverEffect: Story = {
  render: () => (
    <div className="p-4">
      <NavWordmark className="transition-transform hover:scale-105" />
    </div>
  ),
}

export const WithContainer: Story = {
  render: () => (
    <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
      <NavWordmark />
    </div>
  ),
}
