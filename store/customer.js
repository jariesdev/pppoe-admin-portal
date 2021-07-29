export const state = () => {
  return {}
}

export const actions = {
  async get (_, customerId) {
    return await this.$axios.$get('/api/customers/' + customerId).then(({ data }) => data)
  },
  async activateInternet (_, id) {
    const { status } = await this.$axios.post(`/api/customers/${id}/activate-internet`)
    return status < 300
  },
  async deactivateInternet (_, id) {
    const { status } = await this.$axios.post(`/api/customers/${id}/deactivate-internet`)
    return status < 300
  }
}
