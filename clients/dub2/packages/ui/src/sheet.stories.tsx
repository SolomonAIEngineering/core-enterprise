import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { Button } from './button'
import { Sheet } from './sheet'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sheet component that slides in from the side with customizable content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
          className="bg-primary text-secondary w-full"
        >
          Open Sheet
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="p-6">
            <Sheet.Title>Sheet Title</Sheet.Title>
            <Sheet.Description>
              This is a basic sheet example with a title and description.
            </Sheet.Description>
            <div className="mt-4">
              <p className="text-gray-600">Sheet content goes here.</p>
            </div>
          </div>
        </Sheet>
      </>
    )
  },
}

export const WithCustomContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Rich Content Sheet</Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="space-y-4 p-6">
            <Sheet.Title>Rich Content Example</Sheet.Title>
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-medium">Section 1</h3>
              <p className="text-gray-600">Content for section 1</p>
            </div>
            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="mb-2 font-medium">Section 2</h3>
              <p className="text-gray-600">Content for section 2</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Sheet.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Sheet.Close>
              <Sheet.Close asChild>
                <Button>Save</Button>
              </Sheet.Close>
            </div>
          </div>
        </Sheet>
      </>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Form Sheet</Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="p-6">
            <Sheet.Title>Form Example</Sheet.Title>
            <form className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Sheet.Close asChild>
                  <Button variant="outline">Cancel</Button>
                </Sheet.Close>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </Sheet>
      </>
    )
  },
}

export const Nested: Story = {
  render: () => {
    const [parentOpen, setParentOpen] = useState(false)
    const [childOpen, setChildOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setParentOpen(true)}>Open Parent Sheet</Button>
        <Sheet open={parentOpen} onOpenChange={setParentOpen}>
          <div className="p-6">
            <Sheet.Title>Parent Sheet</Sheet.Title>
            <div className="mt-4">
              <Button onClick={() => setChildOpen(true)}>
                Open Child Sheet
              </Button>
              <Sheet nested open={childOpen} onOpenChange={setChildOpen}>
                <div className="p-6">
                  <Sheet.Title>Child Sheet</Sheet.Title>
                  <Sheet.Description>
                    This is a nested sheet example.
                  </Sheet.Description>
                  <div className="mt-4">
                    <Sheet.Close asChild>
                      <Button>Close Child</Button>
                    </Sheet.Close>
                  </div>
                </div>
              </Sheet>
            </div>
          </div>
        </Sheet>
      </>
    )
  },
}

export const WithCustomStyles: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Styled Sheet</Button>
        <Sheet
          open={open}
          onOpenChange={setOpen}
          contentProps={{
            className: 'bg-gradient-to-br from-purple-50 to-blue-50',
          }}
        >
          <div className="p-6">
            <Sheet.Title className="text-purple-800">
              Custom Styled Sheet
            </Sheet.Title>
            <Sheet.Description className="text-purple-600">
              This sheet has custom styling applied.
            </Sheet.Description>
            <div className="mt-4">
              <Sheet.Close asChild>
                <Button className="bg-purple-500 hover:bg-purple-600">
                  Close
                </Button>
              </Sheet.Close>
            </div>
          </div>
        </Sheet>
      </>
    )
  },
}
