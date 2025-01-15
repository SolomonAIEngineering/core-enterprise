import type { Meta, StoryObj } from '@storybook/react'

import { ProgressBar } from './progress-bar'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A progress bar component with smooth animations and customizable styles.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar value={50} />
    </div>
  ),
}

export const WithCustomValue: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar value={75} max={100} />
    </div>
  ),
}

export const Completed: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar value={100} max={100} />
    </div>
  ),
}

export const Exceeded: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar value={120} max={100} />
    </div>
  ),
}

export const WithCustomStyles: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar
        value={60}
        className="h-2 bg-gray-100 [&>div]:bg-purple-500"
      />
    </div>
  ),
}

export const WithGradient: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar
        value={80}
        className="h-2 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-500"
      />
    </div>
  ),
}

export const Thin: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar value={40} className="h-1" />
    </div>
  ),
}

export const Thick: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar value={60} className="h-4" />
    </div>
  ),
}

export const WithRoundedEnds: Story = {
  render: () => (
    <div className="w-64">
      <ProgressBar
        value={70}
        className="h-3 rounded-full [&>div]:rounded-full"
      />
    </div>
  ),
}

export const WithCustomWidth: Story = {
  render: () => (
    <div className="w-96">
      <ProgressBar value={85} className="h-3" />
    </div>
  ),
}
