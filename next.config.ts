import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/HellaOrg/HellaAssets@*/operator/avatars/**"
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/HellaOrg/HellaAssets@*/operator/arts/**"
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/HellaOrg/HellaAssets@*/operator/skills/**"
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/HellaOrg/HellaAssets@*/items/**"
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/gh/tohmatosauce/ak-branch-icons@*/600-border/**"
      }
    ]
  }
};

export default nextConfig;
