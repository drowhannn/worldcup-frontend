// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  publicRuntimeConfig: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  typescript: {
    typeCheck: true,
  },
})
