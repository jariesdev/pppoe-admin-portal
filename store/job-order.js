export const actions = {
  async delete (_, partnerId) {
    return await this.$axios.$delete('/api/job-orders/' + partnerId)
  },
  async get (_, partnerId) {
    return await this.$axios.$get('/api/job-orders/' + partnerId).then(({ data }) => data)
  }
}
