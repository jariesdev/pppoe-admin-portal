<template>
  <div class="customer">
    <CustomerDetails :customer-id="customerId" />
    <div>
      <base-button @click="$router.back()">
        Back
      </base-button>
    </div>
  </div>
</template>
<script>
import CustomerDetails from '~/components/Content/Customer/CustomerDetails'

export default {
  components: { CustomerDetails },
  fetch () {
    this.customerId = parseInt(this.$route.params.customerId)
  }
}
</script>
