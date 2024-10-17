import createdMDX from '@next/mdx'

/** 다른 블로그들 글 설명해서는 해당 옵션이 필요하다고 했다.
 * 하지만 배포시에 해당 환경변수가 변경되지 않았다.
 * 그렇다면 다른 블로글들은 그저 복붙한것에 불과한것이였나?
 * 하지만 디버깅한 결과 로컬 환경에서는 값이 development 을 나타내고 있었다.
 * 찾아본 결과 build 혹은 start가 되었을때는 production 으로 자동으로 설정된다고 하였다. */
const prefix = process.env.NODE_ENV === 'production'
    ? '/blog'
    : '';

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
