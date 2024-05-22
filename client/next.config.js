/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
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
    ],
    domains: ["localhost", "77.237.234.238", "77.237.234.238:7000"],
  },
  webpack: (config) => {
    /**
     * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
     * Module parse failed: Unexpected character '�' (1:0)" error
     */
    config.resolve.alias.canvas = false;

    // You may not need this, it's just to support moduleResolution: 'node16'
    config.resolve.extensionAlias = {
      ".js": [".js", ".ts", ".tsx"],
    };

    // Add a rule to handle PDF files using file-loader
    config.module.rules.push({
      test: /\.pdf$/,
      use: {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          publicPath: "/_next/static/files", // Adjust this path as needed
          outputPath: "static/files", // Adjust this path as needed
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;
