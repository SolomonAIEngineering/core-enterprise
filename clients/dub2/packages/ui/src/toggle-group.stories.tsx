import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { ToggleGroup } from './toggle-group'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle group component that allows selection with customizable styles.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('center')
    return (
      <ToggleGroup
        options={[
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ]}
        selected={selected}
        selectAction={(value) => setSelected(value)}
      />
    )
  },
}

export const WithBadges: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('all')
    return (
      <ToggleGroup
        options={[
          { value: 'all', label: 'All', badge: '128' },
          { value: 'active', label: 'Active', badge: '64' },
          { value: 'inactive', label: 'Inactive', badge: '64' },
        ]}
        selected={selected}
        selectAction={(value) => setSelected(value)}
      />
    )
  },
}

export const CustomStyles: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('light')
    return (
      <ToggleGroup
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'system', label: 'System' },
        ]}
        selected={selected}
        selectAction={(value) => setSelected(value)}
        className="bg-gray-100"
        optionClassName="px-4 py-2"
        indicatorClassName="bg-white shadow-sm"
      />
    )
  },
}

export const InContext: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('week')
    return (
      <div className="w-[600px] rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Analytics Overview</h3>
          <p className="text-sm text-gray-500">View your metrics over time</p>
        </div>
        <ToggleGroup
          options={[
            { value: 'day', label: '24h' },
            { value: 'week', label: '7d' },
            { value: 'month', label: '30d' },
            { value: 'year', label: '1y' },
          ]}
          selected={selected}
          selectAction={(value) => setSelected(value)}
        />
        <div className="mt-4 h-[200px] rounded-lg bg-gray-50" />
      </div>
    )
  },
}
