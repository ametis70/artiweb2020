import DirectusSDK from '@directus/sdk-js'

const client = new DirectusSDK({
  url: process.env.DIRECTUS_HOST,
  project: '_',
})

export async function login() {
  return client.login({
    email: process.env.DIRECTUS_API_USER,
    password: process.env.DIRECTUS_API_PASSWORD,
    mode: 'jwt',
  })
}

export default client
