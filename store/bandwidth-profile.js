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
    const { data } = await this.$axios.$get('/api/pppoe-profiles', { params: { perPage: -1 } })
    commit('setBandwidthProfiles', data)
    return data
  },
  async delete (_, id) {
    return await this.$axios.$delete('/api/pppoe-profiles/' + id)
  },
  async get (_, id) {
    return await this.$axios.$get('/api/pppoe-profiles/' + id).then(({ data }) => data)
  }
}
