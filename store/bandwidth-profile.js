export const bandwidthProfiles = () => {
  return {
    bandwidthProfiles: []
  }
}

export const mutations = {
  setBandwidthProfiles (state, value) {
    state.bandwidthProfiles = value
  }
}

export const actions = {
  async load ({ commit }) {
    const { data } = await this.$axios.$get('/api/bandwidth-profiles', { params: { perPage: -1 } })
    commit('setBandwidthProfiles', data)
    return data
  },
  async delete ({}, id) {
    return await this.$axios.$delete('/api/bandwidth-profiles/' + id)
  },
  async get ({}, id) {
    return await this.$axios.$get('/api/bandwidth-profiles/' + id).then(({ data }) => data)
  }
}
