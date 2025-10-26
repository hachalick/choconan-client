import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "80",
        pathname: "/**/*",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "80",
        pathname: "/*",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/**/*",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8080",
        pathname: "/*",
      },
      {
        protocol: "http",
        hostname: "192.168.1.*",
        port: "80",
        pathname: "/**/*",
      },
      {
        protocol: "http",
        hostname: "192.168.1.*",
        port: "80",
        pathname: "/*",
      },
      {
        protocol: "http",
        hostname: "192.168.1.*",
        port: "8080",
        pathname: "/**/*",
      },
      {
        protocol: "http",
        hostname: "192.168.1.*",
        port: "8080",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "choconan.ir",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "choconan.ir",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "api.choconan.ir",
        port: "",
        pathname: "/**/*",
      },
      {
        protocol: "https",
        hostname: "api.choconan.ir",
        port: "",
        pathname: "/*",
      },
    ],
  },
};

export default nextConfig;
