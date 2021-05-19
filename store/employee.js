export const actions = {
  async delete ({}, employeeId) {
    return await this.$axios.$delete('/api/employees/' + employeeId)
  },
  async get ({}, employeeId) {
    return await this.$axios.$get('/api/employees/' + employeeId).then(({ data }) => data)
  }
}
