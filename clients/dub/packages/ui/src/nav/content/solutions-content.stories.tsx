import { BusinessConfig as platform } from '@dub/platform-config'
import type { Meta, StoryObj } from '@storybook/react'
import { SolutionsContent } from './solutions-content'
const meta = {
  component: SolutionsContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SolutionsContent>

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
