import type { Meta, StoryObj } from '@storybook/react'
import { Popup, PopupContext } from './popup'

import { useContext } from 'react'
import { Button } from './button'

const meta: Meta<typeof Popup> = {
  title: 'Components/Popup',
  component: Popup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popup component with cookie-based persistence and animation support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Popup>

const PopupContent = () => {
  const { hidePopup } = useContext(PopupContext)
  return (
    <div className="animate-fade-in fixed bottom-4 right-4 max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      <h3 className="mb-2 text-lg font-medium">Welcome!</h3>
      <p className="mb-4 text-gray-600">
        This is a sample popup message that can be dismissed.
      </p>
      <Button onClick={hidePopup}>Got it</Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <Popup hiddenCookieId="default-popup">
      <PopupContent />
    </Popup>
  ),
}

export const WithCustomContent: Story = {
  render: () => {
    const CustomContent = () => {
      const { hidePopup } = useContext(PopupContext)
      return (
        <div className="animate-slide-in fixed left-4 top-4 max-w-sm rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white shadow-lg">
          <h3 className="mb-3 text-xl font-bold">Special Offer!</h3>
          <p className="mb-4">
            Limited time offer with custom styling and positioning.
          </p>
          <div className="flex space-x-2">
            <Button
              onClick={hidePopup}
              className="bg-white text-blue-500 hover:bg-gray-100"
            >
              Claim Now
            </Button>
            <Button
              onClick={hidePopup}
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      )
    }

    return (
      <Popup hiddenCookieId="custom-popup">
        <CustomContent />
      </Popup>
    )
  },
}

export const WithNotification: Story = {
  render: () => {
    const NotificationContent = () => {
      const { hidePopup } = useContext(PopupContext)
      return (
        <div className="animate-slide-down fixed right-4 top-4 max-w-sm rounded-lg border border-green-200 bg-green-50 p-4 shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <title>Success Icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Successfully saved!
              </p>
              <p className="mt-1 text-sm text-green-600">
                Your changes have been saved successfully.
              </p>
            </div>
            <button
              type="button"
              onClick={hidePopup}
              className="ml-auto flex-shrink-0 text-green-500 hover:text-green-700"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <title>Close Icon</title>
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )
    }

    return (
      <Popup hiddenCookieId="notification-popup">
        <NotificationContent />
      </Popup>
    )
  },
}

export const WithCookieWarning: Story = {
  render: () => {
    const CookieWarning = () => {
      const { hidePopup } = useContext(PopupContext)
      return (
        <div className="animate-slide-up fixed bottom-0 left-0 right-0 bg-gray-900 p-4 text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <p className="text-sm">
              We use cookies to enhance your browsing experience. By continuing
              to use our website, you agree to our use of cookies.
            </p>
            <div className="ml-4 flex-shrink-0">
              <Button
                onClick={hidePopup}
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Accept
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <Popup hiddenCookieId="cookie-warning">
        <CookieWarning />
      </Popup>
    )
  },
}
