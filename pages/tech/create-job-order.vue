<template>
  <div class="create-job-order">
    <div class="container">
      <job-order-form url="/tech/api/job-orders" />
    </div>
  </div>
</template>

<script>
import JobOrderForm from '~/components/Content/JobOrder/JobOrderForm'

export default {
  auth: false,
  components: { JobOrderForm },
  layout: 'simple'
}
</script>

<style scoped>

</style>
