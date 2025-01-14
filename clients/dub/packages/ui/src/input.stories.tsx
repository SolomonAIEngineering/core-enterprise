import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable input component with support for various states and types.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => <Input placeholder="Enter text..." />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
}

export const Password: Story = {
  render: () => <Input type="password" placeholder="Enter password" />,
}

export const WithError: Story = {
  render: () => (
    <Input
      type="email"
      placeholder="Enter email"
      error="Please enter a valid email address"
    />
  ),
}

export const Disabled: Story = {
  render: () => <Input placeholder="Disabled input" disabled />,
}

export const WithCustomStyling: Story = {
  render: () => (
    <Input
      placeholder="Custom styled input"
      className="border-blue-500 focus:ring-blue-200"
    />
  ),
}

export const Required: Story = {
  render: () => <Input placeholder="Required field" required />,
}

export const WithValue: Story = {
  render: () => (
    <Input
      value="Prefilled value"
      onChange={(e) => console.log('Value changed:', e.target.value)}
    />
  ),
}

export const NumberInput: Story = {
  render: () => (
    <Input type="number" placeholder="Enter a number" min={0} max={100} />
  ),
}

export const Search: Story = {
  render: () => (
    <Input type="search" placeholder="Search..." className="pl-8" />
  ),
}
