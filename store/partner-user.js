export const actions = {
  async get (_, { partnerId, userId }) {
    return await this.$axios.$get('/api/partners/' + partnerId + '/users/' + userId).then(({ data }) => data)
  },
  async delete (_, { partnerId, userId }) {
    return await this.$axios.$delete('/api/partners/' + partnerId + '/users/' + userId).then(({ data }) => data)
  }
}
