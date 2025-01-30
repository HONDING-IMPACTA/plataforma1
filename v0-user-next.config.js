/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push({
      "react-three-fiber": "react-three-fiber",
      three: "three",
    })
    return config
  },
}

module.exports = nextConfig

