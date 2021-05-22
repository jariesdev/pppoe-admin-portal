<template>
  <div>
    <alert-errors :form="form" />
    <el-form label-position="top">
      <h4>Basic</h4>
      <el-row :gutter="15" class="flex-wrap mb-3" type="flex">
        <el-col :lg="12" :span="24">
          <el-form-item label="Plan Name" required>
            <el-input v-model="form.description" placeholder="e.g. Unlimited 2 days plan" />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Bandwidth Profile" required>
            <el-select v-model="form.rate_limit" class="d-block" placeholder="Select Rate Limit">
              <el-option
                v-for="bandwidthProfile in bandwidthProfiles"
                :key="bandwidthProfile.id"
                :label="bandwidthProfile.name"
                :value="bandwidthProfile.rate_limit"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24" class="break-after">
          <el-form-item label="Price" required>
            <el-input v-model="form.price" type="number" />
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
        All <span class="text-danger">*</span> fields are required.
      </p>
      <div>
        <base-button type="primary" @click="submit()">
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
import { radiusAttributes } from '~/assets/js/constants'
import alerts from '~/mixins/alerts'

const planHourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 22].map((h) => {
  return {
    label: h > 1 ? `${h} hours` : `${h} hour`,
    value: `${h}H`
  }
})
const planDayOptions = [1, 2, 5, 7, 10, 15, 30].map((h) => {
  return {
    label: h > 1 ? `${h} days` : `${h} day`,
    value: `${h}D`
  }
})
const planOptions = [].concat(
  planHourOptions,
  planDayOptions
)

export default {
  name: 'PlanForm',
  components: { },
  mixins: [alerts],
  props: {
    editPlan: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      planOptions,
      form: new Form({
        description: null,
        radius_attribute: radiusAttributes.MAX_ALL_SESSION,
        radius_value: null,
        expire_after: null,
        rate_limit: null,
        price: null
      }),
      bandwidthProfiles: []
    }
  },
  async fetch () {
    this.bandwidthProfiles = await this.$store.dispatch('bandwidth-profile/load')
    await this.loadEditData()
  },
  computed: {
    isEditing () {
      return this.editPlan !== null
    }
  },
  mounted () {
    this.loadEditData()
  },
  methods: {
    async submit () {
      let url = '/api/plans'
      if (this.isEditing) {
        url = url + '/' + this.editPlan
      }

      try {
        const response = await this.form.submit(this.isEditing ? 'put' : 'post', url).then(({ data }) => data)
        this.$emit('success', response)
        this.$notify({
          type: 'success',
          message: 'Plan successfully ' + (this.isEditing ? 'Updated' : 'Added') + '.'
        })
      } catch (e) {
        this.showRequestErrorMessage()
      }
    },
    cancel () {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm () {
      this.form.reset()
      this.form.clear()
    },
    async loadEditData () {
      if (this.editPlan) {
        const plan = await this.$store.dispatch('plan/get', this.editPlan)

        this.form.fill({
          description: plan.description,
          price: plan.price,
          radius_attribute: plan.radius_attribute,
          radius_value: plan.radius_value,
          expire_after: plan.expire_after,
          rate_limit: plan.rate_limit
        })
      }
    },
    radiusAttributesChange (value) {
      if (value === radiusAttributes.LOGIN_TIME) {
        this.$scrollTo('#weekly-schedule-picker')
      } else {
        this.form.radius_value = null
      }
    }
  }
}
</script>
