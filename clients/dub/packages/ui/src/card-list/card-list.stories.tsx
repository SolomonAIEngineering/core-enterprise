import type { Meta, StoryObj } from '@storybook/react'

import { CardList } from './card-list'
import { CardListCard } from './card-list-card'

const meta: Meta<typeof CardList> = {
  title: 'Components/CardList',
  component: CardList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible card list component that supports two layout variants (compact and loose) and provides hover states.
It's designed to display a collection of cards with consistent spacing and styling.

## Features
- Two layout variants: compact and loose
- Loading state support
- Hover state management
- Customizable through className props
- Context-based variant sharing between parent and children
                `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['compact', 'loose'],
      description: 'Controls the spacing and styling between cards',
      table: {
        defaultValue: { summary: 'loose' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Applies a loading state to the entire list',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the list',
    },
  },
}

export default meta
type Story = StoryObj<typeof CardList>

// Example card content component for the stories
const ExampleCard = ({
  title,
  description,
}: {
  title: string
  description: string
}) => (
  <div className="flex flex-col gap-1">
    <h3 className="text-sm font-medium text-gray-900">{title}</h3>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
)

export const Default: Story = {
  args: {
    children: (
      <>
        <CardListCard>
          <ExampleCard
            title="First Card"
            description="This is the first card in the list"
          />
        </CardListCard>
        <CardListCard>
          <ExampleCard
            title="Second Card"
            description="This is the second card in the list"
          />
        </CardListCard>
        <CardListCard>
          <ExampleCard
            title="Third Card"
            description="This is the third card in the list"
          />
        </CardListCard>
      </>
    ),
  },
}

export const CompactVariant: Story = {
  args: {
    variant: 'compact',
    children: (
      <>
        <CardListCard>
          <ExampleCard
            title="Compact Card 1"
            description="Cards in compact mode have no gap between them"
          />
        </CardListCard>
        <CardListCard>
          <ExampleCard
            title="Compact Card 2"
            description="Notice the continuous border between cards"
          />
        </CardListCard>
        <CardListCard>
          <ExampleCard
            title="Compact Card 3"
            description="Only first and last cards have rounded corners"
          />
        </CardListCard>
      </>
    ),
  },
}

export const LoadingState: Story = {
  args: {
    loading: true,
    children: (
      <>
        <CardListCard>
          <ExampleCard
            title="Loading Card"
            description="The entire list has reduced opacity"
          />
        </CardListCard>
        <CardListCard>
          <ExampleCard
            title="Loading Card"
            description="Content is visible but dimmed"
          />
        </CardListCard>
      </>
    ),
  },
}

export const WithInteractiveCards: Story = {
  args: {
    children: (
      <>
        <CardListCard onClick={() => alert('Card 1 clicked!')}>
          <ExampleCard
            title="Clickable Card"
            description="Click me to see an alert"
          />
        </CardListCard>
        <CardListCard onClick={() => alert('Card 2 clicked!')}>
          <ExampleCard
            title="Another Clickable Card"
            description="I'm also interactive"
          />
        </CardListCard>
      </>
    ),
  },
}

export const CustomStyling: Story = {
  args: {
    className: 'max-w-md',
    children: (
      <>
        <CardListCard outerClassName="bg-blue-50" innerClassName="p-6">
          <ExampleCard
            title="Custom Styled Card"
            description="This card has custom background and padding"
          />
        </CardListCard>
        <CardListCard outerClassName="bg-green-50" innerClassName="p-6">
          <ExampleCard
            title="Another Custom Card"
            description="Different background color"
          />
        </CardListCard>
      </>
    ),
  },
}
