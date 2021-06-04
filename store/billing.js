export const actions = {
  async get (_, billingId) {
    return await this.$axios.$get(`/api/billings/${billingId}`).then(({ data }) => data)
  }
}
