<template>
  <div class="customer-edit">
    <card title="Edit customer">
      <CustomerForm :customer-id="customerId" @cancel="cancel()" />
    </card>
  </div>
</template>

<script>
import CustomerForm from '~/components/Content/Customer/CustomerForm'
export default {
  name: 'Edit',
  components: { CustomerForm },
  data: () => ({
    customerId: null
  }),
  fetch () {
    this.customerId = parseInt(this.$route.params.customerId)
  },
  methods: {
    cancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
