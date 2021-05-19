export const state = () => {
  return {
    plans: []
  }
}

export const mutations = {
  setPlans (state, value) {
    state.plans = value
  }
}

export const actions = {
  async load ({ commit }) {
    const { data } = await this.$axios.$get('/api/plans', {
      params: {
        perPage: -1
      }
    })
    commit('setPlans', data)
    return data
  },
  async delete (_, planId) {
    return await this.$axios.$delete('/api/plans/' + planId)
  },
  async get (_, planId) {
    return await this.$axios.$get('/api/plans/' + planId).then(({ data }) => data)
  }
}
