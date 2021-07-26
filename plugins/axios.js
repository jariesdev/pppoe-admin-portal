export default function ({ $axios, redirect }) {
  $axios.setHeader('X-Requested-With', 'XMLHttpRequest')

  $axios.onRequest((config) => {
    // fixed proxy request from server which, axios not using proxy pathRewrite in server so we manually set it here
    if (process.server && /^\/api\//.test(config.url)) {
      config.url = config.url.replace(/^\/api\//, '/api/admin/')
    } else if (process.server && /^\/tech\/api\//.test(config.url)) {
      config.url = config.url.replace(/^\/api\//, '/api/tech/')
    } else {
      config.url = process.env.routerBase ? process.env.routerBase + config.url : config.url
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) { redirect('/login') }
  })
}
