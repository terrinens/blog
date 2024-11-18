import createdMDX from '@next/mdx'

/** abs :
 * 다른 블로그들에서 prefix 를 자신의 레파지토리 경로를 모두 넣어서 사용하는 경우가 많았고,
 * 레퍼런스를 읽을때도 your rep 라는 식으로 적혀있기 때문에 그런줄 알았다.
 * 하지만 prefix가 요구되는것은 github pages의 라우팅이 어디로 되어있는가? 를 요구 하고 있던것이였다.
 * 즉 github page의 배포 경로가 https://terrinens.github.io/blog/ 라면은 모든 경로를 요구하는것이 아닌
 * 자신의 github.io 경로를 제외한 /blog 를 요구하는것이다.
 * 이 처럼 작동하는 이유는 다른 레파지토리에서도 github page의 자원을 공유하는 방식으로 사용 할 수 있게끔 github page가 설계되어있기 때문이였다.
 * */

/** abs :
 * 다른 블로그들 글 설명해서는 해당 옵션이 필요하다고 했다.
 * 하지만 배포시에 해당 환경변수가 변경되지 않았다.
 * 그렇다면 다른 블로글들은 그저 복붙한것에 불과한것이였나?
 * 하지만 디버깅한 결과 로컬 환경에서는 값이 development 을 나타내고 있었다.
 * 찾아본 결과 build 혹은 start가 되었을때는 production 으로 자동으로 설정된다고 하였다.
 *
 * fix : 해당 설정의 prefix 와 동일하게 특정 환경일 경우에 경로를 제어하기 위해서 만든
 * Config.ts의 rootPath의 dev 환경일 경우 설정이 ''값으로 설정 되어있어 발생한 문제였다.
 * */
const prefix = process.env.NODE_ENV === 'production'
    ? '/blog'
    : '';

if (process.env.NODE_ENV === 'production') {
    process.env.DB_AUTH_EMAIL = undefined;
    process.env.DB_AUTH_PASSWORD = undefined;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    assetPrefix: prefix,
    basePath: prefix,
    trailingSlash: true,
    output: 'export',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    distDir: 'out',
    images: {unoptimized: true}
};

const withMDX = createdMDX()
const margeConfig = {...nextConfig};

export default withMDX(margeConfig);
