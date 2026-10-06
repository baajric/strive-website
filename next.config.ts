import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones on the local network load dev assets (e.g. http://192.168.0.209:3000).
  allowedDevOrigins: ["192.168.0.209", "192.168.*.*"],
  // Keep the dev badge out of previews and portfolio screenshots.
  devIndicators: false,
};

export default nextConfig;
