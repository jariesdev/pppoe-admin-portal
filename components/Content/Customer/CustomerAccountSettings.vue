<template>
  <div class="account-settings" title="Account Settings">
    <el-tabs tab-position="left" value="bandwidth-profile" type="border-card" class="mb-3">
      <el-tab-pane name="bandwidth-profile" label="PPPoE Profile">
        <pppoe-profile-setting
          v-if="customerPlanId && customerNasId"
          :customer-id="customerId"
          :plan-id="customerPlanId"
          :nas-id="customerNasId"
          :bandwidth-profile-id="customerBandwidthProfileId"
        />
      </el-tab-pane>
      <el-tab-pane name="account-plan" label="Account Plan">
        <div>
          <el-form>
            <el-form-item label="Account Plan">
              <el-select v-model="accountPlan.plan_id" class="d-block">
                <el-option v-for="plan in plans" :key="plan.id" :value="plan.id" :label="plan.rate_limit" />
              </el-select>
            </el-form-item>
            <el-form-item v-show="planChanged" label="Select NAS">
              <el-select v-model="accountPlan.nas_id" class="d-block">
                <el-option
                  v-for="nas in nasItems"
                  :key="nas.id"
                  :value="nas.id"
                  :label="`${nas.ap_address} (${nas.shortname})`"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-show="planChanged" label="PPPoE Profile">
              <el-select v-model="accountPlan.bandwidth_profile" class="d-block">
                <el-option
                  v-for="profile in bandwidthProfiles"
                  :key="profile.id"
                  :value="profile.id"
                  :label="profile.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-show="planChanged" label="Change Type">
              <el-select v-model="accountPlan.change_type" class="d-block">
                <el-option
                  v-for="type in planChangeTypes"
                  :key="type.value"
                  :value="type.value"
                  :label="type.label"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <div class="d-flex">
            <div class="ml-auto" />
            <base-button type="primary" size="sm" :loading="updatingAccountPlan" @click="updateAccountPlan()">
              Save
            </base-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get } from 'lodash'
import { mapState } from 'vuex'
import alerts from '~/mixins/alerts'
import PppoeProfileSetting from '~/components/Content/Customer/AccountSetting/PppoeProfileSetting'

const planChangeTypes = [
  {
    label: 'Upgrade',
    value: 'upgrade'
  },
  {
    label: 'Downgrade',
    value: 'downgrade'
  }
]

export default {
  name: 'CustomerAccountSettings',
  components: { PppoeProfileSetting },
  mixins: [alerts],
  props: {
    customerId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    customer: {},
    bandwidthProfile: null,
    updatingBandwidthProfile: false,
    accountPlan: {
      plan_id: null,
      nas_id: null,
      bandwidth_profile: null,
      change_type: 'downgrade',
      auto_assign: true
    },
    originalPlanId: null,
    planChangeTypes,
    updatingAccountPlan: false
  }),
  async fetch () {
    this.customer = await this.$store.dispatch('customer/get', this.customerId)
    await this.$store.dispatch('bandwidth-profile/load')
    await this.$store.dispatch('plan/load')
    await this.$store.dispatch('nas/load')
  },
  computed: {
    ...mapState({
      bandwidthProfiles: state => state['bandwidth-profile'].bandwidthProfiles || [],
      plans: state => state.plan.plans,
      nasItems: state => state.nas.allNas
    }),
    planChanged () {
      return this.accountPlan.plan_id !== this.originalPlanId
    },
    customerNasId () {
      return this.customer.nas_id ? +(this.customer.nas_id) : null
    },
    customerPlanId () {
      return this.customer.plan_id ? +(this.customer.plan_id) : null
    },
    customerBandwidthProfileId () {
      return parseInt(get(this.customer, 'bandwidth_profile.id'))
    }
  },
  watch: {
    customer () {
      this.initializeValue()
    }
  },
  methods: {
    initializeValue () {
      if (this.customer && this.customer.bandwidth_profile) {
        this.bandwidthProfile = parseInt(this.customer.bandwidth_profile.id)
      }

      if (this.customer && this.customer.plan_id) {
        const planId = parseInt(this.customer.plan_id)
        this.originalPlanId = planId
        this.accountPlan.plan_id = planId
      }
    },
    updateAccountPlan () {
      this.updatingAccountPlan = true
      this.$axios.$post(
        `/api/customers/${this.customerId}/plan-change`,
        this.accountPlan
      )
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Plan has been updated.'
          })
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
        .finally(() => {
          this.updatingAccountPlan = false
        })
    }
  }
}
</script>

<style scoped>

</style>
