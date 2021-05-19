export default {
    methods: {
        showRequestErrorMessage(){
            this.$notify({
                type: 'danger',
                message: 'Unable to process your request. Please check your input and try again.'
            })
        },
        showTableErrorMessage(){
            this.$notify({
                message: 'Failed to load table data. Please reload the page.'
            })
        }
    }
}
