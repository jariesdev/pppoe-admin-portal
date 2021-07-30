<template>
  <div>
    <client-only>
      <alert-errors :form="form" />
    </client-only>
    <el-form label-position="top" method="post" @submit.prevent="submit()">
      <h4>Personal</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="4" :span="24">
          <el-form-item label="Title">
            <el-select v-model="form.salutation" class="d-block" name="salutation">
              <el-option
                v-for="(salutation,index) in salutations"
                :key="index"
                :label="salutation"
                :value="salutation"
              />
            </el-select>
          </el-form-item>
          <input-description :errors="getFormErrors('salutation')" />
        </el-col>
        <el-col :lg="10" :span="24">
          <el-form-item label="First Name" required>
            <el-input v-model="form.first_name" class="d-block" name="first_name" />
            <input-description :errors="getFormErrors('first_name')">
              Customer's first name.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="10" :span="24">
          <el-form-item label="Last Name" required>
            <el-input v-model="form.last_name" class="d-block" name="last_name" />
            <input-description :errors="getFormErrors('last_name')">
              Customer's last name.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Age" required>
            <el-input v-model="form.age" type="number" class="d-block" name="age" />
            <input-description :errors="getFormErrors('age')">
              Customer's age.
            </input-description>
          </el-form-item>
        </el-col>
      </el-row>
      <h4>Contact Information</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="12" :span="24">
          <el-form-item label="Email" required>
            <el-input v-model="form.email" type="email" class="d-block" name="email" />
            <input-description :errors="getFormErrors('email')">
              Customer's email address.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Mobile Number" required>
            <el-input v-model="form.mobile_no" class="d-block" name="mobile_no" />
            <input-description :errors="getFormErrors('mobile_no')">
              Customer's mobile number.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Address 1" required>
            <el-input v-model="form.address_1" class="d-block" name="address_1" />
            <input-description :errors="getFormErrors('address_1')">
              address line 1 e.g. street
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Address 2">
            <el-input v-model="form.address_2" class="d-block" name="address_2" />
            <input-description :errors="getFormErrors('address_2')">
              Address line 2.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="City" required>
            <el-select v-model="form.city_id" class="d-block" filterablename="city_id">
              <el-option v-for="city in cities" :key="city.id" :label="city.name" :value="city.id" />
            </el-select>
            <input-description :errors="getFormErrors('city_id')">
              Customer city.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Area Code">
            <el-input v-model="form.area_code" class="d-block" name="area_code" />
            <input-description :errors="getFormErrors('area_code')">
              Customer area code.
            </input-description>
          </el-form-item>
        </el-col>
      </el-row>
      <h4>Account Settings</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="12" :span="24">
          <el-form-item label="Plan" required>
            <el-select v-model="form.plan_id" class="d-block" name="plan_id">
              <el-option v-for="plan in plans" :key="plan.id" :label="plan.description" :value="plan.id" />
            </el-select>
            <input-description :errors="getFormErrors('plan_id')">
              Select plan customer applying for.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Account Type" required>
            <el-select v-model="form.account_type" class="d-block" name="account_type">
              <el-option
                v-for="(accountType,index) in accountTypes"
                :key="index"
                :label="accountType.label"
                :value="accountType.value"
              />
            </el-select>
            <input-description :errors="getFormErrors('account_type')">
              Customer's account type.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Username" required>
            <el-input v-model="form.username" name="username" />
            <input-description :errors="getFormErrors('username')">
              Username use to access customer's portal.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Password" required>
            <el-input v-model="form.password" show-password name="password" />
            <input-description :errors="getFormErrors('password')">
              Account password use to access customer's portal.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Customer Profile" required>
            <el-input v-model="form.customer_profile" class="d-block" placeholder="e.g. Work From Home" name="customer_profile" />
            <input-description :errors="getFormErrors('customer_profile')">
              Account type hint.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Misc. Fee" required>
            <el-input v-model="form.misc_fee" type="number" name="misc_fee" />
            <input-description :errors="getFormErrors('misc_fee')">
              Additional fee not including on the plan.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Misc. Remarks" required>
            <el-input v-model="form.misc_remarks" type="textarea" name="misc_remarks" />
            <input-description :errors="getFormErrors('misc_remarks')">
              Brief details for misc fee.
            </input-description>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Amount Paid" required>
            <el-input v-model="form.amount_paid" type="number" name="amount_paid" />
            <input-description :errors="getFormErrors('amount_paid')">
              Amount paid by the user related to misc.
            </input-description>
          </el-form-item>
        </el-col>
      </el-row>
      <required-fields-text />
      <div>
        <base-button type="primary" native-type="button" :loading="processing" :disabled="loading" @click="submit()">
          Save
        </base-button>
        <base-button v-show="!hideCancelButton" @click="cancel()">
          Cancel
        </base-button>
        <base-button v-show="showResetButton" @click="confirmResetForm()">
          Reset
        </base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Form } from 'vform'
