import type { Meta, StoryObj } from '@storybook/react';

import { UTMBuilder } from './utm-builder';

const meta: Meta<typeof UTMBuilder> = {
    title: 'Components/UTMBuilder',
    component: UTMBuilder,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A UTM parameter builder component for creating tracking URLs.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof UTMBuilder>;

export const Default: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                onURLChange={(url) => console.log('Generated URL:', url)}
            />
        </div>
    ),
};

export const WithPrefilledValues: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com/blog"
                defaultValues={{
                    source: 'twitter',
                    medium: 'social',
                    campaign: 'summer_sale',
                    term: 'digital marketing',
                    content: 'header_link',
                }}
                onURLChange={(url) => console.log('Generated URL:', url)}
            />
        </div>
    ),
};

export const WithCustomPlaceholders: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                placeholders={{
                    source: 'e.g., newsletter',
                    medium: 'e.g., email',
                    campaign: 'e.g., product_launch',
                    term: 'e.g., marketing automation',
                    content: 'e.g., footer_button',
                }}
                onURLChange={(url) => console.log('Generated URL:', url)}
            />
        </div>
    ),
};

export const WithValidation: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                required={['source', 'medium', 'campaign']}
                onURLChange={(url) => console.log('Generated URL:', url)}
                onValidationChange={(isValid) => console.log('Form is valid:', isValid)}
            />
        </div>
    ),
};

export const WithCustomStyles: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                className="bg-gray-50 p-6 rounded-xl shadow-sm"
                inputClassName="bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                labelClassName="text-gray-700 font-medium"
                onURLChange={(url) => console.log('Generated URL:', url)}
            />
        </div>
    ),
};

export const WithHelperText: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                helperText={{
                    source: 'The referrer (e.g., google, newsletter)',
                    medium: 'Marketing medium (e.g., cpc, banner, email)',
                    campaign: 'The individual campaign name, slogan, or code',
                    term: 'Identify paid search keywords',
                    content: 'Use to differentiate similar content or links',
                }}
                onURLChange={(url) => console.log('Generated URL:', url)}
            />
        </div>
    ),
};

export const WithCustomLabels: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                labels={{
                    source: 'Traffic Source',
                    medium: 'Marketing Medium',
                    campaign: 'Campaign Name',
                    term: 'Search Terms',
                    content: 'Content Identifier',
                }}
                onURLChange={(url) => console.log('Generated URL:', url)}
            />
        </div>
    ),
};

export const WithCopyButton: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                showCopyButton
                onURLChange={(url) => console.log('Generated URL:', url)}
                onCopy={(url) => console.log('Copied URL:', url)}
            />
        </div>
    ),
};

export const WithPreview: Story = {
    render: () => (
        <div className="w-[600px]">
            <UTMBuilder
                baseUrl="https://example.com"
                showPreview
                onURLChange={(url) => console.log('Generated URL:', url)}
            />
        </div>
    ),
};

export const InDashboard: Story = {
    render: () => (
        <div className="w-[800px] p-6 bg-white rounded-xl shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Campaign URL Builder</h2>
                <p className="text-gray-600">
                    Create custom URLs with UTM parameters for campaign tracking
                </p>
            </div>
            <UTMBuilder
                baseUrl="https://example.com"
                showCopyButton
                showPreview
                required={['source', 'medium', 'campaign']}
                helperText={{
                    source: 'The referrer (e.g., google, newsletter)',
                    medium: 'Marketing medium (e.g., cpc, banner, email)',
                    campaign: 'The individual campaign name, slogan, or code',
                }}
                onURLChange={(url) => console.log('Generated URL:', url)}
                onCopy={(url) => console.log('Copied URL:', url)}
                onValidationChange={(isValid) => console.log('Form is valid:', isValid)}
            />
        </div>
    ),
}; 