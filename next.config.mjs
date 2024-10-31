/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    transpilePackages: ['@mdxeditor/editor'],
    webpack: (config) => {
        config.experiments = {...config.experiments, topLevelAwait: true}
        return config
    },

    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};


export default nextConfig;
