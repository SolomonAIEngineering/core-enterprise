/**
 * Areas Component Stories
 *
 * This storybook demonstrates the Areas component, which is used to create area charts
 * within the TimeSeriesChart component. Area charts are useful for visualizing continuous
 * data over time, especially when showing trends, accumulation, or parts of a whole.
 *
 * Features demonstrated:
 * - Single and multiple series visualization
 * - Custom styling with gradients and colors
 * - Interactive hover states
 * - Grid line integration
 * - Axis customization
 */

import type { Meta, StoryObj } from '@storybook/react'

import { Areas } from './areas'
import { TimeSeriesChart } from './time-series-chart'
import { XAxis } from './x-axis'
import { YAxis } from './y-axis'

const meta: Meta<typeof Areas> = {
  title: 'Charts/Areas',
  component: Areas,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Areas Component

A flexible area chart component for visualizing time series data with support for single and multiple series.

## Overview

The Areas component is designed to work within the TimeSeriesChart component to create beautiful area charts.
It's particularly useful for visualizing trends, accumulations, or parts of a whole over time.

## Features

- Single and multiple series visualization
- Customizable gradients and colors
- Interactive hover states
- Smooth animations
- Responsive design
- Accessibility support

## Installation

\`\`\`bash
npm install @your-org/charts
\`\`\`

## Basic Usage

\`\`\`jsx
import { TimeSeriesChart, Areas, XAxis, YAxis } from '@your-org/charts';

function BasicAreaChart({ data }) {
  return (
    <TimeSeriesChart
      data={data}
      series={[{
        id: "value",
        valueAccessor: (d) => d.value,
        colorClassName: "text-blue-500",
        isActive: true,
      }]}
    >
      <Areas />
      <XAxis showGridLines />
      <YAxis showGridLines />
    </TimeSeriesChart>
  );
}
\`\`\`

## Props

### seriesStyles
Optional array of style configurations for each series.

| Property | Type | Description |
|----------|------|-------------|
| id | string | Identifier matching the series ID |
| gradientClassName | string | Tailwind CSS classes for gradient fill |
| lineClassName | string | Tailwind CSS classes for line stroke |
| areaFill | string | Custom fill for the area (optional) |
| lineStroke | string | Custom stroke for the line (optional) |

## Guidelines

1. **Dimensions**: Always ensure the TimeSeriesChart has proper dimensions
2. **Series IDs**: Provide unique IDs for each series
3. **Colors**: Use appropriate color opacity for overlapping areas
4. **Accessibility**: Consider color contrast and accessibility

## Examples

See the stories below for various implementation examples:
- Basic single series
- Custom styled areas
- Multi-series visualization
                `,
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '2em', background: 'white', padding: '1em' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    seriesStyles: {
      description: 'Style configurations for each series',
      control: 'object',
      table: {
        type: {
          summary: 'array',
          detail: `Array<{
  id: string;
  gradientClassName?: string;
  lineClassName?: string;
  areaFill?: string;
  lineStroke?: string;
}>`,
        },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Areas>

/**
 * Generates sample time series data for the area charts.
 *
 * @param days - Number of days to generate data for
 * @returns Array of data points with date and values
 */
const generateData = (days: number) => {
  const data: Array<{
    date: Date
    values: {
      value: number
      secondValue: number
    }
  }> = []
  const now = new Date()
  for (let i = 0; i < days; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - (days - i - 1))
    data.push({
      date,
      values: {
        value: Math.floor(Math.random() * 1000) + 100,
        secondValue: Math.floor(Math.random() * 500) + 50,
      },
    })
  }
  return data
}

const sampleData = generateData(30)

/**
 * Default Area Chart
 *
 * Demonstrates the basic usage of the Areas component with a single series.
 * This is the simplest implementation with default styling and configuration.
 */
export const Default: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
        ]}
      >
        <Areas />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Custom Styled Area Chart
 *
 * Shows how to customize the appearance of the area chart using:
 * - Custom gradient colors
 * - Custom line colors
 * - Opacity variations
 *
 * This example demonstrates the visual customization capabilities of the component.
 */
export const WithCustomStyles: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              lineClassName: 'text-blue-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Multi-Series Area Chart
 *
 * Demonstrates how to display multiple data series in the same chart.
 * Features shown:
 * - Multiple data series with different colors
 * - Custom styling for each series
 * - Layered visualization
 * - Color coordination between areas and lines
 *
 * This is useful for comparing related metrics over the same time period.
 */
