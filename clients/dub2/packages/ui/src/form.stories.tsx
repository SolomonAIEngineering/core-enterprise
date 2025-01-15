import type { Meta, StoryObj } from '@storybook/react'

import { Form } from './form'

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible form component with built-in state management, validation, and customizable styling.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  args: {
    title: 'Update Profile',
    description: 'Change your profile information.',
    inputAttrs: {
      type: 'text',
      name: 'name',
      defaultValue: 'John Doe',
      placeholder: 'Enter your name',
    },
    buttonText: 'Save Changes',
    helpText: 'Your name will be displayed on your profile.',
    handleSubmit: async (data) => {
      console.log('Form submitted:', data)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}

export const WithEmailInput: Story = {
  args: {
    title: 'Update Email',
    description: 'Change your email address.',
    inputAttrs: {
      type: 'email',
      name: 'email',
      defaultValue: 'john@example.com',
      placeholder: 'Enter your email',
    },
    buttonText: 'Update Email',
    helpText: "We'll send a confirmation to your new email address.",
    handleSubmit: async (data) => {
      console.log('Form submitted:', data)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}

export const WithPasswordInput: Story = {
  args: {
    title: 'Change Password',
    description: 'Update your account password.',
    inputAttrs: {
      type: 'password',
      name: 'password',
      defaultValue: '',
      placeholder: 'Enter new password',
    },
    buttonText: 'Update Password',
    helpText: 'Password must be at least 8 characters long.',
    handleSubmit: async (data) => {
      console.log('Form submitted:', data)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}

export const Disabled: Story = {
  args: {
    title: 'Account Settings',
    description: 'Manage your account settings.',
    inputAttrs: {
      type: 'text',
      name: 'username',
      defaultValue: 'johndoe',
      placeholder: 'Enter username',
    },
    buttonText: 'Save Changes',
    helpText: 'Contact support to change your username.',
    disabledTooltip: 'This field cannot be modified',
    handleSubmit: async (data) => {
      console.log('Form submitted:', data)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}

export const WithCustomHelpText: Story = {
  args: {
    title: 'API Configuration',
    description: 'Configure your API settings.',
    inputAttrs: {
      type: 'text',
      name: 'apiKey',
      defaultValue: 'sk_test_123',
      placeholder: 'Enter API key',
    },
    buttonText: 'Save API Key',
    helpText: (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Need an API key?</span>
        <a
          href="https://example.com/generate-api-key"
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Generate one here
        </a>
      </div>
    ),
    handleSubmit: async (data) => {
      console.log('Form submitted:', data)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}
