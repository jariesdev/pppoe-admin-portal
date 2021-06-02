import { sortBy } from 'lodash'

export const state = () => ({
  cities: []
})

export const mutations = {
  setCities (state, value) {
    state.cities = sortBy(value, ['name'])
  }
}

export const actions = {
  async loadCities ({ commit }) {
    const cities = await this.$axios.$get('/api/cities')
      .then(({ data }) => data)
      .catch(() => [])
    commit('setCities', cities)
  }
}
