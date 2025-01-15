import type { Meta, StoryObj } from '@storybook/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A vertically stacked set of interactive headings that each reveal a section of content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Accordion>

export const SingleItem: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Basic Accordion</AccordionTrigger>
        <AccordionContent>
          This is a basic accordion item with default styling.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const MultipleItems: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>Content for the first item.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item</AccordionTrigger>
        <AccordionContent>Content for the second item.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>Content for the third item.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithPlusIcon: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger variant="plus">Plus Icon Variant</AccordionTrigger>
        <AccordionContent>
          Using the plus icon variant instead of chevron.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const MultipleExpanded: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Multiple Expansion #1</AccordionTrigger>
        <AccordionContent>First expandable section.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Multiple Expansion #2</AccordionTrigger>
        <AccordionContent>Second expandable section.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1" className="border-blue-200">
        <AccordionTrigger className="text-blue-600">
          Custom Styled
        </AccordionTrigger>
        <AccordionContent className="bg-blue-50">
          This accordion has custom colors and styling.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const NestedContent: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Nested Content</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <h4 className="font-medium">Nested Heading</h4>
            <p>Some paragraph text.</p>
            <ul className="list-disc pl-4">
              <li>List item one</li>
              <li>List item two</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <span className="flex items-center gap-2">📱 With Icons</span>
        </AccordionTrigger>
        <AccordionContent>Content with icons in the trigger.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled Item</AccordionTrigger>
        <AccordionContent>This item can be expanded.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled Item</AccordionTrigger>
        <AccordionContent>This item cannot be expanded.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const WithDefaultValue: Story = {
  render: () => (
    <Accordion type="single" defaultValue="item-1" className="w-[400px]">
      <AccordionItem value="item-1">
        <AccordionTrigger>Pre-expanded Item</AccordionTrigger>
        <AccordionContent>This item is expanded by default.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Collapsed Item</AccordionTrigger>
        <AccordionContent>This item starts collapsed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const Compact: Story = {
  render: () => (
    <Accordion type="single" className="w-[400px]">
      <AccordionItem value="item-1" className="py-1">
        <AccordionTrigger className="text-sm">Compact Style</AccordionTrigger>
        <AccordionContent className="text-xs">
          A more compact version of the accordion.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
