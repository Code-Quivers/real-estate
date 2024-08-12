// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     swcMinify: true,
//     eslint: {
//         ignoreDuringBuilds: true,
//     },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '7000',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
};

export default nextConfig;
