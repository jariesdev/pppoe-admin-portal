// test/tests.js
import test from 'ava'

import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

// We keep a reference to Nuxt so we can close
// the server at the end of the test
let nuxt = null

// Init Nuxt.js and start listening on localhost:5000
test.before('Init Nuxt.js', async t => {
    const rootDir = resolve(__dirname, '..')
    let config = {}
    try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
    config.rootDir = rootDir // project folder
    config.dev = false // production build
    config.mode = 'universal' // Isomorphic application
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    nuxt.listen(5000, 'localhost')
})

test.serial('Route / exits and renders correct HTML', async (t) => {
    let context = {}
    const { html } = await nuxt.renderRoute('/', context)
    t.true(html.includes('<h1>Welcome to youChores</h1>'))
    t.true(html.includes('<p>We are here to serve you</p>'))

})

test.serial('Route /login exits and renders correct HTML', async (t) => {

    const window = await nuxt.renderAndGetWindow('http://localhost:5000/login')
    const username = window.document.querySelector('.username')
    const password = window.document.querySelector('.password')
    const button = window.document.querySelector('.button')

    t.not(username, null)
    t.not(password, null)
    t.not(button, null)
})

test.serial('Route /login exits and set correct default data', async (t) => {
    const window = await nuxt.renderAndGetWindow('http://localhost:5000/login')
    const username = window.document.querySelector('.username')
    const password = window.document.querySelector('.password')

    t.is(username.value, '')
    t.is(password.value, '')

})

test.serial('Route /login exits and should update input values then click the login button', async (t) => {
    const window = await nuxt.renderAndGetWindow('http://localhost:5000/login')
    const username = window.document.querySelector('.username')
    const password = window.document.querySelector('.password')
    const button = window.document.querySelector('.button')

    t.pass(username.value, 'admin')
    t.pass(password.value, 'password')
    button.click()
})

test.serial("Route /dashboard exits and renders correct HTML", async (t) => {
    let context = {};
    const { html } = await nuxt.renderRoute("/", context);
    t.true(html.includes("<h1>Dashboard</h1>"));
    t.true(html.includes('<p class="green">Welcome to your dashboard!</p>'));
});
