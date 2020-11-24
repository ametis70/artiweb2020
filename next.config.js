const withPlugins = require('next-compose-plugins')
const withSourceMaps = require('@zeit/next-source-maps')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// const withCSS = require('@zeit/next-css')

const basePath = process.env.NODE_ENV === 'development' ? '' : '/artimanias/2020'

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
    publicRuntimeConfig: {
      basePath,
    },
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
    },
    basePath,
  },
)
