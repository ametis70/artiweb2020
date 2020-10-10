const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
// const withCSS = require('@zeit/next-css')

module.exports = withPlugins([
    [withBundleAnalyzer({})],
    [withSourceMaps({ webpack(config) { return config }})],
    [optimizedImages, {
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        handleImages: ['jpeg', 'png', 'svg', 'webp'],
        optimizeImages: true,
        optimizeImagesInDev: true,
        responsive: {
            adapter: require('responsive-loader/sharp')
        }
    }],
    // [withCSS({ cssModules: true })],
]);
