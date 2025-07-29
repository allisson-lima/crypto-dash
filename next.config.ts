import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      new URL("https://coin-images.coingecko.com/**"),
      {
        protocol: "https",
        hostname: "coin-images.coingecko.com",
      },
    ],
  },
};

export default nextConfig;
