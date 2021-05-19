/*!

 =========================================================
 * Nuxt Black Dashboard - v1.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/nuxt-black-dashboard
 * Copyright 2020 Creative Tim (https://www.creative-tim.com)

 * Coded by Creative Tim

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */
export default {
  env: {
    routerBase: process.env.ROUTER_BASE || ''
  },
  /*
    ** Headers of the page
    */
  head: {
    title: 'Home',
    titleTemplate: '%s - ISP Hotspot Service',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css' }
    ]
    // bodyAttrs: {
    //     class: '' // Add `white-content` class here to enable "white" mode.
    // }
  },
  router: {
    linkExactActiveClass: 'active',
    middleware: ['auth'],
    base: process.env.ROUTER_BASE || ''
  },
  /*
    ** Customize the progress-bar color
    */
  loading: { color: '#fff' },
  /*
     ** Global CSS
     */
  css: [
    'assets/css/demo.css',
    'assets/css/nucleo-icons.css',
    'assets/sass/black-dashboard.scss'
  ],
  /*
    ** Plugins to load before mounting the App
    */
  plugins: [
    '@/plugins/filters',
    '@/plugins/axios',
    '~/plugins/dashboard-plugin.js',
    '~/plugins/v-form.js',
    '~/plugins/highcharts'
  ],
  /*
    ** Nuxt.js dev-modules
    */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
    ** Nuxt.js modules
    */
  modules: [
    ['@nuxtjs/pwa', { icon: false }],
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth-next',
    'nuxt-i18n',
    ['vue-scrollto/nuxt', { duration: 250 }],
    ['@nuxtjs/dotenv', { systemvars: true }]
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js'
      },
      {
        code: 'ar',
        file: 'ar.js'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en'
  },
  /*
    ** Build configuration
    */
  build: {
    transpile: [/^element-ui/],
    /*
        ** You can extend webpack config here
        */
    extend (config, ctx) {
    },
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    }
  },
  auth: {
    localStorage: {
      prefix: 'admin_auth.'
    },
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: '/api/',
        endpoints: {
          login: { url: 'admin/login', method: 'POST' },
          logout: { url: 'admin/logout', method: 'POST' },
          refresh: { url: 'admin/refresh', method: 'POST' },
          user: { url: 'admin/my-account' }
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 45
        },
        refreshToken: {
          maxAge: 60 * 60,
          tokenRequired: true
        },
        user: {
          property: 'data'
        }
      }
    }
  },
  axios: {
    proxy: true,
    host: process.env.API_URL,
    prefix: '/'
  },
  proxy: {
    [(process.env.ROUTER_BASE || '') + '/api/']: {
      target: process.env.API_URL,
      prependPath: false,
      pathRewrite: {
        [process.env.ROUTER_BASE ? `^${process.env.ROUTER_BASE}/api/` : '^/api/']: '/api/'
      },
      logLevel: process.env.PROXY_LOG_LEVEL || 'info'
    }
  }
}
