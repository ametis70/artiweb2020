const basePath = process.env.NODE_ENV === 'development' ? '' : '/artimanias/2020'

module.exports = {
  images: {
    disableStaticImages: false,
  },
  publicRuntimeConfig: {
    basePath,
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: process.cwd(),
  },
  basePath,
}
