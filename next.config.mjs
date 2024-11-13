/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    transpilePackages: ['@mdxeditor/editor'],
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    webpack: (config) => {
        config.experiments = {...config.experiments, topLevelAwait: true}
        return config
    }
}


export default nextConfig;
