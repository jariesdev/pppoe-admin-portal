<template>
  <div>
    <alert-errors :form="form"/>
    <el-form label-position="top">
      <h4>Basic</h4>
      <el-row :gutter="15" class="flex-wrap mb-3" type="flex">
        <el-col :lg="12" :span="24">
          <el-form-item label="Plan Name" required>
            <el-input v-model="form.description" placeholder="e.g. Unlimited 2 days plan"/>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Bandwidth Profile" required>
            <el-select v-model="form.rate_limit" class="d-block" placeholder="Select Rate Limit">
              <el-option v-for="bandwidthProfile in bandwidthProfiles"
                         :key="bandwidthProfile.id"
                         :label="bandwidthProfile.name"
                         :value="bandwidthProfile.rate_limit"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24" class="break-after">
          <el-form-item label="Price" required>
            <el-input v-model="form.price" type="number"/>
          </el-form-item>
        </el-col>
      </el-row>
      <h4>Attributes</h4>
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="12" :span="24" class="break-after">
          <el-form-item label="Radius Attribute" required>
            <el-radio-group v-model="form.radius_attribute" @change="radiusAttributesChange">
              <el-radio v-for="(option,index) in radiusAttributeOptions" :key="index" :label="option.label"
                        :value="option.value"/>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col v-if="form.radius_attribute === radiusAttributes.MAX_ALL_SESSION" :lg="12" :span="24">
          <el-form-item label="Radius Value" required>
            <el-select v-model="form.radius_value" class="d-block" placeholder="Select Expiry">
              <el-option v-for="(option,index) in planOptions" :key="index"
                         :label="option.label"
                         :value="option.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="form.radius_attribute === radiusAttributes.LOGIN_TIME" :span="24">
          <el-form-item label="Weekly Schedule" required size="mini">
            <WeeklyScheduleControl id="weekly-schedule-picker" v-model="form.radius_value" class="d-block"
                                   placeholder="Select Expiry">
              <el-option v-for="(value,index) in planExpiryOptions" :key="index"
                         :label="value +  (value > 1 ? ' Days' : ' Day')"
                         :value="`${value}D`"/>
            </WeeklyScheduleControl>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Expire After">
            <el-select v-model="form.expire_after" class="d-block" clearable placeholder="Select Expiry">
              <el-option v-for="(value,index) in planExpiryOptions" :key="index"
                         :label="value +  (value > 1 ? ' Days' : ' Day')"
                         :value="`${value}D`"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
        All <span class="text-danger">*</span> fields are required.
      </p>
      <div>
        <base-button type="primary" @click="submit()">Save</base-button>
        <base-button @click="cancel()">Cancel</base-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import {Form} from 'vform'
import {radiusAttributes} from "~/assets/js/constants";
import alerts from "~/mixins/alerts";
import WeeklyScheduleControl from "~/components/Content/BandwidthProfile/WeeklyScheduleControl";

const radiusAttributeOptions = [
  {
    label: radiusAttributes.MAX_ALL_SESSION,
    value: radiusAttributes.MAX_ALL_SESSION
  },
  {
    label: radiusAttributes.LOGIN_TIME,
    value: radiusAttributes.LOGIN_TIME
  }
]

const planHourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 22].map(h => {
  return {
    label: h > 1 ? `${h} hours` : `${h} hour`,
    value: `${h}H`
  }
})
const planDayOptions = [1, 2, 5, 7, 10, 15, 30].map(h => {
  return {
    label: h > 1 ? `${h} days` : `${h} day`,
    value: `${h}D`
  }
})
const planOptions = [].concat(
    planHourOptions,
    planDayOptions
)

const planExpiryOptions = [1, 2, 5, 7, 30]

export default {
  name: 'PlanForm',
  components: {WeeklyScheduleControl},
  mixins: [alerts],
  props: {
    editPlan: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
      radiusAttributeOptions,
      planOptions,
      planExpiryOptions,
      radiusAttributes,
      form: new Form({
        description: null,
        radius_attribute: radiusAttributes.MAX_ALL_SESSION,
        radius_value: null,
        expire_after: null,
        rate_limit: null,
        price: null,
      }),
      bandwidthProfiles: []
    }
  },
  computed: {
    isEditing() {
      return this.editPlan !== null
    }
  },
  async fetch() {
    this.bandwidthProfiles = await this.$store.dispatch('bandwidth-profile/load')
    await this.loadEditData()
  },
  mounted() {
    this.loadEditData()
  },
  methods: {
    async submit() {
      let url = '/api/plans'
      if (this.isEditing) {
        url = url + '/' + this.editPlan
      }

      try {
        const response = await this.form.submit(this.isEditing ? 'put' : 'post', url).then(({data}) => data)
        this.$emit('success', response)
        this.$notify({
          type: 'success',
          message: 'Plan successfully ' + (this.isEditing ? 'Updated' : 'Added') + '.'
        })
      } catch (e) {
        this.showRequestErrorMessage()
      }
    },
    cancel() {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm() {
      this.form.reset()
      this.form.clear()
    },
    async loadEditData() {
      if (this.editPlan) {
        const plan = await this.$store.dispatch('plan/get', this.editPlan)

        this.form.fill({
          description: plan.description,
          price: plan.price,
          radius_attribute: plan.radius_attribute,
          radius_value: plan.radius_value,
          expire_after: plan.expire_after,
          rate_limit: plan.rate_limit,
        })
      }
    },
    radiusAttributesChange(value) {
      if (value === radiusAttributes.LOGIN_TIME) {
        this.$scrollTo('#weekly-schedule-picker')
      } else {
        this.form.radius_value = null
      }
    }
  }
}
</script>
