<template>
  <div class="customer-form">
    <alert-errors :form="form" />
    <el-form v-loading="loading" :disabled="loading" label-position="top">
      <h4>Personal</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="4" :span="24">
          <el-form-item label="Title">
            <el-select v-model="form.plan_id" class="d-block">
              <el-option
                v-for="(salutation,index) in salutations"
                :key="index"
                :label="salutation"
                :value="salutation"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="10" :span="24">
          <el-form-item label="First Name" required>
            <el-input v-model="form.first_name" class="d-block" />
          </el-form-item>
        </el-col>
        <el-col :lg="10" :span="24">
          <el-form-item label="Last Name" required>
            <el-input v-model="form.last_name" class="d-block" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Age" required>
            <el-input v-model="form.age" type="number" class="d-block" />
          </el-form-item>
        </el-col>
      </el-row>
      <h4>Contact Information</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="12" :span="24">
          <el-form-item label="Email" required>
            <el-input v-model="form.email" type="email" class="d-block" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Mobile Number" required>
            <el-input v-model="form.mobile_no" class="d-block" />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Address 1" required>
            <el-input v-model="form.address_1" class="d-block" />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Address 2">
            <el-input v-model="form.address_2" class="d-block" />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="City" required>
            <el-select v-model="form.city_id" class="d-block">
              <el-option v-for="city in cities" :key="city.id" :label="city.name" :value="city.id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h4>Account Settings</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :span="24">
          <el-form-item label="Account Status">
            <el-checkbox v-model="form.is_active">
              Is Active
            </el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Plan" required>
            <el-select v-model="form.plan_id" class="d-block">
              <el-option v-for="plan in plans" :key="plan.id" :label="plan.rate_limit" :value="plan.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Bandwidth Profile">
            <el-select v-model="form.bandwidth_profile" class="d-block">
              <el-option
                v-for="bandwidthProfile in bandwidthProfiles"
                :key="bandwidthProfile.id"
                :label="`${bandwidthProfile.name} `"
                :value="bandwidthProfile.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Account Type" required>
            <el-select v-model="form.account_type" class="d-block">
              <el-option
                v-for="(accountType,index) in accountTypes"
                :key="index"
                :label="accountType.label"
                :value="accountType.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Account Number" required>
            <el-input v-model="form.account_no" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Contract Start" required>
            <el-date-picker
              v-model="form.contract_start"
              type="date"
              placeholder="Pick a day"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Misc. Balance" required>
            <el-input v-model="form.misc_balance" type="number" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Username" required>
            <el-input v-model="form.rad_username" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Password" required>
            <el-input v-model="form.rad_password" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Customer Profile" required>
            <el-input v-model="form.customer_profile" class="d-block" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-checkbox v-model="changePassword">
            Change Account Password
          </el-checkbox>
        </el-col>
        <el-col v-show="changePassword" :lg="12" :span="24">
          <el-form-item label="Password" required>
            <el-input v-model="form.password" />
          </el-form-item>
        </el-col>
        <el-col v-show="changePassword" :lg="12" :span="24">
          <el-form-item label="Confirm Password" required>
            <el-input v-model="form.password_confirmation" />
          </el-form-item>
        </el-col>
      </el-row>
      <required-fields-text />
      <div>
        <base-button type="primary" :loading="processing" :disabled="loading" @click="submit()">
          Save Changes
        </base-button>
        <base-button @click="cancel()">
          Cancel
        </base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Form } from 'vform'
import { mapState } from 'vuex'
import alerts from '~/mixins/alerts'
import salutations from '~/assets/data/salutation.json'
import { accountTypes as accountTypeConstants } from '~/assets/js/constants'

const accountTypes = [
  {
    label: 'Regular',
    value: accountTypeConstants.REGULAR
  }
]

export default {
  name: 'CustomerForm',
  mixins: [alerts],
  props: {
    customerId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      processing: false,
      salutations,
      accountTypes,
      form: new Form({
        salutation: salutations[0],
        first_name: null,
        last_name: null,
        mobile_no: null,
        address_1: null,
        address_2: null,
        city_id: null,
        age: null,
        email: null,
        customer_profile: null,
        plan_id: null,
        bandwidth_profile: null,
        account_type: null,
        rad_username: null,
        rad_password: null,
        misc_balance: null,
        contract_start: null,
        account_no: null,
        password: null,
        password_confirmation: null,
        is_active: false
      }),
      partnerBranches: [],
      changePassword: false
    }
  },
  async fetch () {
    await this.$store.dispatch('plan/load')
    await this.$store.dispatch('city/loadCities')
    await this.$store.dispatch('bandwidth-profile/load')
  },
  computed: {
    ...mapState({
      plans: state => state.plan.plans,
      cities: state => state.city.cities,
      bandwidthProfiles: state => state['bandwidth-profile'].bandwidthProfiles || []
    })
  },
  mounted () {
    this.initializeForm()
  },
  methods: {
    async initializeForm () {
      this.loading = true
      const customer = await this.$store.dispatch('customer/get', this.customerId)
      this.form.fill({
        salutation: customer.salutation,
        first_name: customer.first_name,
        last_name: customer.last_name,
        mobile_no: customer.mobile_no,
        address_1: customer.address_1,
        address_2: customer.address_2,
        city_id: customer.city_id,
        age: customer.age,
        email: customer.email,
        customer_profile: customer.customer_profile,
        plan_id: customer.plan_id,
        bandwidth_profile: customer.bandwidth_profile ? customer.bandwidth_profile.id : null,
        account_type: customer.account_type,
        rad_username: customer.rad_username,
        rad_password: customer.rad_password,
        misc_balance: customer.misc_balance,
        contract_start: customer.contract_start,
        account_no: customer.account_no,
        is_active: Boolean(customer.is_active)
      })
      this.loading = false
    },
    async submit () {
      const confirmed = await this.$confirm('Are you sure to save changes?', 'Apply Changes', { type: 'warning' })
      if (!confirmed) { return }

      this.processing = true

      if (!this.changePassword) {
        this.form.password = undefined
        this.form.password_confirmation = undefined
      }

      this.form.put(`/api/customers/${this.customerId}`)
        .then(({ data }) => {
          this.$notify({
            type: 'success',
            message: 'Customer updated.'
          })
          this.$emit('success', data)
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
        .finally(() => {
          this.processing = false
        })
    },
    cancel () {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm () {
      this.form.clear()
      this.form.reset()
    },
    selectedPartnerChange (id) {
      this.partnerBranches = []
      this.form.branch_id = null

      if (!id) {
        return
      }

      this.$axios.$get(`/api/partners/${id}/branches`)
        .then(({ data }) => {
          this.partnerBranches = data
        })
        .catch(() => {
          this.partnerBranches = []
        })
    }
  }
}
</script>
