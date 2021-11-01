const createNextPluginPreval = require('next-plugin-preval/config')
const withNextPluginPreval = createNextPluginPreval()

const basePath = process.env.NODE_ENV === 'development' ? '' : '/artimanias/2020'

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
