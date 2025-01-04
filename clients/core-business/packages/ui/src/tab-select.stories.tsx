import type { Meta, StoryObj } from '@storybook/react';

import { TabSelect } from './tab-select';
import { useState } from 'react';

const meta: Meta<typeof TabSelect> = {
    title: 'Components/TabSelect',
    component: TabSelect,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A tab selection component with customizable styles and behaviors.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof TabSelect>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('tab1');
        return (
            <TabSelect
                value={value}
                onValueChange={setValue}
                items={[
                    { value: 'tab1', label: 'Tab 1' },
                    { value: 'tab2', label: 'Tab 2' },
                    { value: 'tab3', label: 'Tab 3' },
                ]}
            />
        );
    },
};

export const WithIcons: Story = {
    render: () => {
        const [value, setValue] = useState('overview');
        return (
            <TabSelect
                value={value}
                onValueChange={setValue}
                items={[
                    {
                        value: 'overview',
                        label: 'Overview',
                        icon: <span className="i-lucide-layout-dashboard" />,
                    },
                    {
                        value: 'analytics',
                        label: 'Analytics',
                        icon: <span className="i-lucide-bar-chart" />,
                    },
                    {
                        value: 'settings',
                        label: 'Settings',
                        icon: <span className="i-lucide-settings" />,
                    },
                ]}
            />
        );
    },
};

export const WithBadges: Story = {
    render: () => {
        const [value, setValue] = useState('inbox');
        return (
            <TabSelect
                value={value}
                onValueChange={setValue}
                items={[
                    {
                        value: 'inbox',
                        label: 'Inbox',
                        badge: '12',
                    },
                    {
                        value: 'sent',
                        label: 'Sent',
                        badge: '3',
                    },
                    {
                        value: 'archive',
                        label: 'Archive',
                        badge: '99+',
                    },
                ]}
            />
        );
    },
};

export const WithIconsAndBadges: Story = {
    render: () => {
        const [value, setValue] = useState('inbox');
        return (
            <TabSelect
                value={value}
                onValueChange={setValue}
                items={[
                    {
                        value: 'inbox',
                        label: 'Inbox',
                        icon: <span className="i-lucide-inbox" />,
                        badge: '12',
                    },
                    {
                        value: 'sent',
                        label: 'Sent',
                        icon: <span className="i-lucide-send" />,
                        badge: '3',
                    },
                    {
                        value: 'archive',
                        label: 'Archive',
                        icon: <span className="i-lucide-archive" />,
                        badge: '99+',
                    },
                ]}
            />
        );
    },
};

export const Disabled: Story = {
    render: () => {
        const [value, setValue] = useState('tab1');
        return (
            <TabSelect
                value={value}
                onValueChange={setValue}
                items={[
                    { value: 'tab1', label: 'Tab 1' },
                    { value: 'tab2', label: 'Tab 2', disabled: true },
                    { value: 'tab3', label: 'Tab 3' },
                ]}
            />
        );
    },
};

export const CustomStyles: Story = {
    render: () => {
        const [value, setValue] = useState('tab1');
        return (
            <TabSelect
                value={value}
                onValueChange={setValue}
                className="bg-gray-100 p-1 rounded-lg"
                itemClassName="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                items={[
                    { value: 'tab1', label: 'Tab 1' },
                    { value: 'tab2', label: 'Tab 2' },
                    { value: 'tab3', label: 'Tab 3' },
                ]}
            />
        );
    },
};

export const WithContent: Story = {
    render: () => {
        const [value, setValue] = useState('tab1');
        return (
            <div className="w-[600px] space-y-4">
                <TabSelect
                    value={value}
                    onValueChange={setValue}
                    items={[
                        { value: 'tab1', label: 'Account' },
                        { value: 'tab2', label: 'Password' },
                        { value: 'tab3', label: 'Notifications' },
                    ]}
                />
                <div className="p-4 bg-white rounded-lg shadow">
                    {value === 'tab1' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Account Settings</h3>
                            <p className="text-gray-600">
                                Manage your account settings and preferences.
                            </p>
                        </div>
                    )}
                    {value === 'tab2' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Password Settings</h3>
                            <p className="text-gray-600">
                                Update your password and security preferences.
                            </p>
                        </div>
                    )}
                    {value === 'tab3' && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Notification Settings</h3>
                            <p className="text-gray-600">
                                Configure your notification preferences.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    },
};

export const FullWidth: Story = {
    render: () => {
        const [value, setValue] = useState('tab1');
        return (
            <div className="w-[600px]">
                <TabSelect
                    value={value}
                    onValueChange={setValue}
                    className="w-full"
                    items={[
                        { value: 'tab1', label: 'Tab 1' },
                        { value: 'tab2', label: 'Tab 2' },
                        { value: 'tab3', label: 'Tab 3' },
                    ]}
                />
            </div>
        );
    },
};

export const WithTooltips: Story = {
    render: () => {
        const [value, setValue] = useState('tab1');
        return (
            <TabSelect
                value={value}
                onValueChange={setValue}
                items={[
                    {
                        value: 'tab1',
                        label: 'Tab 1',
                        tooltip: 'First tab tooltip',
                    },
                    {
                        value: 'tab2',
                        label: 'Tab 2',
                        tooltip: 'Second tab tooltip',
                    },
                    {
                        value: 'tab3',
                        label: 'Tab 3',
                        tooltip: 'Third tab tooltip',
                    },
                ]}
            />
        );
    },
}; 