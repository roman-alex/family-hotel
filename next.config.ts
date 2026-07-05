import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_EASYMS_RESERVATION_MODULE_KEY:
      process.env.NEXT_PUBLIC_EASYMS_RESERVATION_MODULE_KEY ?? '',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
