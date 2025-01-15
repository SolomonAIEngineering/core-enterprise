import { cn } from '@dub/utils'

export function Spotify({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-full w-full', className)}
      viewBox="0 0 222 222"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M110.999 0C49.6974 0 0 49.6973 0 111.001C0 172.307 49.6974 222 110.999 222C172.308 222 222 172.307 222 111.001C222 49.7012 172.308 0.00530203 110.998 0.00530203L110.999 0ZM161.903 160.095C159.915 163.356 155.647 164.389 152.386 162.388C126.324 146.469 93.5163 142.863 54.8787 151.691C51.1554 152.539 47.4441 150.207 46.5958 146.482C45.7435 142.757 48.0671 139.046 51.7996 138.197C94.0823 128.537 130.351 132.697 159.61 150.578C162.871 152.579 163.904 156.834 161.903 160.095ZM175.489 129.871C172.984 133.943 167.655 135.228 163.586 132.723C133.75 114.383 88.2687 109.072 52.9779 119.785C48.4011 121.167 43.5671 118.588 42.178 114.019C40.7995 109.442 43.3802 104.617 47.9491 103.225C88.2608 90.9935 138.376 96.9185 172.639 117.974C176.708 120.479 177.994 125.808 175.489 129.872V129.871ZM176.655 98.3977C140.881 77.1485 81.8574 75.1947 47.7012 85.5615C42.2164 87.225 36.4161 84.1286 34.754 78.6437C33.0918 73.1561 36.1855 67.3596 41.6743 65.6922C80.8832 53.7891 146.063 56.0889 187.251 80.5405C192.195 83.4685 193.812 89.8403 190.883 94.7672C187.967 99.7007 181.578 101.327 176.661 98.3977H176.655Z"
        fill="#1ED760"
      />
      <path
        d="M161.903 160.095C159.915 163.356 155.647 164.389 152.386 162.388C126.325 146.469 93.5164 142.863 54.8788 151.691C51.1556 152.539 47.4442 150.207 46.5959 146.482C45.7436 142.757 48.0672 139.046 51.7997 138.197C94.0824 128.537 130.351 132.697 159.61 150.578C162.871 152.579 163.905 156.834 161.903 160.095ZM175.489 129.871C172.984 133.943 167.656 135.228 163.586 132.723C133.75 114.383 88.2689 109.072 52.9781 119.785C48.4012 121.167 43.5672 118.588 42.1781 114.019C40.7996 109.442 43.3803 104.617 47.9492 103.225C88.2609 90.9934 138.376 96.9184 172.639 117.974C176.709 120.479 177.994 125.808 175.489 129.872V129.871ZM176.656 98.3977C140.881 77.1485 81.8576 75.1947 47.7014 85.5615C42.2165 87.225 36.4163 84.1286 34.7541 78.6437C33.092 73.1561 36.1856 67.3596 41.6744 65.6921C80.8833 53.7891 146.064 56.0888 187.251 80.5405C192.195 83.4685 193.813 89.8402 190.883 94.7672C187.967 99.7007 181.578 101.327 176.661 98.3977H176.656Z"
        fill="white"
      />
    </svg>
  )
}