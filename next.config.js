const withPlugins = require('next-compose-plugins')
// const withCSS = require('@zeit/next-css')
const optimizedImages = require('next-optimized-images')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([
    [optimizedImages, {}],
    [withBundleAnalyzer({})],
    [withSourceMaps({ webpack(config) { return config }})],
    // [withCSS({ cssModules: true })],
]);
