import type { Meta, StoryObj } from '@storybook/react'
import { Globe, Search } from 'lucide-react'

import { useState } from 'react'
import { InputSelect, type InputSelectItemProps } from './input-select'

const meta: Meta<typeof InputSelect> = {
  title: 'Components/InputSelect',
  component: InputSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A searchable select input component with customizable options and mobile support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof InputSelect>

const sampleItems = [
  { id: '1', value: 'Option 1' },
  { id: '2', value: 'Option 2' },
  { id: '3', value: 'Option 3', disabled: true },
  { id: '4', value: 'Option 4' },
  { id: '5', value: 'Option 5' },
]

const coloredItems = [
  { id: '1', value: 'Red', color: 'red' },
  { id: '2', value: 'Blue', color: 'blue' },
  { id: '3', value: 'Green', color: 'green' },
  { id: '4', value: 'Yellow', color: 'yellow' },
  { id: '5', value: 'Purple', color: 'purple' },
]

const itemsWithImages = [
  {
    id: '1',
    value: 'Profile 1',
    image: 'https://avatars.githubusercontent.com/u/1',
  },
  {
    id: '2',
    value: 'Profile 2',
    image: 'https://avatars.githubusercontent.com/u/2',
  },
  {
    id: '3',
    value: 'Profile 3',
    image: 'https://avatars.githubusercontent.com/u/3',
  },
]

export const Default: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={sampleItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    )
  },
}

export const WithCustomIcon: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={sampleItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        icon={<Search className="h-4 w-4" />}
      />
    )
  },
}

export const WithColors: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={coloredItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    )
  },
}

export const WithImages: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={itemsWithImages}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    )
  },
}

export const WithCustomPlaceholder: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={sampleItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        inputAttrs={{ placeholder: 'Select an option...' }}
      />
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={sampleItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        disabled
      />
    )
  },
}

export const WithCustomStyling: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={sampleItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        className="min-w-[300px] border-blue-500 focus-within:ring-blue-200"
      />
    )
  },
}

export const WithNoItems: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={[]}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        noItemsElement={
          <div className="flex flex-col items-center justify-center p-4 text-gray-500">
            <Globe className="mb-2 h-8 w-8" />
            <p>No options available</p>
          </div>
        }
      />
    )
  },
}

export const WithLabels: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={[
          { id: '1', value: 'Option 1', label: 'New' },
          { id: '2', value: 'Option 2', label: 'Popular' },
          { id: '3', value: 'Option 3', label: 'Featured' },
        ]}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    )
  },
}

export const MobileAdjusted: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] =
      useState<InputSelectItemProps | null>(null)
    return (
      <InputSelect
        items={sampleItems}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        adjustForMobile
      />
    )
  },
}
