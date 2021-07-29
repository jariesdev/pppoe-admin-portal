export const state = () => {
  return {
    bandwidthProfiles: [],
    availableRateLimits: []
  }
}

export const mutations = {
  setBandwidthProfiles (state, value) {
    state.bandwidthProfiles = value
  },
  setAvailableRateLimits (state, value) {
    state.availableRateLimits = value
  }
}

export const actions = {
  async load ({ commit }) {
    const { data } = await this.$axios.$get('/api/pppoe-profiles', { params: { perPage: -1 } })
    commit('setBandwidthProfiles', data)
    return data
  },
  async loadAvailableRateLimits ({ commit }) {
    const { data } = await this.$axios.$get('/api/rate-limits')
    commit('setAvailableRateLimits', data)
    return data
  },
  async delete (_, id) {
    return await this.$axios.$delete('/api/pppoe-profiles/' + id)
  },
  async get (_, id) {
    return await this.$axios.$get('/api/pppoe-profiles/' + id).then(({ data }) => data)
  },
  async PerPlan (_, { planId, nasId }) {
    return await this.$axios.$post('/api/profile-per-plan', { plan_id: planId, nas_id: nasId })
      .then(({ data }) => data)
  }
}
