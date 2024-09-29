import withPWA from "@ducanh2912/next-pwa"

/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: config => {
    config.resolve.alias.canvas = false

    return config
  }
}

export default withPWA({ dest: "public", register: true, skipWaiting: true })(
  nextConfig
)
