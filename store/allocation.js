export const actions = {
    async delete({}, id){
        return await this.$axios.$delete(`/api/allocations/${id}`)
    },
    async get({}, id){
        return await this.$axios.$get(`/api/allocations/${id}`).then(({data}) => data)
    },
    async markAsSold({}, voucherCode){
        return await this.$axios.$post(`/api/voucher-sold`, {
            vouchers: voucherCode
        })
    }
}
