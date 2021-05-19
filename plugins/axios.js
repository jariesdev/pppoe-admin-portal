export default function ({ $axios, redirect }) {
  $axios.setHeader('X-Requested-With', 'XMLHttpRequest')

  $axios.onRequest((config) => {
    config.url = process.env.routerBase ? process.env.routerBase + config.url : config.url
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) { redirect('/login') }
  })
}
