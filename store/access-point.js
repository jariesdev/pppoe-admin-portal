export const actions = {
    async delete({}, {nasId,id}){
        return await this.$axios.$delete(`/api/nas/${nasId}/accesspoints/${id}`)
    },
    async get({}, {nasId,id}){
        return await this.$axios.$get(`/api/nas/${nasId}/accesspoints/${id}`).then(({data}) => data)
    }
}
