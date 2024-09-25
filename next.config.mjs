import withPWA from "@ducanh2912/next-pwa"

/** @type {import('next').NextConfig} */

const nextConfig = {}

export default withPWA({ dest: "public", register: true, skipWaiting: true })(
  nextConfig
)
