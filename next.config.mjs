/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json'
  }
};

export default nextConfig;
