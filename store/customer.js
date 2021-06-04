export const state = () => {
  return {}
}

export const actions = {
  async get (_, customerId) {
    return await this.$axios.$get('/api/customers/' + customerId).then(({ data }) => data)
  }
}
