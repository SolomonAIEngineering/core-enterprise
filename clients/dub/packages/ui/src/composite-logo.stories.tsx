import type { Meta, StoryObj } from '@storybook/react'

import { CompositeLogo } from './composite-logo'

const meta: Meta<typeof CompositeLogo> = {
  title: 'Components/CompositeLogo',
  component: CompositeLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A composite logo component with various styling options.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CompositeLogo>

export const Default: Story = {
  render: () => <CompositeLogo />,
}

export const CustomSize: Story = {
  render: () => <CompositeLogo className="h-8" />,
}

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-8">
      <CompositeLogo />
    </div>
  ),
}

export const WithBackground: Story = {
  render: () => (
    <div className="rounded-lg bg-gray-100 p-8">
      <CompositeLogo />
    </div>
  ),
}

export const Large: Story = {
  render: () => <CompositeLogo className="h-12" />,
}

export const Small: Story = {
  render: () => <CompositeLogo className="h-4" />,
}

export const CustomColor: Story = {
  render: () => <CompositeLogo className="text-blue-500" />,
}

export const WithGradient: Story = {
  render: () => (
    <CompositeLogo className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent" />
  ),
}

export const InContainer: Story = {
  render: () => (
    <div className="flex h-16 w-64 items-center justify-center rounded-lg border border-gray-200">
      <CompositeLogo />
    </div>
  ),
}

export const Responsive: Story = {
  render: () => <CompositeLogo className="h-4 sm:h-6 md:h-8 lg:h-10" />,
}
