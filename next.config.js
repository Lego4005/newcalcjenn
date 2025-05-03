/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["picsum.photos", "i.pravatar.cc", "rocatitle.com", "assets.aceternity.com", "images.unsplash.com"],
  },
  // Exclude the nextuipro demos from the build
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    // This will enable the turbopack features
    turbo: {},
  },
  // Adds transpilePackages
  transpilePackages: [],
  typescript: {
    // Ignore type errors in the lookatlater directory
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /nextuipro/,
      use: "ignore-loader",
    });
    return config;
  },
};

module.exports = nextConfig 