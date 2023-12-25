/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true
  },
  resolve: {
    fallback: {
        "crypto": require.resolve("crypto-browserify")
    }
}
}

module.exports = nextConfig
