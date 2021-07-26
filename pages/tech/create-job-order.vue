<template>
  <div class="create-job-order">
    <div class="container py-5">
      <h2 class="h2 text-white">
        Submit Job Order
      </h2>
      <job-order-form />
    </div>
  </div>
</template>

<script>
import JobOrderForm from '~/components/Technician/JobOrder/JobOrderForm'

export default {
  auth: false,
  components: { JobOrderForm },
  layout: 'simple'
}
</script>

<style scoped>

</style>
