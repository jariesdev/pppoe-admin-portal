export const actions = {
  async delete (_, id) {
    return await this.$axios.$delete('/api/nas/' + id)
  },
  async get (_, id) {
    return await this.$axios.$get('/api/nas/' + id).then(({ data }) => data)
  },
  async getNasAccessPoints (_, id) {
    return await this.$axios.$get('/api/nas/' + id + '/accesspoints').then(({ data }) => data)
  }
}
