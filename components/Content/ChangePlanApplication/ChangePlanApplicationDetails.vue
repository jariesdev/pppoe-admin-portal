<template>
  <card title="Plan Application Details">
    <div class="py-4">
      <div class="row text-white">
        <div class="col-6 col-lg-4 mb-2">
          <strong class="pr-2">Plan Id:</strong>
          <span>#{{ String(planApplication.id).padStart(4, '0') }}</span>
        </div>
        <div class="col-6 col-lg-4 mb-2">
          <strong class="pr-2">Customer ID</strong>
          <span v-if="planApplication.customer">{{ planApplication.customer.first_name }} {{ planApplication.customer.last_name }}</span>
        </div>
        <div class="col-6 col-lg-4 mb-2">
          <strong class="pr-2">Current Plan:</strong>
          <span v-if="planApplication.current_plan">{{ planApplication.current_plan.description }}</span>
        </div>
        <div class="col-6 col-lg-4 mb-2">
          <strong class="pr-2">Status:</strong>
          <span>{{ planApplication.status }}</span>
        </div>
        <div class="col-6 col-lg-4 mb-2">
          <strong class="pr-2">Approved By:</strong>
          <span>{{ planApplication.approved_by ? planApplication.approved_by.name : '' }}</span>
        </div>
        <div class="col-6 col-lg-4 mb-2">
          <strong class="pr-2">Approved Date:</strong>
          <span>{{ planApplication.approved_date }}
          </span>
        </div>
      </div>
    </div>

    <slot :plan-application="planApplication" />
  </card>
</template>

<script>
export default {
  name: 'ChangePlanApplicationDetails',
  props: {
    planApplicationId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      planApplication: {}
    }
  },
  async fetch () {
    const { data } = await this.$axios.$get(`/api/changePlan-applications/${this.planApplicationId}`)
    this.planApplication = data
  }
}
</script>

<style scoped>

</style>
