export const actions = {
  async delete ({}, { partnerId, branchId }) {
    return await this.$axios.$delete('/api/partners/' + partnerId + '/branches/' + branchId)
  },
  async get ({}, { partnerId, branchId }) {
    return await this.$axios.$get('/api/partners/' + partnerId + '/branches/' + branchId).then(({ data }) => data)
  }
}
