// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  typescript: {
    strict: true,
    shim: false,
  },

  app: {
    head: {
      title: 'MedChart — OPD Doctor Console',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Hospital OPD Doctor Consultation View' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:wght@400;500&family=Outfit:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },

  components: [
    { path: '~/components/consultation', prefix: 'Consultation' },
    '~/components',
  ],
})
