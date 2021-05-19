export const state = () => {
  return {
    partners: []
  }
}

export const mutations = {
  setPartners (state, value) {
    state.partners = value
  }
}

export const actions = {
  async load ({ commit }) {
    const { data } = await this.$axios.$get('/api/partners', { params: { perPage: -1 } })
    commit('setPartners', data)
  },
  async delete (_, partnerId) {
    return await this.$axios.$delete('/api/partners/' + partnerId)
  },
  async get (_, partnerId) {
    return await this.$axios.$get('/api/partners/' + partnerId).then(({ data }) => data)
  },
  async getPlans (_, partnerId) {
    return await this.$axios.$get(`/api/partners/${partnerId}/plans`)
      .then(({ data }) => data)
  }
}
