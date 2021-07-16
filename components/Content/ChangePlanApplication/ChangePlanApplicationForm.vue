<template>
  <div class="">
    <alert-errors :form="form" />
    <el-form label-position="top" :disabled="form.busy">
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :span="12">
          <el-form-item label="Status" required>
            <el-select v-model="form.status">
              <el-option value="approved">
                Approved
              </el-option>
              <el-option value="denied">
                Denied
              </el-option>
              <el-option value="cancelled">
                Cancelled
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Change Type" required>
            <el-select v-model="form.change_type">
              <el-option value="upgrade">
                Upgrade
              </el-option>
              <el-option value="downgrade">
                Downgrade
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Nas" required>
            <el-select v-model="form.nas_id">
              <el-option v-for="nas in allNas" :key="nas.id" :value="nas.id" :label="nas.shortname" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Plan" required>
            <el-select v-model="form.plan_id">
              <el-option v-for="plan in plans" :key="plan.id" :value="plan.id" :label="plan.description" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="PPPoE Profile" required>
            <el-select v-model="form.bandwidth_profile">
              <el-option v-for="bandwidthProfile in bandwidthProfiles" :key="bandwidthProfile.id" :value="bandwidthProfile.id" :label="bandwidthProfile.name" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
        All <span class="text-danger">*</span> are required.
      </p>
      <div>
        <base-button :loading="form.busy" type="primary" :disabled="initializing" @click="submit()">
          Save
        </base-button>
        <base-button :disabled="form.busy" @click="cancel()">
          Cancel
        </base-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { AlertErrors, Form } from 'vform'
import { mapActions, mapState } from 'vuex'
import alertsMixin from '~/mixins/alerts'

export default {
  name: 'ChangePlanApplicationForm',
  components: { AlertErrors },
  mixins: [alertsMixin],
  props: {
    changePlanApplicationId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      initializing: false,
      form: new Form({
        plan_id: null,
        nas_id: null,
        bandwidth_profile: null,
        status: null,
        change_type: null
      })
    }
  },
  async fetch () {
    await this.$store.dispatch('nas/load')
    await this.$store.dispatch('plan/load')
    await this.$store.dispatch('bandwidth-profile/load')
  },
  computed: {
    ...mapState({
      allNas: state => state.nas.allNas,
      plans: state => state.plan.plans,
      bandwidthProfiles: state => state['bandwidth-profile'].bandwidthProfiles
    })
  },
  mounted () {
    this.loadData()
  },
  methods: {
    ...mapActions({
      getBranch: 'branch/get'
    }),
    async submit () {
      const formData = this.form.data()

      try {
        const url = `/api/changePlan-applications/${this.changePlanApplicationId}/approve`
        const { data, message } = await this.form.post(url, formData)

        this.$emit('success', data)
        this.$notify({
          type: 'success',
          message
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
      this.form.clear()
      this.form.reset()
    },
    async loadData () {
      this.initializing = true
      try {
        const planApplication = await this.$axios
          .$get(`/api/changePlan-applications/${this.changePlanApplicationId}`)
          .then(({ data }) => data)
        this.form.fill({
          plan_id: planApplication.plan_id,
          nas_id: planApplication.nas_id,
          bandwidth_profile: planApplication.bandwidth_profile,
          status: planApplication.status,
          change_type: planApplication.change_type
        })
      } finally {
        this.initializing = false
      }
    }
  }
}
</script>
