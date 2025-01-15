import type { Meta, StoryObj } from '@storybook/react'
import {
  COMPARE_PAGES,
  CUSTOMER_STORIES,
  FEATURES_LIST,
  LEGAL_PAGES,
  RESOURCES,
  SDKS,
} from './content'

const meta = {
  title: 'Content/Lists',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Content lists and configurations used throughout the application.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Features: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Features</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURES_LIST.map((feature) => (
          <div
            key={feature.title}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2">
              <feature.icon className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="font-medium">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const CustomerStories: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Customer Stories</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {CUSTOMER_STORIES.map((story) => (
          <div
            key={story.title}
            className="group rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2">
              <story.icon className={story.iconClassName} />
            </div>
            <h3 className="font-medium">{story.title}</h3>
            <p className="text-sm text-gray-600">{story.description}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const SDKsList: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">SDKs</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {SDKS.map((sdk) => (
          <div
            key={sdk.title}
            className="group rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2">
              <sdk.icon className={sdk.iconClassName} />
            </div>
            <h3 className="font-medium">{sdk.title}</h3>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const ResourcesList: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Resources</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {RESOURCES.map((resource) => (
          <div
            key={resource.title}
            className="rounded-lg border border-gray-200 p-4"
          >
            <div className="mb-2">
              <resource.icon className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="font-medium">{resource.title}</h3>
            <p className="text-sm text-gray-600">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const ComparePagesList: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Compare Pages</h2>
      <div className="flex flex-wrap gap-2">
        {COMPARE_PAGES.map((page) => (
          <div
            key={page.slug}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm"
          >
            {page.name}
          </div>
        ))}
      </div>
    </div>
  ),
}

export const LegalPagesList: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Legal Pages</h2>
      <div className="flex flex-wrap gap-2">
        {LEGAL_PAGES.map((page) => (
          <div
            key={page.slug}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm"
          >
            {page.name}
          </div>
        ))}
      </div>
    </div>
  ),
}

export const FeaturesGrid: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Features Grid</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES_LIST.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mb-4">
              <feature.icon className="h-8 w-8 text-gray-600 group-hover:text-blue-500" />
            </div>
            <h3 className="mb-2 font-medium group-hover:text-blue-500">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const SDKsGrid: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">SDKs Grid</h2>
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {SDKS.map((sdk) => (
          <div
            key={sdk.title}
            className="group rounded-lg border border-gray-200 p-6 text-center transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mb-4 flex justify-center">
              <sdk.icon className={`h-12 w-12 ${sdk.iconClassName}`} />
            </div>
            <h3 className="font-medium">{sdk.title}</h3>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const ResourcesCards: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Resources Cards</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {RESOURCES.map((resource) => (
          <div
            key={resource.title}
            className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-100">
              <resource.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-500" />
            </div>
            <h3 className="mb-2 font-medium group-hover:text-blue-500">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-600">{resource.description}</p>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const CustomerStoriesCards: Story = {
  render: () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Customer Stories Cards</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {CUSTOMER_STORIES.map((story) => (
          <div
            key={story.title}
            className="group rounded-lg border border-gray-200 p-6 transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-gray-200">
              <story.icon className={`h-10 w-10 ${story.iconClassName}`} />
            </div>
            <h3 className="mb-2 font-medium">{story.title}</h3>
            <p className="text-sm text-gray-600">{story.description}</p>
            <div className="mt-4">
              <span className="text-sm font-medium text-blue-500 group-hover:text-blue-600">
                Read story →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}
