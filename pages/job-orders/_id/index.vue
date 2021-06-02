<template>
  <div class="job-order--details">
    <JobOrderDetails :job-order-id="jobOrderId" @success="jobOrderLoaded" />
    <card v-if="showApprovalForm" title="Approve Job Order">
      <JobOrderApprovalForm :job-order-id="jobOrderId" />
    </card>
    <div>
      <base-button @click="$router.back()">
        Back
      </base-button>
    </div>
  </div>
</template>

<script>
import JobOrderDetails from '~/components/Content/JobOrder/JobOrderDetails'
import JobOrderApprovalForm from '~/components/Content/JobOrder/JobOrderApprovalForm'

export default {
  components: { JobOrderApprovalForm, JobOrderDetails },
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
      title: 'Job Order Details'
    }
  },
  methods: {
    jobOrderLoaded (jobOrder) {
      this.showApprovalForm = !jobOrder.is_approved
    }
  }
}
</script>
