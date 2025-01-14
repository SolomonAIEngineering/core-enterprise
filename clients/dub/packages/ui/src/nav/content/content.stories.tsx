import type { Meta, StoryObj } from '@storybook/react'
import {
  ContentIcon,
  ContentLinkCard,
  LargeLinkCard,
  ToolLinkCard,
} from './shared'

import { Code } from '../../icons'
import { ProductContent } from './product-content'
import { ResourcesContent } from './resources-content'
import { SolutionsContent } from './solutions-content'

const meta: Meta<typeof ContentLinkCard> = {
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Navigation content components used in dropdown menus and navigation panels.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="font-sans">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Product: Story = {
  render: () => <ProductContent domain="example.com" />,
}

export const Resources: Story = {
  render: () => <ResourcesContent domain="example.com" />,
}

export const Solutions: Story = {
  render: () => <SolutionsContent domain="example.com" />,
}

export const SharedComponents: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Content Link Card</h3>
        <div className="space-y-2">
          <ContentLinkCard
            href="#"
            title="Basic Link"
            description="A simple content link card"
          />
          <ContentLinkCard
            href="#"
            title="With Icon"
            description="Content link card with an icon"
            icon={<ContentIcon icon={Code} />}
          />
          <ContentLinkCard
            href="#"
            title="With Arrow"
            description="Content link card with an arrow"
            showArrow
          />
          <ContentLinkCard
            href="#"
            title="Two Lines"
            description="This is a longer description that spans two lines to demonstrate the descriptionLines prop"
            descriptionLines={2}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Tool Link Card</h3>
        <div className="flex gap-4">
          <ToolLinkCard
            name="Example Tool"
            href="#"
            icon={<Code className="h-6 w-6" />}
          />
          <ToolLinkCard
            name="Another Tool"
            href="#"
            icon={<Code className="h-6 w-6" />}
          />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Large Link Card</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <LargeLinkCard
            href="#"
            title="Example Card"
            description="A large link card with an icon"
            icon={Code}
          />
          <LargeLinkCard
            href="#"
            title="Another Card"
            description="Another example of a large link card"
            icon={Code}
          />
        </div>
      </div>
    </div>
  ),
}
