import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A checkbox component for selecting options.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => <Checkbox id="terms" />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="checked" defaultChecked />
      <label htmlFor="checked" className="text-sm font-medium leading-none">
        Checked by default
      </label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled" disabled />
      <label
        htmlFor="disabled"
        className="text-sm font-medium leading-none text-gray-500"
      >
        Disabled checkbox
      </label>
    </div>
  ),
}

export const DisabledChecked: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="disabled-checked" disabled defaultChecked />
      <label
        htmlFor="disabled-checked"
        className="text-sm font-medium leading-none text-gray-500"
      >
        Disabled and checked
      </label>
    </div>
  ),
}

export const WithDescription: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms2" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
        <p className="text-sm text-gray-500">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          id="controlled"
          checked={checked}
          onCheckedChange={(value: boolean) => setChecked(value)}
        />
        <label
          htmlFor="controlled"
          className="text-sm font-medium leading-none"
        >
          Controlled checkbox: {checked ? 'Checked' : 'Unchecked'}
        </label>
      </div>
    )
  },
}

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <label htmlFor="option1" className="text-sm font-medium">
          Option 1
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" />
        <label htmlFor="option2" className="text-sm font-medium">
          Option 2
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" />
        <label htmlFor="option3" className="text-sm font-medium">
          Option 3
        </label>
      </div>
    </div>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="custom"
        className="h-6 w-6 border-blue-500 data-[state=checked]:bg-blue-500"
      />
      <label htmlFor="custom" className="text-sm font-medium text-blue-600">
        Custom styled checkbox
      </label>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 rounded border border-gray-200 p-4">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Newsletter Preferences</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id="marketing" />
          <label htmlFor="marketing" className="text-sm">
            Receive marketing emails
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="updates" />
          <label htmlFor="updates" className="text-sm">
            Receive product updates
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="partners" />
          <label htmlFor="partners" className="text-sm">
            Receive partner offers
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
      >
        Save Preferences
      </button>
    </form>
  ),
}
