import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'
import { AnimatedSizeContainer } from './animated-size-container'

const meta: Meta<typeof AnimatedSizeContainer> = {
  title: 'Components/AnimatedSizeContainer',
  component: AnimatedSizeContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A container that smoothly animates its size based on its content.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AnimatedSizeContainer>

export const AnimatedHeight: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div className="w-[300px]">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Toggle Content
        </button>
        <AnimatedSizeContainer height>
          <div className="rounded border border-gray-200 p-4">
            <p>Always visible content</p>
            {expanded && (
              <div className="mt-4">
                <p>This content animates in and out</p>
                <p>With smooth height transitions</p>
              </div>
            )}
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}

export const AnimatedWidth: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Toggle Width
        </button>
        <AnimatedSizeContainer width>
          <div className="rounded border border-gray-200 p-4">
            <p>
              {expanded
                ? 'This is a longer text that expands the width smoothly'
                : 'Short text'}
            </p>
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}

export const BothDimensions: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Toggle Size
        </button>
        <AnimatedSizeContainer width height>
          <div className="rounded border border-gray-200 p-4">
            {expanded ? (
              <>
                <p>This content is larger</p>
                <p>It expands in both directions</p>
                <p>With smooth animations</p>
              </>
            ) : (
              <p>Small content</p>
            )}
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}

export const CustomTransition: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Toggle
        </button>
        <AnimatedSizeContainer
          height
          transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        >
          <div className="rounded border border-gray-200 p-4">
            <p>Basic content</p>
            {expanded && (
              <p className="mt-4">Extra content with custom spring animation</p>
            )}
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}

export const ListAnimation: Story = {
  render: () => {
    const [items, setItems] = useState([1])
    return (
      <div>
        <button
          type="button"
          onClick={() => setItems([...items, items.length + 1])}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add Item
        </button>
        <AnimatedSizeContainer height>
          <div className="rounded border border-gray-200">
            {items.map((item) => (
              <div
                key={item}
                className="border-b border-gray-200 p-4 last:border-none"
              >
                Item {item}
              </div>
            ))}
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}

export const CardExpansion: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false)
    return (
      <div>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Toggle Details
        </button>
        <AnimatedSizeContainer height>
          <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="mt-2 text-gray-600">Basic card content</p>
            {expanded && (
              <div className="mt-4 space-y-2 text-gray-600">
                <p>Additional details appear here</p>
                <p>With smooth height animation</p>
                <p>And proper spacing</p>
              </div>
            )}
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}

export const AccordionStyle: Story = {
  render: () => {
    const [activeSection, setActiveSection] = useState<number | null>(null)
    return (
      <div className="w-[300px]">
        {[1, 2, 3].map((section) => (
          <div key={section} className="border-b border-gray-200">
            <button
              type="button"
              onClick={() =>
                setActiveSection(activeSection === section ? null : section)
              }
              className="flex w-full justify-between p-4 text-left hover:bg-gray-50"
            >
              <span>Section {section}</span>
              <span>{activeSection === section ? '−' : '+'}</span>
            </button>
            <AnimatedSizeContainer height>
              {activeSection === section && (
                <div className="bg-gray-50 p-4">
                  Content for section {section}
                </div>
              )}
            </AnimatedSizeContainer>
          </div>
        ))}
      </div>
    )
  },
}

export const TabPanels: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState(1)
    return (
      <div className="w-[300px]">
        <div className="mb-4 flex space-x-2">
          {[1, 2, 3].map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded px-4 py-2 ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Tab {tab}
            </button>
          ))}
        </div>
        <AnimatedSizeContainer height>
          <div className="rounded border border-gray-200 p-4">
            {activeTab === 1 && <p>Content for first tab</p>}
            {activeTab === 2 && (
              <div>
                <p>Content for second tab</p>
                <p className="mt-2">With multiple lines</p>
              </div>
            )}
            {activeTab === 3 && (
              <div>
                <p>Content for third tab</p>
                <p className="mt-2">With even more content</p>
                <p className="mt-2">And another line</p>
              </div>
            )}
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}

export const FormFields: Story = {
  render: () => {
    const [showOptional, setShowOptional] = useState(false)
    return (
      <div className="w-[300px]">
        <div className="space-y-4 rounded border border-gray-200 p-4">
          <div>
            <label
              htmlFor="required-field"
              className="block text-sm font-medium text-gray-700"
            >
              Required Field
            </label>
            <input
              id="required-field"
              type="text"
              className="mt-1 block w-full rounded border p-2"
            />
          </div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showOptional}
              onChange={(e) => setShowOptional(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">Show optional fields</span>
          </label>
          <AnimatedSizeContainer height>
            {showOptional && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="optional-field-1"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Optional Field 1
                  </label>
                  <input
                    id="optional-field-1"
                    type="text"
                    className="mt-1 block w-full rounded border p-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="optional-field-2"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Optional Field 2
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded border p-2"
                  />
                </div>
              </div>
            )}
          </AnimatedSizeContainer>
        </div>
      </div>
    )
  },
}

export const NotificationList: Story = {
  render: () => {
    const [notifications, setNotifications] = useState([
      { id: 1, text: 'First notification' },
    ])

    const addNotification = () => {
      setNotifications([
        ...notifications,
        { id: Date.now(), text: `Notification ${notifications.length + 1}` },
      ])
    }

    return (
      <div className="w-[300px]">
        <button
          type="button"
          onClick={addNotification}
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Add Notification
        </button>
        <AnimatedSizeContainer height>
          <div className="space-y-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="rounded border border-gray-200 p-4 shadow-sm"
              >
                {notification.text}
              </div>
            ))}
          </div>
        </AnimatedSizeContainer>
      </div>
    )
  },
}