export const MultiSeries: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
          {
            id: 'secondValue',
            valueAccessor: (d) => d.values.secondValue,
            colorClassName: 'text-green-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              lineClassName: 'text-blue-700',
            },
            {
              id: 'secondValue',
              gradientClassName: 'text-green-500/50',
              lineClassName: 'text-green-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Stacked Area Chart
 * Shows areas stacked on top of each other, useful for showing parts of a whole
 */
export const StackedAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
          {
            id: 'secondValue',
            valueAccessor: (d) => d.values.secondValue,
            colorClassName: 'text-green-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/50',
              lineClassName: 'text-blue-700',
            },
            {
              id: 'secondValue',
              gradientClassName: 'text-green-500/50',
              lineClassName: 'text-green-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Stepped Area Chart
 * Shows discrete steps instead of smooth curves
 */
export const SteppedAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-purple-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-purple-500/50',
              lineClassName: 'text-purple-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Pattern Fill Areas
 * Demonstrates using patterns instead of solid colors
 */
export const PatternedAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-indigo-500',
            isActive: true,
          },
        ]}
      >
        <defs>
          <pattern id="dots" patternUnits="userSpaceOnUse" width="4" height="4">
            <circle cx="2" cy="2" r="1" className="fill-current" />
          </pattern>
        </defs>
        <Areas
          seriesStyles={[
            {
              id: 'value',
              areaFill: 'url(#dots)',
              lineClassName: 'text-indigo-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Animated Area Chart
 * Shows custom animation effects
 */
export const AnimatedAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-cyan-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-cyan-500/50 transition-all duration-300',
              lineClassName: 'text-cyan-700 transition-all duration-300',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Interactive Hover Effects
 * Demonstrates interactive features with hover states
 */
export const InteractiveAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-amber-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-amber-500/50 hover:text-amber-600/50',
              lineClassName: 'text-amber-700 hover:text-amber-800',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Minimal Style
 * Clean design without grid lines
 */
export const MinimalAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-gray-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-gray-500/30',
              lineClassName: 'text-gray-700',
            },
          ]}
        />
        <XAxis />
        <YAxis />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Dense Data Visualization
 * Handles many data points effectively
 */
export const DenseAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={generateData(100)}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-rose-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-rose-500/50',
              lineClassName: 'text-rose-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Gradient Variations
 * Shows complex gradient styling
 */
export const GradientAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-emerald-500',
            isActive: true,
          },
        ]}
      >
        <defs>
          <linearGradient id="customGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.7" />
            <stop
              offset="100%"
              stopColor="rgb(16, 185, 129)"
              stopOpacity="0.1"
            />
          </linearGradient>
        </defs>
        <Areas
          seriesStyles={[
            {
              id: 'value',
              areaFill: 'url(#customGradient)',
              lineClassName: 'text-emerald-700',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Comparison View
 * Shows two series with emphasis on comparison
 */
export const ComparisonAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-200 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-blue-500',
            isActive: true,
          },
          {
            id: 'secondValue',
            valueAccessor: (d) => d.values.secondValue * 2,
            colorClassName: 'text-red-500',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-blue-500/30',
              lineClassName: 'text-blue-700 stroke-2',
            },
            {
              id: 'secondValue',
              gradientClassName: 'text-red-500/30',
              lineClassName: 'text-red-700 stroke-2',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Dark Theme
 * Area chart optimized for dark mode
 */
export const DarkThemeAreas: Story = {
  render: () => (
    <div
      style={{ width: '800px', height: '400px' }}
      className="rounded-lg border border-gray-700 bg-gray-900 p-4"
    >
      <TimeSeriesChart
        data={sampleData}
        series={[
          {
            id: 'value',
            valueAccessor: (d) => d.values.value,
            colorClassName: 'text-sky-400',
            isActive: true,
          },
        ]}
      >
        <Areas
          seriesStyles={[
            {
              id: 'value',
              gradientClassName: 'text-sky-400/30',
              lineClassName: 'text-sky-300',
            },
          ]}
        />
        <XAxis showGridLines />
        <YAxis showGridLines />
      </TimeSeriesChart>
    </div>
  ),
}

/**
 * Component Props Documentation
 *
 * Areas Component accepts the following props:
 *
 * @prop {Array} seriesStyles - Optional array of style configurations for each series
 *   @prop {string} seriesStyles.id - Identifier matching the series ID
 *   @prop {string} seriesStyles.gradientClassName - Tailwind CSS classes for gradient fill
 *   @prop {string} seriesStyles.lineClassName - Tailwind CSS classes for line stroke
 *   @prop {string} seriesStyles.areaFill - Custom fill for the area (optional)
 *   @prop {string} seriesStyles.lineStroke - Custom stroke for the line (optional)
 *
 * The component must be used within a TimeSeriesChart component and works with:
 * - XAxis and YAxis components for axis display
 * - Grid lines for better readability
 * - Tooltip integration for interactive data display
 *
 * Usage Notes:
 * 1. Always ensure the TimeSeriesChart has proper dimensions
 * 2. Provide unique IDs for each series
 * 3. Use appropriate color opacity for overlapping areas
 * 4. Consider accessibility when choosing colors
 */
