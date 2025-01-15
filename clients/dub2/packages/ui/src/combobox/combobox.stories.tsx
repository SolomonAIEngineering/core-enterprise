import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Check2, LoadingSpinner } from '../icons'
import { Combobox, type ComboboxOption } from './index'

const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile combobox component that supports single and multiple selection, search functionality, custom option creation, and rich customization options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection mode',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the combobox button',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    shouldFilter: {
      control: 'boolean',
      description: 'Whether to enable filtering of options based on search',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    caret: {
      control: 'boolean',
      description: 'Show/hide the dropdown caret',
    },
    matchTriggerWidth: {
      control: 'boolean',
      description: 'Make the dropdown width match the trigger button',
    },
  },
} satisfies Meta<typeof Combobox>

export default meta

// Example options for all stories
const exampleOptions: ComboboxOption[] = [
  { label: 'React', value: 'react', icon: 'R' },
  { label: 'Vue', value: 'vue', icon: 'V' },
  { label: 'Angular', value: 'angular', icon: 'A' },
  { label: 'Svelte', value: 'svelte', icon: 'S' },
  { label: 'Next.js', value: 'nextjs', icon: 'N' },
  { label: 'Nuxt.js', value: 'nuxtjs', icon: 'N' },
]

// Wrapper component to handle state
const ComboboxWithState = (args: Partial<Parameters<typeof Combobox>[0]>) => {
  const [selected, setSelected] = useState<
    ComboboxOption[] | ComboboxOption | null
  >(args.multiple ? [] : null)
  return (
    <div className="w-[300px]">
      <Combobox
        {...args}
        selected={selected}
        setSelected={setSelected}
        options={exampleOptions}
      />
    </div>
  )
}

type Story = StoryObj<typeof Combobox>

export const SingleSelect: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    multiple: false,
    placeholder: 'Select a framework',
    searchPlaceholder: 'Search frameworks...',
  },
}

export const MultiSelect: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    multiple: true,
    placeholder: 'Select frameworks',
    searchPlaceholder: 'Search frameworks...',
  },
}

export const WithShortcutHint: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    multiple: false,
    placeholder: 'Select a framework',
    shortcutHint: 'Cmd+K',
  },
}

export const WithCustomCreate: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<
      ComboboxOption[] | ComboboxOption | null
    >(args.multiple ? [] : null)
    const [isCreating, setIsCreating] = useState(false)

    return (
      <div className="w-[300px]">
        <Combobox
          {...args}
          selected={selected}
          setSelected={setSelected}
          options={exampleOptions}
          createLabel={(search) => (
            <div className="flex items-center gap-2">
              {isCreating ? (
                <LoadingSpinner className="h-4 w-4" />
              ) : (
                <Check2 className="h-4 w-4" />
              )}
              Create "{search}"
            </div>
          )}
          onCreate={async (search) => {
            setIsCreating(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))
            setIsCreating(false)
            const newOption: ComboboxOption = {
              label: search,
              value: search.toLowerCase(),
              icon: 'N',
            }
            exampleOptions.push(newOption)
            return true
          }}
        />
      </div>
    )
  },
  args: {
    multiple: true,
    placeholder: 'Select or create frameworks',
    searchPlaceholder: 'Search or create...',
  },
}

export const WithCustomStyling: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    multiple: false,
    placeholder: 'Select a framework',
    buttonProps: {
      variant: 'outline',
      className: 'border-blue-500 text-blue-500',
    },
    inputClassName: 'bg-blue-50',
    optionClassName: 'hover:bg-blue-50',
  },
}

export const WithCustomOptionRight: Story = {
  render: (args) => <ComboboxWithState {...args} />,
  args: {
    multiple: false,
    placeholder: 'Select a framework',
    optionRight: (option) => (
      <span className="text-xs text-gray-400">{option.value}</span>
    ),
  },
}
