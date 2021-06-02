<template>
  <card v-loading="loading" :title="`Job Order #${jobOrderNo}`">
    <el-row class="flex-wrap mb-3" type="flex" :gutter="30">
      <el-col :span="24" :lg="12">
        <p>
          Customer:
          <strong>
            <span v-show="jobOrderObject.salutation">{{ jobOrderObject.salutation }}</span>
            {{ jobOrderObject.first_name }} {{ jobOrderObject.last_name }}
          </strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          age:
          <strong>{{ jobOrderObject.age }}</strong>
        </p>
      </el-col>
    </el-row>
    <h4>Contact Information</h4>
    <el-row class="flex-wrap" type="flex" :gutter="30">
      <el-col :span="24" :lg="12">
        <p>
          Email:
          <strong>{{ jobOrderObject.email }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Mobile:
          <strong>{{ jobOrderObject.mobile_no }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Address 1:
          <strong>{{ jobOrderObject.address_1 }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Address 2:
          <strong>{{ jobOrderObject.address_2 }}</strong>
        </p>
      </el-col>
      <el-col v-if="jobOrderObject.city" :span="24" :lg="12">
        <p>
          City:
          <strong>{{ jobOrderObject.city.name }}</strong>
        </p>
      </el-col>
    </el-row>
    <h4>Account Information</h4>
    <el-row class="flex-wrap mb-3" type="flex" :gutter="30">
      <el-col v-if="jobOrderObject.plan" :span="24" :lg="12">
        <p>
          Plan:
          <strong>{{ jobOrderObject.plan.description }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Account type:
          <strong>{{ jobOrderObject.account_type }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Trial days:
          <strong>{{ jobOrderObject.trial_days }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Contract start:
          <strong>{{ jobOrderObject.contract_start }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Account no.:
          <strong>{{ jobOrderObject.account_no }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Username:
          <strong>{{ jobOrderObject.username }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Misc. fee:
          <strong>{{ jobOrderObject.misc_fee | formatNumber({format: '0,0.00'}) }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Misc. remarks:
          <strong>{{ jobOrderObject.misc_remarks }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Amount paid:
          <strong>{{ jobOrderObject.amount_paid | formatNumber({format: '0,0.00'}) }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Balance:
          <strong>{{ jobOrderObject.balance | formatNumber({format: '0,0.00'}) }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          customer_profile:
          <strong>{{ jobOrderObject.customer_profile }}</strong>
        </p>
      </el-col>
    </el-row>
    <h4>Other</h4>
    <el-row class="flex-wrap mb-3" type="flex" :gutter="30">
      <el-col :span="24" :lg="12">
        <p>
          Date Created:
          <strong>{{ jobOrderObject.created_at | formatDateAndTime }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Last Updated:
          <strong>{{ jobOrderObject.updated_at | formatDateAndTime }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Approved:
          <strong>
            <el-tag :type="jobOrderObject.is_approved ? 'success' : 'info'" size="small">
              {{ jobOrderObject.is_approved ? 'Yes' : 'No' }}
            </el-tag>
          </strong>
        </p>
      </el-col>
      <el-col v-if="jobOrderObject.approver" :span="24" :lg="12">
        <p>
          Approved by:
          <strong>{{ jobOrderObject.approver.name }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :lg="12">
        <p>
          Approved date:
          <strong>{{ jobOrderObject.approved_date | formatDateAndTime }}</strong>
        </p>
      </el-col>
      <el-col v-if="jobOrderObject.field_installer" :span="24" :lg="12">
        <p>
          Field installer:
          <strong>{{ jobOrderObject.field_installer.name }}</strong>
        </p>
      </el-col>
    </el-row>
  </card>
</template>

<script>
export default {
  name: 'JobOrderDetails',
  props: {
    jobOrder: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      jobOrderObject: {}
    }
  },
  async fetch () {
    try {
      this.loading = true
      this.jobOrderObject = await this.$store.dispatch('job-order/get', this.jobOrder)
    } finally {
      this.loading = false
    }
  },
  computed: {
    jobOrderNo () {
      return String(this.jobOrderObject.id || '').padStart(4, '0')
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
