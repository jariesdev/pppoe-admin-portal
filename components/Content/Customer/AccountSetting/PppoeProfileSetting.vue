<template>
  <div class="account pppoe-profile">
    <el-form :disabled="isProcessing" @submit.prevent>
      <el-form-item label="PPPoE Profile">
        <el-select v-model="bandwidthProfile" class="d-block">
          <el-option
            v-for="profile in bandwidthProfiles"
            :key="profile.id"
            :value="profile.id"
            :label="profile.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div class="d-flex">
      <div class="ml-auto" />
      <base-button type="primary" native-type="submit" size="sm" :loading="isProcessing" @click="submit()">
        Save
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PppoeProfileSetting',
  props: {
    customerId: {
      type: Number,
      required: true
    },
    planId: {
      type: Number,
      required: true
    },
    nasId: {
      type: Number,
      required: true
    },
    bandwidthProfileId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      isProcessing: false,
      bandwidthProfiles: [],
      bandwidthProfile: null
    }
  },
  async fetch () {
    this.bandwidthProfiles = await this.getProfilePerPlan({
      planId: this.planId,
      nasId: this.nasId
    })
  },
  computed: {},
  created () {
    this.bandwidthProfile = this.bandwidthProfileId
  },
  methods: {
    ...mapActions({
      getProfilePerPlan: 'bandwidth-profile/perPlan'
    }),
    async submit () {
      const confirmed = await this.$confirm(
        'Do you want to save customer account profile settings?',
        'Bandwidth Profile Update',
        { type: 'warning' }
      ).catch(() => false)

      if (!confirmed) {
        return
      }

      this.updateBandwidthProfile()
    },
    updateBandwidthProfile () {
      this.isProcessing = true
      this.$axios.$post(`/api/customers/${this.customerId}/profile-change`, { bandwidth_profile: this.bandwidthProfile })
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'PPPoE profile has been updated.'
          })
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
        .finally(() => {
          this.isProcessing = false
        })
    }
  }
}
</script>

<style scoped>

</style>
