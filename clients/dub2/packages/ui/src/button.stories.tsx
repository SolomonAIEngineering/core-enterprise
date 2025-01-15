import type { Meta, StoryObj } from '@storybook/react'
import { ArrowRight } from 'lucide-react'
import { Button } from './button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    text: 'Default Button',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    text: 'Destructive Button',
    variant: 'danger',
  },
}

export const Outline: Story = {
  args: {
    text: 'Outline Button',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'secondary',
  },
}

export const Link: Story = {
  args: {
    text: 'Link Button',
    variant: 'primary',
  },
}

export const WithIcon: Story = {
  args: {
    text: 'With Icon',
    variant: 'primary',
    icon: <ArrowRight />,
  },
}

export const WithShortcut: Story = {
  args: {
    text: 'With Shortcut',
    variant: 'primary',
    shortcut: '⌘K',
  },
}

export const Loading: Story = {
  args: {
    text: 'Loading',
    variant: 'primary',
    loading: true,
  },
}

export const Small: Story = {
  args: {
    text: 'Small Button',
    variant: 'primary',
  },
}

export const Large: Story = {
  args: {
    text: 'Large Button',
    variant: 'primary',
  },
}
