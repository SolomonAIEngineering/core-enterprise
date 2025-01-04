import type { Meta, StoryObj } from '@storybook/react';

import { ToggleGroup } from './toggle-group';
import { useState } from 'react';

const meta: Meta<typeof ToggleGroup> = {
    title: 'Components/ToggleGroup',
    component: ToggleGroup,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A toggle group component that allows single or multiple selection with customizable styles.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
    render: () => {
        const [value, setValue] = useState('center');
        return (
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={setValue}
                aria-label="Text alignment"
            >
                <ToggleGroup.Item value="left" aria-label="Left aligned">
                    <span className="i-lucide-align-left" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="center" aria-label="Center aligned">
                    <span className="i-lucide-align-center" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="right" aria-label="Right aligned">
                    <span className="i-lucide-align-right" />
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const Multiple: Story = {
    render: () => {
        const [value, setValue] = useState(['bold']);
        return (
            <ToggleGroup
                type="multiple"
                value={value}
                onValueChange={setValue}
                aria-label="Text formatting"
            >
                <ToggleGroup.Item value="bold" aria-label="Bold">
                    <span className="i-lucide-bold" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="italic" aria-label="Italic">
                    <span className="i-lucide-italic" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="underline" aria-label="Underline">
                    <span className="i-lucide-underline" />
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const WithLabels: Story = {
    render: () => {
        const [value, setValue] = useState('list');
        return (
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={setValue}
                aria-label="View options"
            >
                <ToggleGroup.Item value="list" aria-label="List view">
                    <span className="i-lucide-list" />
                    <span className="ml-2">List</span>
                </ToggleGroup.Item>
                <ToggleGroup.Item value="grid" aria-label="Grid view">
                    <span className="i-lucide-grid" />
                    <span className="ml-2">Grid</span>
                </ToggleGroup.Item>
                <ToggleGroup.Item value="columns" aria-label="Columns view">
                    <span className="i-lucide-columns" />
                    <span className="ml-2">Columns</span>
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const Disabled: Story = {
    render: () => {
        const [value, setValue] = useState('center');
        return (
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={setValue}
                aria-label="Text alignment"
            >
                <ToggleGroup.Item value="left" aria-label="Left aligned">
                    <span className="i-lucide-align-left" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="center" aria-label="Center aligned" disabled>
                    <span className="i-lucide-align-center" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="right" aria-label="Right aligned">
                    <span className="i-lucide-align-right" />
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const CustomStyles: Story = {
    render: () => {
        const [value, setValue] = useState('light');
        return (
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={setValue}
                className="bg-gray-100 p-1 rounded-lg"
                aria-label="Theme selection"
            >
                <ToggleGroup.Item
                    value="light"
                    className="data-[state=on]:bg-white data-[state=on]:shadow-sm"
                    aria-label="Light theme"
                >
                    <span className="i-lucide-sun" />
                    <span className="ml-2">Light</span>
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value="dark"
                    className="data-[state=on]:bg-white data-[state=on]:shadow-sm"
                    aria-label="Dark theme"
                >
                    <span className="i-lucide-moon" />
                    <span className="ml-2">Dark</span>
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value="system"
                    className="data-[state=on]:bg-white data-[state=on]:shadow-sm"
                    aria-label="System theme"
                >
                    <span className="i-lucide-laptop" />
                    <span className="ml-2">System</span>
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const Vertical: Story = {
    render: () => {
        const [value, setValue] = useState(['bold']);
        return (
            <ToggleGroup
                type="multiple"
                value={value}
                onValueChange={setValue}
                orientation="vertical"
                aria-label="Text formatting"
            >
                <ToggleGroup.Item value="bold" aria-label="Bold">
                    <span className="i-lucide-bold" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="italic" aria-label="Italic">
                    <span className="i-lucide-italic" />
                </ToggleGroup.Item>
                <ToggleGroup.Item value="underline" aria-label="Underline">
                    <span className="i-lucide-underline" />
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const WithTooltips: Story = {
    render: () => {
        const [value, setValue] = useState('center');
        return (
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={setValue}
                aria-label="Text alignment"
            >
                <ToggleGroup.Item
                    value="left"
                    aria-label="Left aligned"
                    data-tooltip="Align left"
                >
                    <span className="i-lucide-align-left" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value="center"
                    aria-label="Center aligned"
                    data-tooltip="Align center"
                >
                    <span className="i-lucide-align-center" />
                </ToggleGroup.Item>
                <ToggleGroup.Item
                    value="right"
                    aria-label="Right aligned"
                    data-tooltip="Align right"
                >
                    <span className="i-lucide-align-right" />
                </ToggleGroup.Item>
            </ToggleGroup>
        );
    },
};

export const WithForm: Story = {
    render: () => {
        const [textFormat, setTextFormat] = useState(['bold']);
        const [alignment, setAlignment] = useState('left');

        return (
            <form className="w-96 p-6 bg-white rounded-xl shadow-lg space-y-6">
                <h3 className="text-lg font-medium mb-4">Text Editor Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="text-formatting-group"
                            className="text-sm font-medium mb-2 block"
                        >
                            Text Formatting
                        </label>
                        <ToggleGroup
                            id="text-formatting-group"
                            type="multiple"
                            value={textFormat}
                            onValueChange={setTextFormat}
                            aria-label="Text formatting"
                        >
                            <ToggleGroup.Item value="bold" aria-label="Bold">
                                <span className="i-lucide-bold" />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="italic" aria-label="Italic">
                                <span className="i-lucide-italic" />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="underline" aria-label="Underline">
                                <span className="i-lucide-underline" />
                            </ToggleGroup.Item>
                        </ToggleGroup>
                    </div>
                    <div>
                        <label
                            htmlFor="text-alignment-group"
                            className="text-sm font-medium mb-2 block"
                        >
                            Text Alignment
                        </label>
                        <ToggleGroup
                            id="text-alignment-group"
                            type="single"
                            value={alignment}
                            onValueChange={setAlignment}
                            aria-label="Text alignment"
                        >
                            <ToggleGroup.Item value="left" aria-label="Left aligned">
                                <span className="i-lucide-align-left" />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="center" aria-label="Center aligned">
                                <span className="i-lucide-align-center" />
                            </ToggleGroup.Item>
                            <ToggleGroup.Item value="right" aria-label="Right aligned">
                                <span className="i-lucide-align-right" />
                            </ToggleGroup.Item>
                        </ToggleGroup>
                    </div>
                </div>
            </form>
        );
    },
}; 