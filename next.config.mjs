import createdMDX from '@next/mdx'

const prefix = process.env.NODE_ENV === 'production' ? '/blog' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    assetPrefix: prefix,
    /* basePath 문제? build 할때 파일을 가져오기를 기대하는것이 아닌 reop에서 직접 가져오게 시도. */
    basePath: prefix,
    trailingSlash: true,
    output: 'export',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    distDir: 'out',

    images: {
        unoptimized: true,
    },
};

const withMDX = createdMDX()

export default withMDX(nextConfig);
