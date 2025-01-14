import { BusinessConfig as platform } from '@dub/platform-config'
import type { Meta, StoryObj } from '@storybook/react'
import { ResourcesContent } from './resources-content'

const meta = {
  component: ResourcesContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResourcesContent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    domain: platform.domain,
  },
}

export const CustomDomain: Story = {
  args: {
    domain: 'custom-domain.com',
  },
}

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  args: {
    domain: platform.domain,
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
}
