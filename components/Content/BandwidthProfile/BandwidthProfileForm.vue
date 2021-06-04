<template>
  <div>
    <div v-if="form.errors.has('name')" class="alert alert-danger">
      <strong>Profile</strong> is already exists. You cannot have duplicate profile with same rate limit.
    </div>
    <alert-errors v-else :form="form" />
    <el-form label-position="top">
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col>
          <el-form-item label="Rate Limit (Upload / Download)" required>
            <el-select v-model="form.rate_limit" class="d-block">
              <el-option v-for="(rateLimit,index) in availableRateLimits" :key="index" :value="rateLimit.rate_limit">
                {{ rateLimit.rate_limit }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Profile Name" required>
            <el-input v-model="form.name" placeholder="1M/2M" readonly />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Address Pool" required>
            <el-select v-model="form.address_pool" class="d-block">
              <el-option v-for="addressPool in addressPools" :key="addressPool.id" :value="addressPool.name">
                {{ addressPool.name }}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Local Address" required>
            <el-input v-model="form.local_address" placeholder="192.xxx.xxx.xxx" />
          </el-form-item>
          <input-description>
            Local IP address.
          </input-description>
        </el-col>
      </el-row>
      <p class="font-italic text-muted text-right">
        All <span class="text-danger">*</span> fields are required.
      </p>
      <div>
        <base-button type="primary" :loading="form.busy" :disabled="initializing" @click="submit">
          Save
        </base-button>
        <base-button @click="cancel">
          Cancel
        </base-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { map } from 'lodash'
import { Form } from 'vform'
import { mapActions, mapState } from 'vuex'
import alerts from '~/mixins/alerts'

const numeral = require('numeral')

const rateOptions =
    map(Array(20), function (value, index) {
      let rate = ++index

      if (index > 10) {
        rate = (rate - 10) * 100
      } else if (index > 5) {
        rate = (rate - 5) * 10
      }

      return {
        label: numeral(rate).format('0,0') + ' Mbps',
        numericValue: rate,
        value: rate + 'M'
      }
    })

export default {
  name: 'BandwidthProfileForm',
  mixins: [alerts],
  props: {
    bandwidthProfile: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      initializing: false,
      rateLimitUpload: null,
      rateLimitDownload: null,
      form: new Form({
        name: null,
        rate_limit: null,
        address_pool: null,
        local_address: null
      }),
      rateOptions
    }
  },
  async fetch () {
    await this.$store.dispatch('address-pool/load')
    await this.$store.dispatch('bandwidth-profile/loadAvailableRateLimits')
  },
  computed: {
    ...mapState({
      addressPools: state => state['address-pool'].addressPools,
      availableRateLimits: state => state['bandwidth-profile'].availableRateLimits
    }),
    isEditing () {
      return this.bandwidthProfile !== null
    }
  },
  mounted () {
    this.initializeForm()
  },
  methods: {
    ...mapActions({
      getBandwidthProfile: 'bandwidth-profile/get'
    }),
    async submit () {
      if (this.isEditing && !await this.confirmUpdate()) {
        return
      }

      this.form.rate_limit = this.rateLimitUpload && this.rateLimitDownload
        ? `${this.rateLimitUpload}/${this.rateLimitDownload}`
        : null

      const url = this.isEditing ? `/api/pppoe-profiles/${this.bandwidthProfile}` : '/api/pppoe-profiles'
      this.form.submit(this.isEditing ? 'put' : 'post', url)
        .then(({ data }) => {
          this.resetForm()
          this.$emit('success', data.data)
          this.$notify({
            type: 'success',
            message: 'Bandwidth profile has been saved.'
          })
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
    },
    async confirmUpdate () {
      return await this.$confirm(
        'Apply changes?',
        'Confirm Update.',
        { type: 'warning' }
      ).catch(() => false)
    },
    cancel () {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm () {
      this.form.clear()
      this.form.reset()
    },
    async initializeForm () {
      if (this.isEditing) {
        this.initializing = true
        try {
          const profile = await this.getBandwidthProfile(this.bandwidthProfile)
          this.form.fill({
            name: profile.name,
            rate_limit: profile.rate_limit,
            address_pool: profile.address_pool,
            local_address: profile.local_address
          })

          const rateLimit = profile.rate_limit ? profile.rate_limit.split('/') : null
          if (rateLimit) {
            this.rateLimitUpload = rateLimit[0]
            this.rateLimitDownload = rateLimit[1]
          }
        } finally {
          this.initializing = false
        }
      }
    },
    rateLimitChange () {
      if (this.rateLimitUpload && this.rateLimitDownload) {
        this.form.name = `${this.rateLimitUpload}/${this.rateLimitDownload}`
      }
    }
  }
}
</script>
