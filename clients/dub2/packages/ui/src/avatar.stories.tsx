import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, TokenAvatar } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar component that displays user images with fallback support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: () => (
    <Avatar
      user={{
        name: 'John Doe',
        email: 'john@example.com',
      }}
    />
  ),
}

export const WithImage: Story = {
  render: () => (
    <Avatar
      user={{
        name: 'Jane Smith',
        email: 'jane@example.com',
        image: 'https://api.dicebear.com/9.x/micah/svg?seed=jane',
      }}
    />
  ),
}

export const WithId: Story = {
  render: () => (
    <Avatar
      user={{
        id: '123',
        name: 'Bob Wilson',
        email: 'bob@example.com',
      }}
    />
  ),
}

export const NoUser: Story = {
  render: () => <Avatar />,
}

export const CustomSize: Story = {
  render: () => (
    <Avatar
      user={{
        name: 'Alice Brown',
        email: 'alice@example.com',
      }}
      className="h-16 w-16"
    />
  ),
}

export const MultipleAvatars: Story = {
  render: () => (
    <div className="flex space-x-2">
      <Avatar
        user={{
          name: 'User 1',
          email: 'user1@example.com',
        }}
      />
      <Avatar
        user={{
          name: 'User 2',
          email: 'user2@example.com',
        }}
      />
      <Avatar
        user={{
          name: 'User 3',
          email: 'user3@example.com',
        }}
      />
    </div>
  ),
}

export const TokenAvatarExample: Story = {
  render: () => (
    <div className="flex space-x-2">
      <TokenAvatar id="token1" />
      <TokenAvatar id="token2" />
      <TokenAvatar id="token3" />
    </div>
  ),
}

export const TokenAvatarCustomSize: Story = {
  render: () => <TokenAvatar id="large-token" className="h-16 w-16" />,
}

export const AvatarGrid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Avatar
          key={`avatar-${i}-${Date.now()}`}
          user={{
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
          }}
        />
      ))}
    </div>
  ),
}

export const AvatarSizes: Story = {
  render: () => (
    <div className="flex items-end space-x-4">
      <Avatar
        user={{ name: 'Small', email: 'small@example.com' }}
        className="h-8 w-8"
      />
      <Avatar
        user={{ name: 'Medium', email: 'medium@example.com' }}
        className="h-12 w-12"
      />
      <Avatar
        user={{ name: 'Large', email: 'large@example.com' }}
        className="h-16 w-16"
      />
      <Avatar
        user={{ name: 'XLarge', email: 'xlarge@example.com' }}
        className="h-20 w-20"
      />
    </div>
  ),
}
