<template>
  <card v-loading="loading" :title="`Job Order #${jobOrderNo}`">
    <el-row class="flex-wrap mb-3" type="flex" :gutter="30">
      <el-col :span="24" :lg="12">
        <p>
          Customer:
          <strong>
            <span v-show="jobOrder.salutation">{{ jobOrder.salutation }}</span>
            {{ jobOrder.first_name }} {{ jobOrder.last_name }}
          </strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          age:
          <strong>{{ jobOrder.age }}</strong>
        </p>
      </el-col>
    </el-row>
    <h4>Contact Information</h4>
    <el-row class="flex-wrap" type="flex" :gutter="30">
      <el-col :span="24" :lg="12">
        <p>
          Email:
          <strong>
            <a :href="`mailto:${jobOrder.email}`">
              {{ jobOrder.email }}
            </a>
          </strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Mobile:
          <strong>
            <a :href="`tel:${jobOrder.mobile_no}`">
              {{ jobOrder.mobile_no }}
            </a>
          </strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Address 1:
          <strong>{{ jobOrder.address_1 }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Address 2:
          <strong>{{ jobOrder.address_2 }}</strong>
        </p>
      </el-col>
      <el-col v-if="jobOrder.city" :span="24" :lg="12">
        <p>
          City:
          <strong>{{ jobOrder.city.name }}</strong>
        </p>
      </el-col>
    </el-row>
    <h4>Account Information</h4>
    <el-row class="flex-wrap mb-3" type="flex" :gutter="30">
      <el-col v-if="jobOrder.plan" :span="24" :lg="12">
        <p>
          Plan:
          <strong>{{ jobOrder.plan.description }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Account type:
          <strong>{{ jobOrder.account_type }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Contract start:
          <strong>{{ jobOrder.contract_start }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Account no.:
          <strong>{{ jobOrder.account_no }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Username:
          <strong>{{ jobOrder.username }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Misc. fee:
          <strong>{{ jobOrder.misc_fee | formatNumber({format: '0,0.00'}) }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Misc. remarks:
          <strong>{{ jobOrder.misc_remarks }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Amount paid:
          <strong>{{ jobOrder.amount_paid | formatNumber({format: '0,0.00'}) }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Balance:
          <strong>{{ jobOrder.balance | formatNumber({format: '0,0.00'}) }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Customer profile:
          <strong>{{ jobOrder.customer_profile }}</strong>
        </p>
      </el-col>
    </el-row>
    <h4>Other</h4>
    <el-row class="flex-wrap mb-3" type="flex" :gutter="30">
      <el-col :span="24" :lg="12">
        <p>
          Date Created:
          <strong>{{ jobOrder.created_at | formatDateAndTime }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Last Updated:
          <strong>{{ jobOrder.updated_at | formatDateAndTime }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Approved:
          <strong>
            <el-tag :type="jobOrder.is_approved ? 'success' : 'info'" size="small">
              {{ jobOrder.is_approved ? 'Yes' : 'No' }}
            </el-tag>
          </strong>
        </p>
      </el-col>
      <el-col v-if="jobOrder.approver" :span="24" :lg="12">
        <p>
          Approved by:
          <strong>{{ jobOrder.approver.name }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Approved date:
          <strong>{{ jobOrder.approved_date | formatDateAndTime }}</strong>
        </p>
      </el-col>
      <el-col v-if="jobOrder.field_installer" :span="24" :lg="12">
        <p>
          Field installer:
          <strong>{{ jobOrder.field_installer.name }}</strong>
        </p>
      </el-col>
    </el-row>
  </card>
</template>

<script>
export default {
  name: 'JobOrderDetails',
  props: {
    jobOrderId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      jobOrder: {}
    }
  },
  async fetch () {
    try {
      this.loading = true
      this.jobOrder = await this.$store.dispatch('job-order/get', this.jobOrderId)
      this.$emit('success', this.jobOrder)
    } finally {
      this.loading = false
    }
  },
  computed: {
    jobOrderNo () {
      return String(this.jobOrder.id || '').padStart(4, '0')
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  p {
    line-height: 2;
  }
}
</style>
