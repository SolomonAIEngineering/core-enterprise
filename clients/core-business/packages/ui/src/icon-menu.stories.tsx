import {
    Bell,
    FileText,
    HelpCircle,
    Home,
    LogOut,
    Mail,
    MoreVertical,
    Settings,
    Star,
    User,
} from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import { IconMenu } from './icon-menu';

const meta: Meta<typeof IconMenu> = {
    title: 'Components/IconMenu',
    component: IconMenu,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A menu component that displays icons with labels and optional descriptions.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof IconMenu>;

export const Default: Story = {
    render: () => (
        <IconMenu
            items={[
                { icon: Home, label: 'Home' },
                { icon: Settings, label: 'Settings' },
                { icon: User, label: 'Profile' },
                { icon: LogOut, label: 'Logout' },
            ]}
        />
    ),
};

export const WithDescriptions: Story = {
    render: () => (
        <IconMenu
            items={[
                {
                    icon: Bell,
                    label: 'Notifications',
                    description: 'View and manage your notifications',
                },
                {
                    icon: Mail,
                    label: 'Messages',
                    description: 'Read and send messages',
                },
                {
                    icon: Settings,
                    label: 'Settings',
                    description: 'Configure your preferences',
                },
            ]}
        />
    ),
};

export const WithCustomTrigger: Story = {
    render: () => (
        <IconMenu
            trigger={
                <button type="button" className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                    <MoreVertical className="h-5 w-5" />
                </button>
            }
            items={[
                { icon: Settings, label: 'Settings' },
                { icon: HelpCircle, label: 'Help' },
                { icon: LogOut, label: 'Logout' },
            ]}
        />
    ),
};

export const WithDividers: Story = {
    render: () => (
        <IconMenu
            items={[
                { icon: Home, label: 'Home' },
                { icon: User, label: 'Profile' },
                { type: 'divider' },
                { icon: Settings, label: 'Settings' },
                { icon: HelpCircle, label: 'Help' },
                { type: 'divider' },
                { icon: LogOut, label: 'Logout' },
            ]}
        />
    ),
};

export const WithDisabledItems: Story = {
    render: () => (
        <IconMenu
            items={[
                { icon: Home, label: 'Home' },
                { icon: Star, label: 'Premium Features', disabled: true },
                { icon: Settings, label: 'Settings' },
                { icon: LogOut, label: 'Logout' },
            ]}
        />
    ),
};

export const WithCustomStyles: Story = {
    render: () => (
        <IconMenu
            className="rounded-xl bg-gray-900 p-2 text-white"
            itemClassName="hover:bg-gray-800"
            items={[
                { icon: Home, label: 'Home' },
                { icon: Settings, label: 'Settings' },
                { icon: LogOut, label: 'Logout' },
            ]}
        />
    ),
};

export const WithBadges: Story = {
    render: () => (
        <IconMenu
            items={[
                {
                    icon: Bell,
                    label: 'Notifications',
                    badge: '3',
                    badgeClassName: 'bg-red-500',
                },
                {
                    icon: Mail,
                    label: 'Messages',
                    badge: '5',
                    badgeClassName: 'bg-blue-500',
                },
                { icon: Settings, label: 'Settings' },
            ]}
        />
    ),
};

export const WithSubmenus: Story = {
    render: () => (
        <IconMenu
            items={[
                { icon: Home, label: 'Home' },
                {
                    icon: FileText,
                    label: 'Documents',
                    submenu: [
                        { icon: FileText, label: 'Recent' },
                        { icon: Star, label: 'Starred' },
                        { icon: User, label: 'Shared with me' },
                    ],
                },
                { icon: Settings, label: 'Settings' },
            ]}
        />
    ),
};

export const WithCustomIcons: Story = {
    render: () => (
        <IconMenu
            items={[
                {
                    icon: () => (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                            A
                        </div>
                    ),
                    label: 'Account',
                },
                {
                    icon: () => (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                            T
                        </div>
                    ),
                    label: 'Team',
                },
                {
                    icon: () => (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 text-white">
                            P
                        </div>
                    ),
                    label: 'Projects',
                },
            ]}
        />
    ),
};

export const WithActions: Story = {
    render: () => (
        <IconMenu
            items={[
                {
                    icon: Bell,
                    label: 'Enable Notifications',
                    onClick: () => console.log('Notifications enabled'),
                    description: 'Get notified about important updates',
                },
                {
                    icon: Mail,
                    label: 'Send Feedback',
                    onClick: () => console.log('Feedback dialog opened'),
                    description: 'Help us improve our product',
                },
                {
                    icon: LogOut,
                    label: 'Logout',
                    onClick: () => console.log('Logged out'),
                    description: 'Sign out of your account',
                    className: 'text-red-600 hover:bg-red-50',
                },
            ]}
        />
    ),
}; 