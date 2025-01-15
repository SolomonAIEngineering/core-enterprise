import * as IconComponents from './index'

import type { Meta, StoryObj } from '@storybook/react'

import type { ComponentType } from 'react'

interface IconProps {
  className?: string
}

const meta: Meta = {
  title: 'Components/Icons',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A collection of custom icons used throughout the application, including social media, tech stacks, loading states, and more.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="font-sans">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj

// Helper component to display icons with labels
const IconDisplay = ({
  name,
  Icon,
}: {
  name: string
  Icon: ComponentType<{ className: string }>
}) => (
  <div className="m-2 flex flex-col items-center justify-center rounded-lg border p-4 transition-colors hover:bg-gray-50">
    <Icon className="h-8 w-8" />
    <span className="mt-2 text-sm text-gray-600">{name}</span>
  </div>
)

// Helper component to create a grid of icons
const IconGrid = ({
  icons,
}: {
  icons: Record<string, ComponentType<{ className: string }>>
}) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
    {Object.entries(icons).map(([name, Icon]) => (
      <IconDisplay key={name} name={name} Icon={Icon} />
    ))}
  </div>
)

export const SocialMediaIcons: Story = {
  render: () => {
    const socialIcons = {
      Facebook: IconComponents.Facebook,
      Github: IconComponents.Github,
      Google: IconComponents.Google,
      LinkedIn: IconComponents.LinkedIn,
      Twitter: IconComponents.Twitter,
      YouTube: IconComponents.YouTube,
      ProductHunt: IconComponents.ProductHunt,
      Raycast: IconComponents.Raycast,
      Tinybird: IconComponents.Tinybird,
      Unsplash: IconComponents.Unsplash,
    } as const

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Social Media Icons</h3>
        <IconGrid icons={socialIcons} />
      </div>
    )
  },
}

export const TechStackIcons: Story = {
  render: () => {
    const techIcons = {
      Typescript: IconComponents.Typescript,
      Python: IconComponents.Python,
      Ruby: IconComponents.Ruby,
      Php: IconComponents.Php,
      Go: IconComponents.Go,
      Prisma: IconComponents.Prisma,
    } as const

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tech Stack Icons</h3>
        <IconGrid icons={techIcons} />
      </div>
    )
  },
}

export const LoadingIcons: Story = {
  render: () => {
    const loadingIcons = {
      LoadingSpinner: IconComponents.LoadingSpinner,
      LoadingCircle: IconComponents.LoadingCircle,
      LoadingDots: IconComponents.LoadingDots,
    } as const

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Loading State Icons</h3>
        <IconGrid icons={loadingIcons} />
      </div>
    )
  },
}

export const UtilityIcons: Story = {
  render: () => {
    const utilityIcons = {
      Copy: IconComponents.Copy,
      ExpandingArrow: IconComponents.ExpandingArrow,
      Magic: IconComponents.Magic,
      MatrixLines: IconComponents.MatrixLines,
      Photo: IconComponents.Photo,
      Success: IconComponents.Success,
      Tick: IconComponents.Tick,
    } as const

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Utility Icons</h3>
        <IconGrid icons={utilityIcons} />
      </div>
    )
  },
}

export const DefaultDomainIcons: Story = {
  render: () => {
    const domainIcons = {
      Amazon: IconComponents.Amazon,
      ChatGPT: IconComponents.ChatGPT,
      Figma: IconComponents.Figma,
      GitHubEnhanced: IconComponents.GitHubEnhanced,
      GoogleEnhanced: IconComponents.GoogleEnhanced,
      Spotify: IconComponents.Spotify,
    } as const

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Default Domain Icons</h3>
        <IconGrid icons={domainIcons} />
      </div>
    )
  },
}

export const ContinentIcons: Story = {
  render: () => {
    const continentIcons = {
      Africa: IconComponents.Africa,
      Asia: IconComponents.Asia,
      Europe: IconComponents.Europe,
      NorthAmerica: IconComponents.NorthAmerica,
      Oceania: IconComponents.Oceania,
      SouthAmerica: IconComponents.SouthAmerica,
    } as const

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Continent Icons</h3>
        <IconGrid icons={continentIcons} />
      </div>
    )
  },
}

export const PayoutPlatformIcons: Story = {
  render: () => {
    const payoutPlatformIcons = {
      Airtm: IconComponents.Airtm,
      CashApp: IconComponents.CashApp,
      Payoneer: IconComponents.Payoneer,
      Paypal: IconComponents.Paypal,
      StripeLink: IconComponents.StripeLink,
      Venmo: IconComponents.Venmo,
    } as const

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Payout Platform Icons</h3>
        <IconGrid icons={payoutPlatformIcons} />
      </div>
    )
  },
}
