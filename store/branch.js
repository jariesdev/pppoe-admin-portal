export const state = () => {
  return {
    branches: []
  }
}

export const mutations = {
  setBranches (state, branches) {
    state.branches = branches
  }
}

export const actions = {
  async load ({ commit }) {
    const { data } = await this.$axios.$get('/api/branches', { params: { perPage: -1 } })
    commit('setBranches', data)
  },
  async delete (_, branchId) {
    return await this.$axios.$delete('/api/branches/' + branchId)
  },
  async get (_, branchId) {
    return await this.$axios.$get('/api/branches/' + branchId).then(({ data }) => data)
  }
}
