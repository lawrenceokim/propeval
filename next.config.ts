import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid a parent-directory lockfile changing Turbopack's workspace inference.
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
