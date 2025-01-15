import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle switch component with customizable styles and behaviors.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <Switch checked={checked} fn={setChecked} aria-label="Toggle switch" />
    )
  },
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex items-center space-x-2">
        <Switch
          id="notifications-switch"
          checked={checked}
          fn={setChecked}
          aria-label="Enable notifications"
        />
        <label htmlFor="notifications-switch" className="text-sm font-medium">
          Enable notifications
        </label>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="disabled-checked"
          checked={true}
          disabled
          aria-label="Disabled checked"
        />
        <label
          htmlFor="disabled-checked"
          className="text-sm font-medium text-gray-500"
        >
          Disabled (checked)
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="disabled-unchecked"
          checked={false}
          disabled
          aria-label="Disabled unchecked"
        />
        <label
          htmlFor="disabled-unchecked"
          className="text-sm font-medium text-gray-500"
        >
          Disabled (unchecked)
        </label>
      </div>
    </div>
  ),
}

export const CustomColors: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="purple-switch"
            checked={checked}
            fn={setChecked}
            trackDimensions="data-[state=checked]:bg-purple-600"
            aria-label="Purple switch"
          />
          <label htmlFor="purple-switch" className="text-sm font-medium">
            Purple switch
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="amber-switch"
            checked={checked}
            fn={setChecked}
            trackDimensions="data-[state=checked]:bg-amber-500"
            aria-label="Amber switch"
          />
          <label htmlFor="amber-switch" className="text-sm font-medium">
            Amber switch
          </label>
        </div>
      </div>
    )
  },
}

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="flex space-x-2">
        <Switch
          id="notifications-desc-switch"
          checked={checked}
          fn={setChecked}
          aria-label="Enable notifications with description"
        />
        <div>
          <label
            htmlFor="notifications-desc-switch"
            className="text-sm font-medium"
          >
            Enable notifications
          </label>
          <p className="text-sm text-gray-500">
            You'll receive updates about system changes and important alerts.
          </p>
        </div>
      </div>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [formState, setFormState] = useState({
      notifications: false,
      updates: false,
      marketing: false,
    })

    return (
      <form className="w-96 space-y-6 rounded-xl bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-medium">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label
                htmlFor="push-notifications"
                className="text-sm font-medium"
              >
                Push Notifications
              </label>
              <p className="text-sm text-gray-500">
                Receive notifications on your device
              </p>
            </div>
            <Switch
              id="push-notifications"
              checked={formState.notifications}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              fn={(checked: any) =>
                setFormState((prev) => ({ ...prev, notifications: checked }))
              }
              aria-label="Push notifications"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="system-updates" className="text-sm font-medium">
                System Updates
              </label>
              <p className="text-sm text-gray-500">
                Get notified about system changes
              </p>
            </div>
            <Switch
              id="system-updates"
              checked={formState.updates}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              fn={(checked: any) =>
                setFormState((prev) => ({ ...prev, updates: checked }))
              }
              aria-label="System updates"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="marketing-emails" className="text-sm font-medium">
                Marketing Emails
              </label>
              <p className="text-sm text-gray-500">
                Receive marketing and promotional emails
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={formState.marketing}
              // biome-ignore lint/suspicious/noExplicitAny: <explanation>
              fn={(checked: any) =>
                setFormState((prev) => ({ ...prev, marketing: checked }))
              }
              aria-label="Marketing emails"
            />
          </div>
        </div>
      </form>
    )
  },
}

export const WithCustomSize: Story = {
  render: () => {
    const [checked, setChecked] = useState(false)
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="small-switch"
            checked={checked}
            fn={setChecked}
            trackDimensions="h-3 w-[34px]"
            thumbDimensions="h-4 w-4"
            thumbTranslate="translate-x-4"
            aria-label="Small switch"
          />
          <label htmlFor="small-switch" className="text-sm font-medium">
            Small
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="large-switch"
            checked={checked}
            fn={setChecked}
            trackDimensions="h-6 w-[52px]"
            thumbDimensions="h-4 w-4"
            thumbTranslate="translate-x-4"
            aria-label="Large switch"
          />
          <label htmlFor="large-switch" className="text-sm font-medium">
            Large
          </label>
        </div>
      </div>
    )
  },
}
