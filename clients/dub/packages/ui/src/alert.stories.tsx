import type { Meta, StoryObj } from '@storybook/react'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Terminal,
} from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './alert'

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Displays a callout for user attention with various states and styles.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>This is a default alert message.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again.
      </AlertDescription>
    </Alert>
  ),
}

export const InfoAlert: Story = {
  render: () => (
    <Alert className="border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-600">Information</AlertTitle>
      <AlertDescription className="text-blue-600">
        Here's some helpful information for you.
      </AlertDescription>
    </Alert>
  ),
}

export const WarningAlert: Story = {
  render: () => (
    <Alert className="border-yellow-200 bg-yellow-50">
      <AlertTriangle className="h-4 w-4 text-yellow-600" />
      <AlertTitle className="text-yellow-600">Warning</AlertTitle>
      <AlertDescription className="text-yellow-600">
        Please be cautious about this action.
      </AlertDescription>
    </Alert>
  ),
}

export const SuccessAlert: Story = {
  render: () => (
    <Alert className="border-green-200 bg-green-50">
      <CheckCircle2 className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-600">Success</AlertTitle>
      <AlertDescription className="text-green-600">
        Operation completed successfully!
      </AlertDescription>
    </Alert>
  ),
}

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>No Icon Alert</AlertTitle>
      <AlertDescription>This alert doesn't include an icon.</AlertDescription>
    </Alert>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Title Only Alert</AlertTitle>
    </Alert>
  ),
}

export const DescriptionOnly: Story = {
  render: () => (
    <Alert>
      <AlertDescription>
        This alert only contains a description without a title.
      </AlertDescription>
    </Alert>
  ),
}

export const CustomContent: Story = {
  render: () => (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Custom Content</AlertTitle>
      <AlertDescription>
        <div className="mt-2 space-y-2">
          <p>This alert contains custom content including:</p>
          <ul className="list-disc pl-4">
            <li>Multiple paragraphs</li>
            <li>List items</li>
            <li>Custom formatting</li>
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  ),
}

export const Compact: Story = {
  render: () => (
    <Alert className="py-3">
      <Info className="h-3 w-3" />
      <AlertTitle className="text-sm">Compact Alert</AlertTitle>
      <AlertDescription className="text-xs">
        A more compact version of the alert component.
      </AlertDescription>
    </Alert>
  ),
}
