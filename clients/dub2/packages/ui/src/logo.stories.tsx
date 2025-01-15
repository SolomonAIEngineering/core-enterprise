import type { Meta, StoryObj } from '@storybook/react'

import { Logo } from './logo'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile logo component with various size and style options.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  render: () => <Logo />,
}

export const WithCustomSize: Story = {
  render: () => <Logo className="h-16 w-16" />,
}

export const WithBackground: Story = {
  render: () => (
    <div className="rounded-lg bg-gray-100 p-4">
      <Logo />
    </div>
  ),
}

export const WithGradientBackground: Story = {
  render: () => (
    <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-4">
      <Logo className="text-white" />
    </div>
  ),
}

export const WithCustomColor: Story = {
  render: () => <Logo className="text-blue-500" />,
}

export const WithAnimation: Story = {
  render: () => (
    <Logo className="cursor-pointer transition-transform hover:scale-110" />
  ),
}

export const WithShadow: Story = {
  render: () => <Logo className="drop-shadow-lg" />,
}

export const WithBorder: Story = {
  render: () => <Logo className="rounded-lg border-2 border-gray-200 p-2" />,
}

export const WithTooltip: Story = {
  render: () => (
    <div className="group relative inline-block">
      <Logo />
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white">
          Company Logo
        </div>
      </div>
    </div>
  ),
}

export const Responsive: Story = {
  render: () => (
    <Logo className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
  ),
}
