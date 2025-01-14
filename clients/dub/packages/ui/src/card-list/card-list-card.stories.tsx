import type { Meta, StoryObj } from '@storybook/react'

import { CardList } from './card-list'
import { CardListCard } from './card-list-card'

const meta: Meta<typeof CardListCard> = {
  title: 'Components/CardListCard',
  component: CardListCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A card component designed to work within CardList. It provides hover state management, click handling,
and flexible styling options through className props.

## Features
- Automatic hover state management
- Click handling with interactive element detection
- Customizable outer and inner styling
- Responsive to CardList variant context
- Modal-aware click handling
                `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <CardList>
          <Story />
        </CardList>
      </div>
    ),
  ],
  argTypes: {
    outerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the outer card container',
    },
    innerClassName: {
      control: 'text',
      description: 'Additional CSS classes for the inner card content',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when the card is clicked (if interactive)',
    },
    hoverStateEnabled: {
      control: 'boolean',
      description: 'Whether the card should show hover effects',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CardListCard>

const ExampleContent = () => (
  <div className="flex flex-col gap-1">
    <h3 className="text-sm font-medium text-gray-900">Card Title</h3>
    <p className="text-sm text-gray-500">
      This is an example card content with some description text that might span
      multiple lines to demonstrate the layout.
    </p>
  </div>
)

export const Default: Story = {
  args: {
    children: <ExampleContent />,
  },
}

export const Interactive: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <ExampleContent />
        <span className="text-sm text-gray-400">Click me →</span>
      </div>
    ),
    onClick: () => alert('Card clicked!'),
  },
}

export const WithInteractiveChildren: Story = {
  args: {
    children: (
      <div className="flex items-center justify-between">
        <ExampleContent />
        <button
          type="button"
          className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation()
            alert('Button clicked!')
          }}
        >
          Action
        </button>
      </div>
    ),
    onClick: () => alert('Card clicked!'),
  },
}

export const CustomStyling: Story = {
  args: {
    outerClassName: 'bg-gradient-to-r from-blue-50 to-purple-50',
    innerClassName: 'p-6',
    children: <ExampleContent />,
  },
}

export const DisabledHoverState: Story = {
  args: {
    hoverStateEnabled: false,
    children: <ExampleContent />,
  },
}
