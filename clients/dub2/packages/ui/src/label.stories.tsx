import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A label component for form controls with various styling options.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => <Label htmlFor="input">Label Text</Label>,
}

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="name">
        Name <span className="text-red-500">*</span>
      </Label>
      <Input id="name" required />
    </div>
  ),
}

export const WithHelpText: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" />
      <p className="text-sm text-gray-500">
        Must be at least 4 characters long
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="disabled-input" className="text-gray-400">
        Disabled field
      </Label>
      <Input id="disabled-input" disabled />
    </div>
  ),
}

export const WithCustomStyling: Story = {
  render: () => (
    <Label htmlFor="custom" className="font-bold text-blue-600">
      Custom styled label
    </Label>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <p className="text-sm text-gray-500">
        Write a short description about yourself
      </p>
      <textarea
        id="bio"
        className="w-full rounded-md border border-gray-300 p-2"
        rows={3}
      />
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <input type="checkbox" id="terms" className="rounded border-gray-300" />
      <Label htmlFor="terms">I agree to the terms and conditions</Label>
    </div>
  ),
}

export const WithRadio: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="option1"
          name="options"
          className="border-gray-300"
        />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id="option2"
          name="options"
          className="border-gray-300"
        />
        <Label htmlFor="option2">Option 2</Label>
      </div>
    </div>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="country">Country</Label>
      <select
        id="country"
        className="w-full rounded-md border border-gray-300 p-2"
      >
        <option value="">Select a country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </select>
    </div>
  ),
}
