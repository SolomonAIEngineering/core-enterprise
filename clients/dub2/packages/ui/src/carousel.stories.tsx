import type { Meta, StoryObj } from '@storybook/react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNavBar,
  CarouselNext,
  CarouselPrevious,
} from './carousel'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A carousel component for cycling through elements like a slideshow.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={`slide-${item}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">Slide {item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const WithNavBar: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4].map((item) => (
            <CarouselItem key={`nav-slide-${item}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4">
          <CarouselNavBar />
        </div>
      </Carousel>
    </div>
  ),
}

export const Autoplay: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel autoplay>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((item) => (
            <CarouselItem key={`auto-slide-${item}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4">
          <CarouselNavBar />
        </div>
      </Carousel>
    </div>
  ),
}

export const CustomAutoplayDelay: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel autoplay={{ delay: 5000 }}>
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={`delay-slide-${item}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4">
          <CarouselNavBar />
        </div>
      </Carousel>
    </div>
  ),
}

export const FloatingNavBar: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={`float-slide-${item}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNavBar variant="floating" className="px-4" />
      </Carousel>
    </div>
  ),
}

export const VerticalOrientation: Story = {
  render: () => (
    <div className="h-[400px] w-[300px]">
      <Carousel orientation="vertical">
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={`vertical-slide-${item}`}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const WithImages: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={`image-slide-${item}`}>
              <div className="p-1">
                <img
                  src={`https://picsum.photos/seed/${item}/300/300`}
                  alt={`Slide ${item}`}
                  className="aspect-square rounded-lg object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="mt-4">
          <CarouselNavBar />
        </div>
      </Carousel>
    </div>
  ),
}

export const WithCards: Story = {
  render: () => (
    <div className="w-[300px]">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3].map((item) => (
            <CarouselItem key={`card-slide-${item}`}>
              <div className="p-1">
                <div className="rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold">Card {item}</h3>
                  <p className="mt-2 text-gray-600">
                    This is a card with some sample content for slide {item}.
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const MultipleItems: Story = {
  render: () => (
    <div className="w-[600px]">
      <Carousel opts={{ slidesToScroll: 2 }}>
        <CarouselContent className="-ml-2">
          {[1, 2, 3, 4].map((item) => (
            <CarouselItem
              key={`multi-slide-${item}`}
              className="basis-1/2 pl-2"
            >
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

export const ResponsiveItems: Story = {
  render: () => (
    <div className="w-full max-w-[900px]">
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <CarouselItem
              key={`responsive-slide-${item}`}
              className="basis-full pl-2 sm:basis-1/2 md:basis-1/3 md:pl-4"
            >
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-100 p-6">
                  <span className="text-3xl font-semibold">{item}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <div className="mt-4">
          <CarouselNavBar />
        </div>
      </Carousel>
    </div>
  ),
}
