import DirectusSDK from '@directus/sdk-js'

const client = new DirectusSDK({
  url: 'http://localhost:8080',
  project: '_',
  mode: 'jwt',
})

export async function login() {
  return client.login({
    email: '',
    password: '',
  })
}

export default client
