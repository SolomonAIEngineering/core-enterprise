import type { Meta, StoryObj } from '@storybook/react'

import { ShimmerDots } from './shimmer-dots'

const meta: Meta<typeof ShimmerDots> = {
  title: 'Components/ShimmerDots',
  component: ShimmerDots,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A shimmer dots animation component using WebGL for smooth performance.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ShimmerDots>

export const Default: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gray-100">
      <ShimmerDots />
    </div>
  ),
}

export const WithCustomSize: Story = {
  render: () => (
    <div className="relative h-48 w-96 rounded-lg bg-gray-100">
      <ShimmerDots dotSize={2} cellSize={4} />
    </div>
  ),
}

export const WithCustomSpeed: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gray-100">
      <ShimmerDots speed={10} />
    </div>
  ),
}

export const WithDarkBackground: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gray-900">
      <ShimmerDots className="opacity-20" />
    </div>
  ),
}

export const WithGradientBackground: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
      <ShimmerDots className="opacity-30" />
    </div>
  ),
}

export const SmallDots: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gray-100">
      <ShimmerDots dotSize={0.5} cellSize={2} />
    </div>
  ),
}

export const LargeDots: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gray-100">
      <ShimmerDots dotSize={3} cellSize={6} />
    </div>
  ),
}

export const SlowAnimation: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gray-100">
      <ShimmerDots speed={2} />
    </div>
  ),
}

export const FastAnimation: Story = {
  render: () => (
    <div className="relative h-64 w-64 rounded-lg bg-gray-100">
      <ShimmerDots speed={15} />
    </div>
  ),
}

export const WithCard: Story = {
  render: () => (
    <div className="relative w-96 rounded-xl bg-white p-6 shadow-lg">
      <h3 className="mb-4 text-lg font-medium">Loading Card</h3>
      <div className="relative h-32 rounded-lg bg-gray-100">
        <ShimmerDots dotSize={1.5} cellSize={4} speed={7} />
      </div>
      <p className="mt-4 text-gray-600">Content loading...</p>
    </div>
  ),
}
