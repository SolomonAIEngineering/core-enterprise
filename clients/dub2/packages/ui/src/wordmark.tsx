import type React from 'react'
import { cn } from '@dub/utils'

interface WordmarkProps {
  width?: number
  height?: number
  className?: string
}

export const Wordmark: React.FC<WordmarkProps> = ({
  width = 500,
  height = 300,
  className,
}) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      width={width}
      height={height}
      viewBox="0 0 3500 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-auto text-black dark:text-white', className)}
    >
      <defs>
        <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <text
        x="1750"
        y="600"
        fontFamily="Arial, sans-serif"
        fontSize="450"
        fontWeight="bold"
        fill="url(#blackGradient)"
        textAnchor="middle"
        transform="skewX(-10)"
      >
        Vector Platform
      </text>
    </svg>
  )
}
