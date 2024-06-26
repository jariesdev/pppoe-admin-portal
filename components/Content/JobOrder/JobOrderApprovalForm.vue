<template>
  <div class="job-order approval-form">
    <alert-errors :form="form" />
    <el-form v-model="formValid" label-position="top">
      <el-row type="flex" class="flex-wrap" :gutter="30">
        <el-col :span="24" :lg="12">
          <el-form-item label="Contract Start">
            <el-date-picker
              v-model="form.contract_start"
              type="date"
              placeholder="Pick a day"
            />
          </el-form-item>
          <input-description :errors="form.errors.get('contract_start')">
            Contract start date.
          </input-description>
        </el-col>
        <el-col :span="24" :lg="12">
          <el-form-item label="Assigned NAS">
            <el-select v-model="form.nas_id" class="d-block" clearable @change="loadPppoeProfiles()">
              <el-option
                v-for="nas in nasOptions"
                :key="nas.id"
                :label="`${nas.nasname} (${nas.shortname})`"
                :value="nas.id"
              />
            </el-select>
          </el-form-item>
          <input-description :errors="form.errors.get('nas_id')">
            Select NAS for this Job Order.
          </input-description>
        </el-col>
        <el-col :span="24" :lg="12">
          <el-form-item label="PPPoE Profile">
            <el-select v-model="form.bandwidth_profile" class="d-block" :disabled="!form.nas_id" :loading="loadingProfiles">
              <el-option
                v-for="profile in pppoeProfiles"
                :key="profile.id"
                :label="`${profile.name} `"
                :value="profile.id"
              />
            </el-select>
          </el-form-item>
          <input-description :errors="form.errors.get('bandwidth_profile')">
            Select PPPoE profile for this Job Order.
          </input-description>
        </el-col>
      </el-row>
      <div class="d-flex">
        <div class="ml-auto" />
        <base-button type="primary" :loading="processing" @click="submit()">
          Approve
        </base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Form } from 'vform'
import { mapState } from 'vuex'
import alerts from '~/mixins/alerts'

export default {
  name: 'JobOrderApprovalForm',
  mixins: [alerts],
  props: {
    jobOrderId: {
      type: Number,
      required: true
    },
    planId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      jobOrder: null,
      processing: false,
      formValid: false,
      form: new Form({
        contract_start: null,
        nas_id: null,
        bandwidth_profile: null
      }),
      pppoeProfiles: [],
      loadingProfiles: false
    }
  },
  async fetch () {
    await this.$store.dispatch('nas/load')
  },
  computed: {
    ...mapState({
      nasOptions: state => state.nas.allNas
    })
  },
  methods: {
    async submit () {
      const confirmed = await this.$confirm('Do you want to approved this job order?', 'Confirm Approval', { type: 'warning' })
        .catch(() => false)
      if (!confirmed) {
        return
      }

      this.processing = true
      this.form.post(`/api/job-orders/${this.jobOrderId}/approve`)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Job Order has been approved.'
          })
          this.$emit('success')
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
        .finally(() => {
          this.processing = false
        })
    },
    async loadPppoeProfiles () {
      const nasId = this.form.nas_id
      const planId = this.planId

      if (!nasId || !planId) {
        this.form.bandwidth_profile = null
        this.pppoeProfiles = []
        return
      }

      this.loadingProfiles = true
      this.pppoeProfiles = await this.$axios.$post('/api/profile-per-plan', {
        nas_id: nasId,
        plan_id: planId
      })
        .then(({ data }) => data)
        .catch(() => [])
        .finally(() => {
          this.loadingProfiles = false
        })
    }
  }
}
</script>

<style scoped>

</style>
