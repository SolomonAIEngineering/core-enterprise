import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './footer';

const meta: Meta<typeof Footer> = {
    title: 'Components/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'A footer component for displaying site navigation and information.'
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
    render: () => (
        <Footer
            links={[
                { label: 'About', href: '#' },
                { label: 'Contact', href: '#' },
                { label: 'Terms', href: '#' },
                { label: 'Privacy', href: '#' },
            ]}
        />
    ),
};

export const WithSocialLinks: Story = {
    render: () => (
        <Footer
            links={[
                { label: 'About', href: '#' },
                { label: 'Contact', href: '#' },
            ]}
            socialLinks={[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
            ]}
        />
    ),
};

export const WithLogo: Story = {
    render: () => (
        <Footer
            logo={<img src="/logo.svg" alt="Company Logo" className="h-8" />}
            links={[
                { label: 'About', href: '#' },
                { label: 'Contact', href: '#' },
            ]}
        />
    ),
};

export const WithNewsletter: Story = {
    render: () => (
        <Footer
            links={[
                { label: 'About', href: '#' },
                { label: 'Contact', href: '#' },
            ]}
            newsletter={{
                title: 'Subscribe to our newsletter',
                description: 'Get the latest updates and news delivered to your inbox.',
                placeholder: 'Enter your email',
                buttonText: 'Subscribe',
                onSubscribe: (email) => console.log('Subscribed:', email),
            }}
        />
    ),
};

export const WithMultipleColumns: Story = {
    render: () => (
        <Footer
            columns={[
                {
                    title: 'Product',
                    links: [
                        { label: 'Features', href: '#' },
                        { label: 'Pricing', href: '#' },
                        { label: 'Documentation', href: '#' },
                    ],
                },
                {
                    title: 'Company',
                    links: [
                        { label: 'About', href: '#' },
                        { label: 'Careers', href: '#' },
                        { label: 'Blog', href: '#' },
                    ],
                },
                {
                    title: 'Legal',
                    links: [
                        { label: 'Terms', href: '#' },
                        { label: 'Privacy', href: '#' },
                        { label: 'Security', href: '#' },
                    ],
                },
            ]}
        />
    ),
};

export const WithCustomContent: Story = {
    render: () => (
        <Footer
            links={[
                { label: 'About', href: '#' },
                { label: 'Contact', href: '#' },
            ]}
        >
            <div className="mt-8 text-center text-sm text-gray-500">
                <p>© 2024 Your Company. All rights reserved.</p>
                <p className="mt-2">Made with ❤️ in San Francisco</p>
            </div>
        </Footer>
    ),
};

export const DarkMode: Story = {
    render: () => (
        <div className="bg-gray-900">
            <Footer
                theme="dark"
                links={[
                    { label: 'About', href: '#' },
                    { label: 'Contact', href: '#' },
                ]}
                socialLinks={[
                    { icon: Github, href: '#', label: 'GitHub' },
                    { icon: Twitter, href: '#', label: 'Twitter' },
                    { icon: Linkedin, href: '#', label: 'LinkedIn' },
                ]}
            />
        </div>
    ),
};

export const WithLanguageSelector: Story = {
    render: () => (
        <Footer
            links={[
                { label: 'About', href: '#' },
                { label: 'Contact', href: '#' },
            ]}
            languageSelector={{
                currentLanguage: 'English',
                languages: ['English', 'Spanish', 'French', 'German'],
                onLanguageChange: (lang) => console.log('Language changed:', lang),
            }}
        />
    ),
};

export const WithAppLinks: Story = {
    render: () => (
        <Footer
            links={[
                { label: 'About', href: '#' },
                { label: 'Contact', href: '#' },
            ]}
            appLinks={[
                {
                    platform: 'ios',
                    href: '#',
                    image: '/app-store-badge.svg',
                    alt: 'Download on the App Store',
                },
                {
                    platform: 'android',
                    href: '#',
                    image: '/google-play-badge.svg',
                    alt: 'Get it on Google Play',
                },
            ]}
        />
    ),
};

export const Minimal: Story = {
    render: () => (
        <Footer
            minimal
            links={[
                { label: 'Terms', href: '#' },
                { label: 'Privacy', href: '#' },
            ]}
            copyright="© 2024 Your Company"
        />
    ),
}; 