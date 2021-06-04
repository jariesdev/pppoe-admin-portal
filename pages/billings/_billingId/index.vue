<template>
  <div class="billing">
    <BillingDetails :billing-id="billingId" />
    <div class="d-block">
      <base-button @click="$router.back()">
        Back
      </base-button>
      <div class="mx-auto" />
    </div>
  </div>
</template>

<script>
import BillingDetails from '~/components/Content/Billing/BillingDetails'

export default {
  name: 'Index',
  components: { BillingDetails },
  data: () => ({
    billingId: null
  }),
  fetch () {
    this.billingId = parseInt(this.$route.params.billingId)
  },
  methods: {}
}
</script>

<style scoped>

</style>
