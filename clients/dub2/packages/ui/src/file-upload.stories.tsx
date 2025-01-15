import type { Meta, StoryObj } from '@storybook/react'

import { FileUpload } from './file-upload'

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible file upload component with drag and drop support, image preview, and various customization options.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[300px] w-[600px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FileUpload>

export const Default: Story = {
  args: {
    accept: 'any',
    content: 'Drag and drop or click to upload any file',
    readFile: false,
    onChange: ({ file }) => {
      console.log('File uploaded:', file)
    },
  },
}

export const ImageUpload: Story = {
  args: {
    accept: 'images',
    content: 'Upload images (.png or .jpg)',
    readFile: true,
    onChange: ({ file, src }) => {
      console.log('File uploaded:', file)
      console.log('Image source:', src)
    },
  },
}

export const CSVUpload: Story = {
  args: {
    accept: 'csv',
    content: 'Upload CSV files only',
    variant: 'plain',
    readFile: false,
    onChange: ({ file }) => {
      console.log('CSV uploaded:', file)
    },
  },
}

export const WithMaxFileSize: Story = {
  args: {
    accept: 'any',
    maxFileSizeMB: 5,
    content: 'Maximum file size: 5MB',
    readFile: false,
    onChange: ({ file }) => {
      console.log('File uploaded:', file)
    },
  },
}

export const WithTargetResolution: Story = {
  args: {
    accept: 'images',
    targetResolution: { width: 1200, height: 630 },
    content: 'Upload image (will be resized to 1200x630)',
    readFile: true,
    onChange: ({ file, src }) => {
      console.log('File uploaded:', file)
      console.log('Image source:', src)
    },
  },
}

export const Disabled: Story = {
  args: {
    accept: 'any',
    disabled: true,
    content: 'Upload is disabled',
    readFile: false,
    onChange: ({ file }) => {
      console.log('File uploaded:', file)
    },
  },
}

export const Loading: Story = {
  args: {
    accept: 'any',
    loading: true,
    content: 'Processing upload...',
    readFile: false,
    onChange: ({ file }) => {
      console.log('File uploaded:', file)
    },
  },
}

export const WithCustomPreview: Story = {
  args: {
    accept: 'images',
    readFile: true,
    imageSrc: 'https://picsum.photos/1200/630',
    onChange: ({ file, src }) => {
      console.log('File uploaded:', file)
      console.log('Image source:', src)
    },
    customPreview: (
      <div className="flex h-full w-full items-center justify-center bg-gray-100">
        <p className="text-gray-500">Custom Preview Component</p>
      </div>
    ),
  },
}

export const WithoutHoverOverlay: Story = {
  args: {
    accept: 'images',
    readFile: true,
    imageSrc: 'https://picsum.photos/1200/630',
    showHoverOverlay: false,
    onChange: ({ file, src }) => {
      console.log('File uploaded:', file)
      console.log('Image source:', src)
    },
  },
}

export const WithCustomStyles: Story = {
  args: {
    accept: 'any',
    className: 'border-2 border-blue-500 rounded-lg',
    iconClassName: 'text-blue-500',
    content: 'Upload with custom styling',
    readFile: false,
    onChange: ({ file }) => {
      console.log('File uploaded:', file)
    },
  },
}
