import type { Meta, StoryObj } from '@storybook/react'
import { Bell, Home, LogOut, Mail, Settings } from 'lucide-react'

import { IconMenu } from './icon-menu'

const meta: Meta<typeof IconMenu> = {
  title: 'Components/IconMenu',
  component: IconMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A menu component that displays an icon with text.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof IconMenu>

export const Default: Story = {
  args: {
    icon: <Home className="h-5 w-5" />,
    text: 'Home',
  },
}

export const WithSettings: Story = {
  args: {
    icon: <Settings className="h-5 w-5" />,
    text: 'Settings',
  },
}

export const WithNotification: Story = {
  args: {
    icon: <Bell className="h-5 w-5" />,
    text: 'Notifications',
  },
}

export const WithMessage: Story = {
  args: {
    icon: <Mail className="h-5 w-5" />,
    text: 'Messages',
  },
}

export const WithLogout: Story = {
  args: {
    icon: <LogOut className="h-5 w-5" />,
    text: 'Logout',
  },
}
