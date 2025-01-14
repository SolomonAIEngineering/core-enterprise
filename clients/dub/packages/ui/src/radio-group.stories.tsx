import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup, RadioGroupItem } from './radio-group'

import { useState } from 'react'
import { Label } from './label'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A radio group component for selecting a single option from a list.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1" />
          <Label htmlFor="option1">Option 1</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2" />
          <Label htmlFor="option2">Option 2</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option3" id="option3" />
          <Label htmlFor="option3">Option 3</Label>
        </div>
      </RadioGroup>
    )
  },
}

export const WithDescription: Story = {
  render: () => {
    const [value, setValue] = useState('comfort')
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-start space-x-2">
          <RadioGroupItem value="comfort" id="comfort" className="mt-1" />
          <div>
            <Label htmlFor="comfort">Comfort</Label>
            <p className="text-sm text-gray-500">Balanced for everyday use</p>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <RadioGroupItem
            value="performance"
            id="performance"
            className="mt-1"
          />
          <div>
            <Label htmlFor="performance">Performance</Label>
            <p className="text-sm text-gray-500">
              Maximum speed and responsiveness
            </p>
          </div>
        </div>
      </RadioGroup>
    )
  },
}

export const WithCustomStyles: Story = {
  render: () => {
    const [value, setValue] = useState('red')
    return (
      <RadioGroup
        value={value}
        onValueChange={setValue}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="red"
            id="red"
            className="border-red-500 text-red-500"
          />
          <Label htmlFor="red" className="text-red-500">
            Red
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="blue"
            id="blue"
            className="border-blue-500 text-blue-500"
          />
          <Label htmlFor="blue" className="text-blue-500">
            Blue
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="green"
            id="green"
            className="border-green-500 text-green-500"
          />
          <Label htmlFor="green" className="text-green-500">
            Green
          </Label>
        </div>
      </RadioGroup>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState('option1')
    return (
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option1" id="option1-disabled" />
          <Label htmlFor="option1-disabled">Available Option</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option2" id="option2-disabled" disabled />
          <Label htmlFor="option2-disabled" className="text-gray-400">
            Disabled Option
          </Label>
        </div>
      </RadioGroup>
    )
  },
}

export const WithCard: Story = {
  render: () => {
    const [value, setValue] = useState('card1')
    return (
      <RadioGroup
        value={value}
        onValueChange={setValue}
        className="grid grid-cols-2 gap-4"
      >
        {['card1', 'card2'].map((card) => (
          <div
            key={card}
            className={`relative cursor-pointer rounded-lg border-2 p-4 ${value === card ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} `}
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value={card} id={card} className="mt-1" />
              <div>
                <Label htmlFor={card}>
                  Card {card === 'card1' ? 'One' : 'Two'}
                </Label>
                <p className="text-sm text-gray-500">
                  Description for {card === 'card1' ? 'first' : 'second'} card
                </p>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    )
  },
}

export const WithImages: Story = {
  render: () => {
    const [value, setValue] = useState('light')
    return (
      <RadioGroup
        value={value}
        onValueChange={setValue}
        className="grid grid-cols-2 gap-4"
      >
        <div
          className={`relative cursor-pointer rounded-lg border-2 p-4 ${value === 'light' ? 'border-blue-500' : 'border-gray-200'} `}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="h-24 w-full rounded-md border bg-white" />
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Light Theme</Label>
            </div>
          </div>
        </div>
        <div
          className={`relative cursor-pointer rounded-lg border-2 p-4 ${value === 'dark' ? 'border-blue-500' : 'border-gray-200'} `}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="h-24 w-full rounded-md border bg-gray-900" />
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Dark Theme</Label>
            </div>
          </div>
        </div>
      </RadioGroup>
    )
  },
}
