/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Netlify handles trailing slashes differently, often better to disable for SPAs
  trailingSlash: true,
}

module.exports = nextConfig
