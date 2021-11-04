const createNextPluginPreval = require('next-plugin-preval/config')
const withNextPluginPreval = createNextPluginPreval()

const basePath = process.env.BASE_PATH ? process.env.BASE_PATH : ''

const settings = {
  images: {
    disableStaticImages: false,
  },
  publicRuntimeConfig: {
    basePath,
  },
  basePath,
}

module.exports = withNextPluginPreval(settings)
