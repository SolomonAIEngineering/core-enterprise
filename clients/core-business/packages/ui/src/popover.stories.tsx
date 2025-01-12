import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { Button } from './button'
import { Popover } from './popover'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible popover component with mobile drawer support and customizable content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={<div className="p-4">Basic popover content</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <Button onClick={() => setOpenPopover(true)}>Open Popover</Button>
      </Popover>
    )
  },
}

export const WithCustomAlignment: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={<div className="p-4">Right-aligned popover</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        align="end"
      >
        <Button onClick={() => setOpenPopover(true)}>Right Aligned</Button>
      </Popover>
    )
  },
}

export const WithCustomSide: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={<div className="p-4">Top-side popover</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        side="top"
      >
        <Button onClick={() => setOpenPopover(true)}>Top Side</Button>
      </Popover>
    )
  },
}

export const MobileOnly: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={<div className="p-4">Mobile-only content</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        mobileOnly
      >
        <Button onClick={() => setOpenPopover(true)}>Mobile Only</Button>
      </Popover>
    )
  },
}

export const WithRichContent: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={
          <div className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Rich Content</h3>
            <p className="text-gray-600">
              This is a detailed description with rich content.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setOpenPopover(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpenPopover(false)}>Confirm</Button>
            </div>
          </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        popoverContentClassName="min-w-[300px]"
      >
        <Button onClick={() => setOpenPopover(true)}>Rich Content</Button>
      </Popover>
    )
  },
}

export const WithCustomStyles: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={<div className="p-4">Custom styled popover</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        popoverContentClassName="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
      >
        <Button onClick={() => setOpenPopover(true)}>Custom Styles</Button>
      </Popover>
    )
  },
}

export const WithEscapeHandler: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={<div className="p-4">Press ESC to close</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        onEscapeKeyDown={() => {
          console.log('Escape key pressed')
          setOpenPopover(false)
        }}
      >
        <Button onClick={() => setOpenPopover(true)}>
          With Escape Handler
        </Button>
      </Popover>
    )
  },
}

export const WithStickyBehavior: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    return (
      <Popover
        content={<div className="p-4">Sticky popover content</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        sticky="always"
      >
        <Button onClick={() => setOpenPopover(true)}>Sticky Popover</Button>
      </Popover>
    )
  },
}

export const WithScrollableContent: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    const items = Array.from({ length: 10 }, (_, i) => ({
      id: `item-${i}`,
      label: `Item ${i + 1}`,
    }))
    return (
      <Popover
        content={
          <div className="max-h-[200px] overflow-y-auto p-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-100 py-2 last:border-0"
              >
                {item.label}
              </div>
            ))}
          </div>
        }
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        onWheel={(e) => e.stopPropagation()}
      >
        <Button onClick={() => setOpenPopover(true)}>Scrollable Content</Button>
      </Popover>
    )
  },
}

export const WithCustomTrigger: Story = {
  render: () => {
    const [openPopover, setOpenPopover] = useState(false)
    const handleOpen = () => setOpenPopover(true)
    return (
      <Popover
        content={<div className="p-4">Custom trigger popover</div>}
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          type="button"
          className="cursor-pointer rounded-lg bg-gray-100 px-4 py-2 hover:bg-gray-200"
          onClick={handleOpen}
        >
          Custom Trigger
        </button>
      </Popover>
    )
  },
}
