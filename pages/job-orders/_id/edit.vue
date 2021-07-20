<template>
  <div class="job-order--details">
    <card title="Edit Job Order">
      <job-order-form :job-order-id="jobOrderId" @cancel="$router.back()" />
    </card>
  </div>
</template>

<script>
import JobOrderForm from '~/components/Content/JobOrder/JobOrderForm'

export default {
  components: { JobOrderForm },
  data () {
    return {
      jobOrderId: null,
      showApprovalForm: false
    }
  },
  fetch () {
    this.jobOrderId = +this.$route.params.id
  },
  head () {
    return {
      title: 'Edit Job Order'
    }
  },
  methods: {}
}
</script>
