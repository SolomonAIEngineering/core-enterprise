import { cn } from '@dub/utils'

export function Logo({ className }: { className?: string }) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10 w-10 text-black dark:text-white', className)}
    >
      {/* Cube faces */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 12L52 22L32 32L12 22L32 12ZM52 22V42L32 52V32L52 22ZM12 22V42L32 52V32L12 22Z"
        fill="currentColor"
      />

      {/* Internal lines */}
      <g stroke="white" strokeWidth="0.75">
        {/* Horizontal line */}
        <line x1="42" y1="24" x2="22" y2="24" />
        {/* Front converging lines */}
        <line x1="42" y1="24" x2="32" y2="28" />
        <line x1="22" y1="24" x2="32" y2="28" />
        {/* Vertical line */}
        <line x1="32" y1="28" x2="32" y2="44" />
      </g>
    </svg>
  )
}
