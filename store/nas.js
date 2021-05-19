export const actions = {
  async delete ({}, id) {
    return await this.$axios.$delete('/api/nas/' + id)
  },
  async get ({}, id) {
    return await this.$axios.$get('/api/nas/' + id).then(({ data }) => data)
  },
  async getNasAccessPoints ({}, id) {
    return await this.$axios.$get('/api/nas/' + id + '/accesspoints').then(({ data }) => data)
  }
}
