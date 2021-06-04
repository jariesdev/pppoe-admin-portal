export const state = () => {
  return {
    addressPools: []
  }
}

export const mutations = {
  setAddressPool (state, addresses) {
    state.addressPools = addresses
  }
}

export const actions = {
  async load ({ commit }) {
    const { data } = await this.$axios.$get('/api/address-pools', { params: { perPage: -1 } })
    commit('setAddressPool', data)
  },
  async delete (_, id) {
    return await this.$axios.$delete('/api/address-pools/' + id)
  },
  async get (_, id) {
    return await this.$axios.$get('/api/address-pools/' + id).then(({ data }) => data)
  }
}
