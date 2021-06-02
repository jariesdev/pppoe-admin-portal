<template>
  <div class="job-order--details">
    <JobOrderDetails :job-order="jobOrderId" />
    <div>
      <base-button @click="$router.back()">
        Back
      </base-button>
    </div>
  </div>
</template>

<script>
import JobOrderDetails from '~/components/Content/JobOrder/JobOrderDetails'

export default {
  components: { JobOrderDetails },
  data () {
    return {
      jobOrderId: null
    }
  },
  fetch () {
    this.jobOrderId = +this.$route.params.id
  },
  head () {
    return {
      title: 'Job Order Details'
    }
  }
}
</script>
