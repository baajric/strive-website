import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones on the local network load dev assets (e.g. http://192.168.0.209:3000).
  allowedDevOrigins: ["192.168.0.209", "192.168.*.*"],
  // Keep the dev badge out of previews and portfolio screenshots.
  devIndicators: false,
  // One canonical address: www.strivedigitally.com → strivedigitally.com.
  async redirects() {
    const www = [{ type: "host" as const, value: "www.strivedigitally.com" }];
    return [
      // The home page needs its own rule: OpenNext only fills in `:path*` when the path
      // matched something, so "/" would redirect to the literal "/:path*".
      { source: "/", has: www, destination: "https://strivedigitally.com/", permanent: true },
      { source: "/:path*", has: www, destination: "https://strivedigitally.com/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
