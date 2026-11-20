import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/work", destination: "/case-studies", permanent: true },
      { source: "/work/:slug", destination: "/case-studies/:slug", permanent: true },
      { source: "/lead-magnet", destination: "/resources/claude-email-design-playbook", permanent: true },
      { source: "/admin/email-cleaner", destination: "/resources/email-cleaner", permanent: true },
    ];
  },
};

export default nextConfig;
