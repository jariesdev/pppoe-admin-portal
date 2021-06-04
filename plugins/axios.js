export default function ({ $axios, redirect }) {
  $axios.setHeader('X-Requested-With', 'XMLHttpRequest')

  $axios.onRequest((config) => {
    // fixed proxy request from server which, axios not using proxy pathRewrite in server so we manually set it here
    config.url = process.server ? config.url.replace(/^\/api\//, '/api/admin/') : config.url
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) { redirect('/login') }
  })
}
