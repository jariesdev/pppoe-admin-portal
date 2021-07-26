<template>
  <div>
    <alert-errors :form="form" />
    <el-form label-position="top">
      <h4>Personal</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="4" :span="24">
          <el-form-item label="Title">
            <el-select v-model="form.salutation" class="d-block">
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
            <el-select v-model="form.city_id" class="d-block" filterable>
              <el-option v-for="city in cities" :key="city.id" :label="city.name" :value="city.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Area Code">
            <el-input v-model="form.area_code" class="d-block" />
          </el-form-item>
        </el-col>
      </el-row>
      <h4>Account Settings</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="12" :span="24">
          <el-form-item label="Plan" required>
            <el-select v-model="form.plan_id" class="d-block">
              <el-option v-for="plan in plans" :key="plan.id" :label="plan.rate_limit" :value="plan.id" />
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
          <el-form-item label="Username" required>
            <el-input v-model="form.username" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Password" required>
            <el-input v-model="form.password" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Amount Paid" required>
            <el-input v-model="form.amount_paid" type="number" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Customer Profile" required>
            <el-input v-model="form.customer_profile" class="d-block" placeholder="e.g. Work From Home" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Misc. Fee" required>
            <el-input v-model="form.misc_fee" type="number" />
          </el-form-item>
        </el-col>
        <el-col :lg="24" :span="24">
          <el-form-item label="Misc. Remarks" required>
            <el-input v-model="form.misc_remarks" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <required-fields-text />
      <div>
        <base-button type="primary" :loading="processing" :disabled="loading" @click="submit()">
          Save
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
    url: {
      type: String,
      required: false,
      default: null
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
        area_code: null,
        age: null,
        email: null,
        customer_profile: null,
        plan_id: null,
        account_type: null,
        username: null,
        password: null,
        misc_fee: null,
        misc_remarks: null,
        amount_paid: null
      }),
      partnerBranches: []
    }
  },
  async fetch () {
    await this.$store.dispatch('plan/load')
    await this.$store.dispatch('city/loadCities')
  },
  computed: {
    ...mapState({
      plans: state => state.plan.plans,
      cities: state => state.city.cities
    }),
    isEditing () {
      return this.jobOrderId !== null
    }
  },
  mounted () {
    this.form = new Form({
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
      account_type: null,
      username: null,
      password: null,
      misc_fee: null,
      misc_remarks: null,
      amount_paid: null
    })

    if (this.isEditing) {
      this.initializeForm()
    }
  },
  methods: {
    ...mapActions({
      getJobOrder: 'job-order/get'
    }),
    submit () {
      this.processing = true
      let url
      if (this.url) {
        url = this.url
      } else {
        url = this.isEditing ? `/api/job-orders/${this.jobOrderId}` : '/api/job-orders'
      }
      const method = this.isEditing ? 'put' : 'post'
      this.form.submit(method, url)
        .then(({ data }) => {
          this.$notify({
            type: 'success',
            message: 'Job order created.'
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
    }
  }
}
</script>
