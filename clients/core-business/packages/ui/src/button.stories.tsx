import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

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
            options: ['primary', 'secondary', 'outline', 'success', 'danger', 'danger-outline'],
        },
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        text: 'Primary Button',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        text: 'Secondary Button',
        variant: 'secondary',
    },
};

export const WithIcon: Story = {
    args: {
        text: 'With Icon',
        variant: 'primary',
        icon: '→',
    },
};

export const WithShortcut: Story = {
    args: {
        text: 'With Shortcut',
        variant: 'primary',
        shortcut: '⌘K',
    },
};

export const Loading: Story = {
    args: {
        text: 'Loading',
        variant: 'primary',
        loading: true,
    },
}; 