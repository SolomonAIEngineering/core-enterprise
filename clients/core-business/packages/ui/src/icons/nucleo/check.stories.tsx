import type { Meta, StoryObj } from '@storybook/react'

import { Check } from './check'

const meta: Meta<typeof Check> = {
  title: 'Icons/Check',
  component: Check,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A check mark icon component.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Check>

export const Default: Story = {
  render: () => <Check />,
}

export const CustomSize: Story = {
  render: () => <Check width={32} height={32} />,
}

export const CustomColor: Story = {
  render: () => <Check className="text-blue-500" />,
}

export const WithBackground: Story = {
  render: () => (
    <div className="rounded-full bg-green-100 p-2">
      <Check className="text-green-600" />
    </div>
  ),
}

export const Animated: Story = {
  render: () => <Check className="animate-bounce text-green-500" />,
}

export const SizeVariants: Story = {
  render: () => (
    <div className="flex items-end space-x-4">
      <Check width={12} height={12} className="text-gray-600" />
      <Check width={18} height={18} className="text-gray-600" />
      <Check width={24} height={24} className="text-gray-600" />
      <Check width={32} height={32} className="text-gray-600" />
    </div>
  ),
}

export const ColorVariants: Story = {
  render: () => (
    <div className="flex space-x-4">
      <Check className="text-blue-500" />
      <Check className="text-green-500" />
      <Check className="text-red-500" />
      <Check className="text-yellow-500" />
      <Check className="text-purple-500" />
    </div>
  ),
}

export const WithCircle: Story = {
  render: () => (
    <div className="flex space-x-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
        <Check className="text-blue-600" width={16} height={16} />
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
        <Check className="text-green-600" width={16} height={16} />
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
        <Check className="text-red-600" width={16} height={16} />
      </div>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Check className="text-green-500" />
      <span className="text-sm font-medium text-gray-700">Task completed</span>
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <div className="space-y-2">
      <button
        type="button"
        className="inline-flex items-center space-x-2 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
      >
        <Check width={16} height={16} />
        <span>Confirm</span>
      </button>
      <button
        type="button"
        className="inline-flex items-center space-x-2 rounded border border-gray-300 px-4 py-2 hover:bg-gray-50"
      >
        <Check width={16} height={16} className="text-gray-500" />
        <span>Select</span>
      </button>
    </div>
  ),
}
