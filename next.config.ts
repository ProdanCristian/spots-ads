import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "https://spotsads.com",
    "http://spotsads.com",
    "spotsads.com",
  ],
};

export default nextConfig;
