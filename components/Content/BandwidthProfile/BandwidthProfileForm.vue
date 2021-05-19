<template>
  <div>
    <div class="alert alert-danger" v-if="form.errors.has('name')">
      <strong>Profile</strong> is already exists. You cannot have duplicate profile with same rate limit.
    </div>
    <alert-errors v-else :form="form"/>
    <el-form label-position="top">
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col >
          <el-form-item label="Rate Limit (Upload / Download)" required>
            <div class="d-flex">
              <el-select v-model="rateLimitUpload" class="d-block flex-shrink-0 flex-grow-1" @change="rateLimitChange">
                <el-option v-for="(rateOption,index) in rateOptions" :key="index"
                           :label="'Upload up to ' + rateOption.label"
                           :value="rateOption.value"/>
              </el-select>
              <span class="px-2">/</span>
              <el-select v-model="rateLimitDownload" class="d-block flex-shrink-0 flex-grow-1" @change="rateLimitChange">
                <el-option v-for="(rateOption,index) in rateOptions" :key="index"
                           :label="'Download up to ' + rateOption.label"
                           :value="rateOption.value"/>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <el-col >
          <el-form-item label="Profile Name" required>
            <el-input v-model="form.name" placeholder="1M/2M" readonly/>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="font-italic text-muted text-right">
        All <span class="text-danger">*</span> fields are required.
      </p>
      <div>
        <base-button type="primary" @click="submit">Save</base-button>
        <base-button @click="cancel">Cancel</base-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import {map} from 'lodash'
import {Form} from 'vform'
import alerts from "~/mixins/alerts";
import {mapActions} from "vuex";

const rateOptions =
    map(Array(20), function (value, index) {
      let rate = ++index

      if (index > 10) {
        rate = (rate - 10) * 100
      } else if (index > 5) {
        rate = (rate - 5) * 10
      }

      return {
        label: rate + ' Mbps',
        numericValue: rate,
        value: rate + 'M'
      }
    })

export default {
  name: 'BandwidthProfileForm',
  mixins: [alerts],
  data() {
    return {
      rateLimitUpload: null,
      rateLimitDownload: null,
      form: new Form({
        name: null,
        rate_limit: null,
        address_pool: null,
        shared_users: null,
      }),
      rateOptions
    }
  },
  props: {
    bandwidthProfile: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    isEditing() {
      return this.bandwidthProfile !== null
    }
  },
  mounted() {
    this.initializeForm()
  },
  methods: {
    ...mapActions({
      getBandwidthProfile: 'bandwidth-profile/get'
    }),
    async submit() {
      if (this.isEditing && !await this.confirmUpdate()) {
        return
      }

      this.form.rate_limit = this.rateLimitUpload && this.rateLimitDownload
          ? `${this.rateLimitUpload}/${this.rateLimitDownload}` : null

      const url = this.isEditing ? `/api/bandwidth-profiles/${this.bandwidthProfile}` : 'bandwidth-profiles'
      this.form.submit(this.isEditing ? 'put' : 'post', url)
          .then(({data}) => {
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
    async confirmUpdate() {
      return await this.$confirm('Confirm Update.').catch(() => false)
    },
    cancel() {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm() {
      this.form.clear()
      this.form.reset()
    },
    async initializeForm() {
      if (this.isEditing) {
        const profile = await this.getBandwidthProfile(this.bandwidthProfile)
        this.form.fill({
          name: profile.name,
          rate_limit: profile.rate_limit,
          address_pool: profile.address_pool,
          shared_users: profile.shared_users,
        })

        const rateLimit = profile.rate_limit ? profile.rate_limit.split('/') : null
        if (rateLimit) {
          this.rateLimitUpload = rateLimit[0]
          this.rateLimitDownload = rateLimit[1]
        }
      }
    },
    rateLimitChange(){
      if(this.rateLimitUpload && this.rateLimitDownload){
        this.form.name = `${this.rateLimitUpload}/${this.rateLimitDownload}`
      }
    }
  }
}
</script>
