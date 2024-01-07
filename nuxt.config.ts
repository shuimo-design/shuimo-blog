// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    './modules/fontmin',
    '@pinia/nuxt'
  ],
  css: [
    '~/assets/styles/index.css',
    'shuimo-ui/dist/style.css'
  ]
});
