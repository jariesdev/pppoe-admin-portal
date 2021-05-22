export const actions = {
  async delete (_, branchId) {
    return await this.$axios.$delete('/api/branches/' + branchId)
  },
  async get (_, branchId) {
    return await this.$axios.$get('/api/branches/' + branchId).then(({ data }) => data)
  }
}
