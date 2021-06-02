export const state = () => ({
  allNas: []
})

export const mutations = {
  setNasList (state, value) {
    state.allNas = value
  }
}

export const actions = {
  async load ({ commit }) {
    const data = await this.$axios.$get('/api/nas', { params: { perPage: -1 } }).then(({ data }) => data)
    commit('setNasList', data)
  },
  async delete (_, id) {
    return await this.$axios.$delete('/api/nas/' + id)
  },
  async get (_, id) {
    return await this.$axios.$get('/api/nas/' + id).then(({ data }) => data)
  },
  async getNasAccessPoints (_, id) {
    return await this.$axios.$get('/api/nas/' + id + '/accesspoints').then(({ data }) => data)
  }
}
