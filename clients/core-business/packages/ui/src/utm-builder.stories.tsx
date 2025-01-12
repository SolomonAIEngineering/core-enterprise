import type { Meta, StoryObj } from '@storybook/react'

import { TooltipProvider } from '@radix-ui/react-tooltip'
import { useState } from 'react'
import { UTMBuilder } from './utm-builder'

const meta: Meta<typeof UTMBuilder> = {
  title: 'Components/UTMBuilder',
  component: UTMBuilder,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A UTM parameter builder component for creating tracking URLs.',
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UTMBuilder>

const defaultValues = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_term: '',
  utm_content: '',
  ref: '',
}

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState(defaultValues)
    return (
      <div className="w-[600px]">
        <UTMBuilder
          values={values}
          onChange={(key, value) => {
            setValues((prev) => ({ ...prev, [key]: value }))
          }}
        />
      </div>
    )
  },
}

export const WithPrefilledValues: Story = {
  render: () => {
    const [values, setValues] = useState({
      utm_source: 'twitter',
      utm_medium: 'social',
      utm_campaign: 'summer_sale',
      utm_term: 'digital marketing',
      utm_content: 'header_link',
      ref: '',
    })
    return (
      <div className="w-[600px]">
        <UTMBuilder
          values={values}
          onChange={(key, value) => {
            setValues((prev) => ({ ...prev, [key]: value }))
          }}
        />
      </div>
    )
  },
}

export const WithAutoFocus: Story = {
  render: () => {
    const [values, setValues] = useState(defaultValues)
    return (
      <div className="w-[600px]">
        <UTMBuilder
          values={values}
          onChange={(key, value) => {
            setValues((prev) => ({ ...prev, [key]: value }))
          }}
          autoFocus
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [values, setValues] = useState(defaultValues)
    return (
      <div className="w-[600px]">
        <UTMBuilder
          values={values}
          onChange={(key, value) => {
            setValues((prev) => ({ ...prev, [key]: value }))
          }}
          disabled
        />
      </div>
    )
  },
}

export const WithDisabledTooltip: Story = {
  render: () => {
    const [values, setValues] = useState(defaultValues)
    return (
      <div className="w-[600px]">
        <UTMBuilder
          values={values}
          onChange={(key, value) => {
            setValues((prev) => ({ ...prev, [key]: value }))
          }}
          disabledTooltip="This UTM builder is currently disabled"
        />
      </div>
    )
  },
}

export const WithCustomStyles: Story = {
  render: () => {
    const [values, setValues] = useState(defaultValues)
    return (
      <div className="w-[600px]">
        <UTMBuilder
          values={values}
          onChange={(key, value) => {
            setValues((prev) => ({ ...prev, [key]: value }))
          }}
          className="rounded-xl bg-gray-50 p-6 shadow-sm"
        />
      </div>
    )
  },
}
