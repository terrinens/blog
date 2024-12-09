const {withSitemap} = require('next-sitemap');

module.exports = withSitemap({
    siteUrl: 'https://terrinens.github.io/blog/',
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {userAgent: '*', allow: '/'},
        ],
    }
})