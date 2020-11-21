const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// const withCSS = require('@zeit/next-css')

module.exports = withPlugins(
  [
    [withBundleAnalyzer({})],
    [
      withSourceMaps({
        webpack(config) {
          return config
        },
      }),
    ],
    // [withCSS({ cssModules: true })],
  ],
  {
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
  },
)
