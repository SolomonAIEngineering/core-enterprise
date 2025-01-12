import type { Meta, StoryObj } from '@storybook/react'

import { BlurImage } from './blur-image'

const meta: Meta<typeof BlurImage> = {
  title: 'Components/BlurImage',
  component: BlurImage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An image component with blur loading effect and fallback support.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BlurImage>

export const Default: Story = {
  render: () => (
    <BlurImage
      src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
      alt="Sample Image"
      width={300}
      height={200}
    />
  ),
}

export const SmallImage: Story = {
  render: () => (
    <BlurImage
      src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
      alt="Small Image"
      width={150}
      height={100}
      className="rounded"
    />
  ),
}

export const LargeImage: Story = {
  render: () => (
    <BlurImage
      src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
      alt="Large Image"
      width={600}
      height={400}
      className="rounded-lg"
    />
  ),
}

export const CircularImage: Story = {
  render: () => (
    <BlurImage
      src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
      alt="Circular Image"
      width={200}
      height={200}
      className="rounded-full"
    />
  ),
}

export const WithBorder: Story = {
  render: () => (
    <BlurImage
      src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
      alt="Bordered Image"
      width={300}
      height={200}
      className="rounded-lg border-2 border-gray-200"
    />
  ),
}

export const WithShadow: Story = {
  render: () => (
    <BlurImage
      src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
      alt="Shadow Image"
      width={300}
      height={200}
      className="rounded-lg shadow-lg"
    />
  ),
}

export const FallbackAvatar: Story = {
  render: () => (
    <BlurImage
      src="invalid-image-url"
      alt="John Doe"
      width={100}
      height={100}
      className="rounded-full"
    />
  ),
}

export const ImageGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <BlurImage
          key={`image-${i}-${Date.now()}`}
          src={`https://images.unsplash.com/photo-${1706502563914 + i}`}
          alt={`Grid Image ${i + 1}`}
          width={150}
          height={100}
          className="rounded"
        />
      ))}
    </div>
  ),
}

export const AspectRatios: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <BlurImage
        src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
        alt="Square"
        width={200}
        height={200}
        className="rounded"
      />
      <BlurImage
        src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
        alt="Landscape"
        width={300}
        height={200}
        className="rounded"
      />
      <BlurImage
        src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
        alt="Portrait"
        width={200}
        height={300}
        className="rounded"
      />
    </div>
  ),
}

export const WithOverlay: Story = {
  render: () => (
    <div className="relative">
      <BlurImage
        src="https://images.unsplash.com/photo-1706502563914-b95a18f97bd4"
        alt="Overlay Image"
        width={300}
        height={200}
        className="rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50 text-white">
        Overlay Text
      </div>
    </div>
  ),
}
