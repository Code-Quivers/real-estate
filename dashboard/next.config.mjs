/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/dashboard",
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "7000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "77.237.234.238",
        port: "7000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "managerentalunit.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "managerentalunit.com/backend",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "managerentalunit.com/backend/api/v1",
        pathname: "/**",
      },
    ],
    domains: [
      "localhost",
      "77.237.234.238",
      "77.237.234.238:7000",
      "managerentalunit.com/backend/",
      "managerentalunit.com/backend/api/v1",
      "managerentalunit.com/backend/api/v1/",
    ],
  },
};

export default nextConfig;
