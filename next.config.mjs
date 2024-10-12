import withMDX from '@next/mdx'

const isDev = process.env.NODE_ENV === 'development';
const repository = process.env.REPOSITORY;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    assetPrefix: isDev
        ? ""
        : repository,
    trailingSlash: true,
    output: 'export',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX()(nextConfig);
