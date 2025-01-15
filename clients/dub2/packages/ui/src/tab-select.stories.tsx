import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { TabSelect } from './tab-select'

const meta: Meta<typeof TabSelect> = {
  title: 'Components/TabSelect',
  component: TabSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tab selection component with customizable styles and behaviors.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabSelect>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('tab1')
    return (
      <TabSelect
        options={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3' },
        ]}
        selected={selected}
        onSelect={setSelected}
      />
    )
  },
}

export const WithCustomStyles: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('tab1')
    return (
      <TabSelect
        options={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3' },
        ]}
        selected={selected}
        onSelect={setSelected}
        className="rounded-lg bg-gray-100 p-1"
      />
    )
  },
}

export const WithContent: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('tab1')
    return (
      <div className="w-[600px] space-y-4">
        <TabSelect
          options={[
            { id: 'tab1', label: 'Account' },
            { id: 'tab2', label: 'Password' },
            { id: 'tab3', label: 'Notifications' },
          ]}
          selected={selected}
          onSelect={setSelected}
        />
        <div className="rounded-lg bg-white p-4 shadow">
          {selected === 'tab1' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Account Settings</h3>
              <p className="text-gray-600">
                Manage your account settings and preferences.
              </p>
            </div>
          )}
          {selected === 'tab2' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Password Settings</h3>
              <p className="text-gray-600">
                Update your password and security preferences.
              </p>
            </div>
          )}
          {selected === 'tab3' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <p className="text-gray-600">
                Configure your notification preferences.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  },
}

export const FullWidth: Story = {
  render: () => {
    const [selected, setSelected] = useState<string>('tab1')
    return (
      <div className="w-[600px]">
        <TabSelect
          options={[
            { id: 'tab1', label: 'Tab 1' },
            { id: 'tab2', label: 'Tab 2' },
            { id: 'tab3', label: 'Tab 3' },
          ]}
          selected={selected}
          onSelect={setSelected}
          className="w-full"
        />
      </div>
    )
  },
}
