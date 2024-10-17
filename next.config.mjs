import createdMDX from '@next/mdx'

const prefix = process.env.NODE_ENV === 'production' ? 'https://github.com/terrinens/blog' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    assetPrefix: prefix,
    trailingSlash: true,
    output: 'export',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    distDir: 'build',
};

const withMDX = createdMDX({})

export default withMDX(nextConfig);
