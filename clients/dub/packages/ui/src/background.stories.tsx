import type { Meta, StoryObj } from '@storybook/react'

import { Background } from './background'

const meta: Meta<typeof Background> = {
  title: 'Components/Background',
  component: Background,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A background component with gradient and grid effects.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Background>

export const Default: Story = {
  render: () => <Background />,
}

export const WithContent: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur">
          <h1 className="text-2xl font-bold">Content Title</h1>
          <p className="mt-2">Some content overlaying the background</p>
        </div>
      </div>
    </div>
  ),
}

export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <Background />
    </div>
  ),
}

export const WithHeader: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <header className="relative z-10 border-b border-gray-200 bg-white/80 p-4 backdrop-blur">
        <nav className="mx-auto max-w-7xl">
          <h1 className="text-xl font-bold">Website Title</h1>
        </nav>
      </header>
      <main className="relative z-10 p-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold">Main Content</h2>
        </div>
      </main>
    </div>
  ),
}

export const WithCards: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 p-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-lg bg-white/80 p-6 shadow-lg backdrop-blur"
            >
              <h3 className="text-lg font-semibold">Card {i}</h3>
              <p className="mt-2">Card content goes here</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
}

export const WithSidebar: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 flex">
        <aside className="w-64 border-r border-gray-200 bg-white/80 p-4 backdrop-blur">
          <nav className="space-y-2">
            <a href="/menu-1" className="block rounded p-2 hover:bg-gray-100">
              Menu Item 1
            </a>
            <a href="/menu-2" className="block rounded p-2 hover:bg-gray-100">
              Menu Item 2
            </a>
            <a href="/menu-3" className="block rounded p-2 hover:bg-gray-100">
              Menu Item 3
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <div className="rounded-lg bg-white/80 p-6 backdrop-blur">
            <h2 className="text-2xl font-bold">Main Content</h2>
            <p className="mt-4">Content with sidebar layout</p>
          </div>
        </main>
      </div>
    </div>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col">
        <main className="flex-1 p-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold">Main Content</h2>
          </div>
        </main>
        <footer className="border-t border-gray-200 bg-white/80 p-8 backdrop-blur">
          <div className="mx-auto max-w-7xl text-center">
            <p>&copy; 2024 Example Company</p>
          </div>
        </footer>
      </div>
    </div>
  ),
}

export const WithHero: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">Hero Title</h1>
          <p className="mt-4 text-xl">Hero subtitle or description</p>
          <button
            type="button"
            className="mt-8 rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600"
          >
            Call to Action
          </button>
        </div>
      </div>
    </div>
  ),
}

export const WithForm: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white/90 p-8 shadow-lg backdrop-blur">
          <h2 className="text-2xl font-bold">Contact Form</h2>
          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  ),
}

export const WithGrid: Story = {
  render: () => (
    <div className="relative min-h-screen">
      <Background />
      <div className="relative z-10 p-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`grid-item-${i}-${Date.now()}`}
                className="aspect-square rounded-lg bg-white/80 p-4 shadow backdrop-blur"
              >
                Grid Item {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
}