import { mapActions, mapState } from 'vuex'
import alerts from '~/mixins/alerts'
import salutations from '~/assets/data/salutation.json'
import { accountTypes as accountTypeConstants } from '~/assets/js/constants'

const accountTypes = [
  {
    label: 'Regular',
    value: accountTypeConstants.REGULAR
  },
  {
    label: 'Complimentary',
    value: accountTypeConstants.COMPLIMENTARY
  }
]

export default {
  name: 'JobOrderForm',
  mixins: [alerts],
  props: {
    jobOrderId: {
      type: Number,
      required: false,
      default: null
    },
    hideCancelButton: {
      type: Boolean,
      required: false,
      default: false
    },
    showResetButton: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      processing: false,
      salutations,
      accountTypes,
      form: new Form({
        pin: '',
        salutation: salutations[0],
        first_name: null,
        last_name: null,
        mobile_no: null,
        address_1: null,
        address_2: null,
        city_id: null,
        area_code: null,
        age: null,
        email: null,
        customer_profile: null,
        plan_id: null,
        account_type: accountTypeConstants.REGULAR,
        username: null,
        password: null,
        misc_fee: null,
        misc_remarks: null,
        amount_paid: null
      }),
      partnerBranches: [],
      plans: []
    }
  },
  async fetch () {
    await this.$store.dispatch('city/loadCities')
    this.plans = await this.$axios.$get('/tech/api/plans')
      .then(({ data }) => data)
      .catch(() => [])
  },
  computed: {
    ...mapState({
      cities: state => state.city.cities
    }),
    isEditing () {
      return this.jobOrderId !== null
    }
  },
  mounted () {
    this.form = new Form({
      pin: '',
      salutation: salutations[0],
      first_name: null,
      last_name: null,
      mobile_no: null,
      address_1: null,
      address_2: null,
      city_id: null,
      area_code: null,
      age: null,
      email: null,
      customer_profile: null,
      plan_id: null,
      account_type: accountTypeConstants.REGULAR,
      username: null,
      password: null,
      misc_fee: null,
      misc_remarks: null,
      amount_paid: null
    })

    if (this.isEditing) {
      this.initializeForm()
    }

    this.$fetch()
  },
  methods: {
    ...mapActions({
      getJobOrder: 'job-order/get'
    }),
    async submit () {
      const { value } = await this.$prompt('Please enter PIN.', 'PIN Required', {
        type: 'info',
        showCancelButton: false,
        closeOnClickModal: false,
        closeOnPressEscape: false,
        closeOnHashChange: false,
        inputType: 'password'
      })

      this.form.tech_pin = value
      if (!this.form.tech_pin) {
        await this.submit()
      }

      this.processing = true
      const url = this.isEditing ? `/tech/api/job-orders/${this.jobOrderId}` : '/tech/api/job-orders'
      const method = this.isEditing ? 'put' : 'post'
      this.form.submit(method, url)
        .then(({ data }) => {
          this.$notify({
            type: 'success',
            message: 'Job order created.'
          })
          this.$emit('success', data)
          this.resetForm()
        })
        .catch(() => {
          this.$scrollTo('.alert')
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
    async confirmResetForm () {
      const confirmed = await this.$confirm('Are you sure to reset form?', 'Reset Form')
      if (confirmed) {
        this.resetForm()
      }
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
    },
    async initializeForm () {
      const jobOrder = await this.getJobOrder(this.jobOrderId)
      this.form.fill({
        salutation: jobOrder.salutation,
        first_name: jobOrder.first_name,
        last_name: jobOrder.last_name,
        mobile_no: jobOrder.mobile_no,
        address_1: jobOrder.address_1,
        address_2: jobOrder.address_2,
        city_id: jobOrder.city_id,
        area_code: jobOrder.area_code,
        age: jobOrder.age,
        email: jobOrder.email,
        customer_profile: jobOrder.customer_profile,
        plan_id: jobOrder.plan_id,
        account_type: jobOrder.account_type,
        username: jobOrder.username,
        password: jobOrder.password,
        misc_fee: jobOrder.misc_fee,
        misc_remarks: jobOrder.misc_remarks,
        amount_paid: jobOrder.amount_paid
      })
    },
    getFormErrors (key) {
      return this.form.errors && typeof this.form.errors.has === 'function' && this.form.errors.has(key)
        ? this.form.errors.get(key)
        : null
    }
  }
}
</script>
