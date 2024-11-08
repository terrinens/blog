/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    transpilePackages: ['@mdxeditor/editor'],
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};


export default nextConfig;
