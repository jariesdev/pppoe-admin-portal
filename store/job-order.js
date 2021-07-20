export const actions = {
  async delete (_, id) {
    return await this.$axios.$delete('/api/job-orders/' + id)
  },
  async get (_, id) {
    return await this.$axios.$get('/api/job-orders/' + id).then(({ data }) => data)
  }
}
