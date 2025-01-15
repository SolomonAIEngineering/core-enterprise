import type { Meta, StoryObj } from '@storybook/react'

import { Badge } from './badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A badge component for displaying status, labels, or counts.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: () => <Badge>Default Badge</Badge>,
}

export const Violet: Story = {
  render: () => <Badge variant="violet">Violet Badge</Badge>,
}

export const Blue: Story = {
  render: () => <Badge variant="blue">Blue Badge</Badge>,
}

export const Sky: Story = {
  render: () => <Badge variant="sky">Sky Badge</Badge>,
}

export const Black: Story = {
  render: () => <Badge variant="black">Black Badge</Badge>,
}

export const Gray: Story = {
  render: () => <Badge variant="gray">Gray Badge</Badge>,
}

export const Neutral: Story = {
  render: () => <Badge variant="neutral">Neutral Badge</Badge>,
}

export const BlueGradient: Story = {
  render: () => <Badge variant="blueGradient">Blue Gradient Badge</Badge>,
}

export const Rainbow: Story = {
  render: () => <Badge variant="rainbow">Rainbow Badge</Badge>,
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="violet">Violet</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="sky">Sky</Badge>
      <Badge variant="black">Black</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="blueGradient">Blue Gradient</Badge>
      <Badge variant="rainbow">Rainbow</Badge>
    </div>
  ),
}
