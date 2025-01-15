import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { Button } from './button'
import { Modal } from './modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile modal component with mobile drawer support and customizable content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Open Modal</Button>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Modal Title</h2>
            <p className="text-gray-600">This is a basic modal example.</p>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithCustomStyles: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Custom Styled Modal</Button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          className="bg-gradient-to-br from-purple-50 to-blue-50"
        >
          <div className="p-8">
            <h2 className="mb-4 text-2xl font-bold text-purple-800">
              Custom Styled Modal
            </h2>
            <p className="text-gray-700">
              This modal has custom styling applied.
            </p>
          </div>
        </Modal>
      </>
    )
  },
}

export const PreventDefaultClose: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>
          Modal with Prevent Close
        </Button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          preventDefaultClose
        >
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Cannot Close by Default</h2>
            <p className="mb-4 text-gray-600">
              This modal prevents default closing behavior.
            </p>
            <Button onClick={() => setShowModal(false)}>Close Modal</Button>
          </div>
        </Modal>
      </>
    )
  },
}

export const DesktopOnly: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Desktop Only Modal</Button>
        <Modal showModal={showModal} setShowModal={setShowModal} desktopOnly>
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Desktop Only Modal</h2>
            <p className="text-gray-600">
              This modal only shows on desktop devices.
            </p>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithCustomContent: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Rich Content Modal</Button>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Rich Content Example</h2>
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-2 font-medium">Section 1</h3>
              <p className="text-gray-600">Content for section 1</p>
            </div>
            <div className="rounded-lg bg-gray-100 p-4">
              <h3 className="mb-2 font-medium">Section 2</h3>
              <p className="text-gray-600">Content for section 2</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowModal(false)}>Save</Button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithForm: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Form Modal</Button>
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Form Example</h2>
            <form className="space-y-4">
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
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowModal(false)}>Submit</Button>
              </div>
            </form>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithCustomWidth: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Wide Modal</Button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          className="max-w-4xl"
        >
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Wide Modal</h2>
            <p className="text-gray-600">
              This modal has a custom maximum width applied.
            </p>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithCustomClose: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        <Button onClick={() => setShowModal(true)}>Custom Close Modal</Button>
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          onClose={() => {
            console.log('Modal closed')
            setShowModal(false)
          }}
        >
          <div className="p-6">
            <h2 className="mb-4 text-xl font-bold">Custom Close Handler</h2>
            <p className="text-gray-600">
              This modal has a custom close handler.
            </p>
          </div>
        </Modal>
      </>
    )
  },
}
