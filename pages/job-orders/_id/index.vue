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
      <base-button v-show="!isApproved" class="btn btn-danger mr-2" @click="confirmDelete()">
        Delete
      </base-button>
      <nuxt-link v-show="!isApproved" class="btn btn-info" :to="`/job-orders/${jobOrderId}/edit`">
        Edit
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import JobOrderDetails from '~/components/Content/JobOrder/JobOrderDetails'
import JobOrderApprovalForm from '~/components/Content/JobOrder/JobOrderApprovalForm'
import alerts from '~/mixins/alerts'

export default {
  components: { JobOrderApprovalForm, JobOrderDetails },
  mixins: [alerts],
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
    ...mapActions({
      deleteJobOrder: 'job-order/delete'
    }),
    jobOrderLoaded (jobOrder) {
      this.isApproved = jobOrder.is_approved
      this.showApprovalForm = !this.isApproved
    },
    async confirmDelete () {
      const confirmed = await this.$confirm('Are you sure to delete this Job Order?', {
        title: 'Delete Job Order',
        type: 'warning'
      })

      if (!confirmed) {
        return
      }

      this.deleteJobOrder(this.jobOrderId)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Job order deleted.'
          })
          this.$router.push('/job-orders')
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
    }
  }
}
</script>
