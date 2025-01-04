import type { Meta, StoryObj } from '@storybook/react';

import { MaxWidthWrapper } from './max-width-wrapper';

const meta: Meta<typeof MaxWidthWrapper> = {
    title: 'Components/MaxWidthWrapper',
    component: MaxWidthWrapper,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A container component that enforces a maximum width and consistent padding.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MaxWidthWrapper>;

export const Default: Story = {
    render: () => (
        <MaxWidthWrapper>
            <div className="bg-gray-100 p-4 rounded-lg">
                <p>Default max width content</p>
            </div>
        </MaxWidthWrapper>
    ),
};

export const WithCustomMaxWidth: Story = {
    render: () => (
        <MaxWidthWrapper maxWidth="800px">
            <div className="bg-gray-100 p-4 rounded-lg">
                <p>Custom max width content (800px)</p>
            </div>
        </MaxWidthWrapper>
    ),
};

export const WithCustomPadding: Story = {
    render: () => (
        <MaxWidthWrapper className="px-8">
            <div className="bg-gray-100 p-4 rounded-lg">
                <p>Content with custom padding</p>
            </div>
        </MaxWidthWrapper>
    ),
};

export const WithBackground: Story = {
    render: () => (
        <div className="bg-gray-50">
            <MaxWidthWrapper>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p>Content with background</p>
                </div>
            </MaxWidthWrapper>
        </div>
    ),
};

export const WithMultipleSections: Story = {
    render: () => (
        <div className="space-y-8">
            <MaxWidthWrapper>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p>First section</p>
                </div>
            </MaxWidthWrapper>
            <MaxWidthWrapper>
                <div className="bg-green-100 p-4 rounded-lg">
                    <p>Second section</p>
                </div>
            </MaxWidthWrapper>
            <MaxWidthWrapper>
                <div className="bg-yellow-100 p-4 rounded-lg">
                    <p>Third section</p>
                </div>
            </MaxWidthWrapper>
        </div>
    ),
};

export const WithGrid: Story = {
    render: () => (
        <MaxWidthWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={`grid-item-${index}-${Date.now()}`} className="bg-gray-100 p-4 rounded-lg">
                        <p>Grid item {index + 1}</p>
                    </div>
                ))}
            </div>
        </MaxWidthWrapper>
    ),
};

export const WithNavigation: Story = {
    render: () => (
        <div className="space-y-8">
            <div className="bg-white shadow">
                <MaxWidthWrapper>
                    <div className="h-16 flex items-center">
                        <p className="font-bold">Navigation</p>
                    </div>
                </MaxWidthWrapper>
            </div>
            <MaxWidthWrapper>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p>Main content</p>
                </div>
            </MaxWidthWrapper>
        </div>
    ),
};

export const WithResponsivePadding: Story = {
    render: () => (
        <MaxWidthWrapper className="px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="bg-gray-100 p-4 rounded-lg">
                <p>Content with responsive padding</p>
            </div>
        </MaxWidthWrapper>
    ),
};

export const WithNestedWrappers: Story = {
    render: () => (
        <MaxWidthWrapper maxWidth="1200px">
            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="mb-4">Outer wrapper</p>
                <MaxWidthWrapper maxWidth="800px">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p>Inner wrapper</p>
                    </div>
                </MaxWidthWrapper>
            </div>
        </MaxWidthWrapper>
    ),
};

export const WithCustomStyles: Story = {
    render: () => (
        <MaxWidthWrapper className="bg-gradient-to-r from-blue-50 to-purple-50 py-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <p>Content with custom wrapper styles</p>
            </div>
        </MaxWidthWrapper>
    ),
}; 