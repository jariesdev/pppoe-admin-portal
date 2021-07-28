export const state = () => ({
  rateLimits: []
})

export const mutations = {
  setRateLimits (state, value) {
    state.rateLimits = value
  }
}

export const actions = {
  async load ({ commit }) {
    const data = await this.$axios.$get('/api/rate-limits')
      .then(({ data }) => data)
      .catch(() => [])
    commit('setRateLimits', data)
  }
}
