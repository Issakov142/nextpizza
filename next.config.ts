import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // reactStrictMode: false,
  /* config options here */
    // eslint: {
    //     ignoreDuringBuilds: true, // Disables ESLint during production builds
    // },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
