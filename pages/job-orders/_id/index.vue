<template>
  <div class="job-order--details">
    <JobOrderDetails :job-order-id="jobOrderId" @success="jobOrderLoaded" />
    <card v-if="showApprovalForm" title="Approve Job Order">
      <JobOrderApprovalForm :job-order-id="jobOrderId" />
    </card>
    <div class="d-flex">
      <base-button @click="$router.back()">
        Back
      </base-button>
      <div class="mx-auto" />
      <nuxt-link v-show="!isApproved" class="btn btn-info" :to="`/job-orders/${jobOrderId}/edit`">
        Edit
      </nuxt-link>
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
      showApprovalForm: false,
      isApproved: true
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
      this.isApproved = jobOrder.is_approved
      this.showApprovalForm = !this.isApproved
    }
  }
}
</script>
