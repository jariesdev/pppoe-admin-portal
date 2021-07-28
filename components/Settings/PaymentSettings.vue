<template>
  <div class="settings">
    <card>
      <el-form :disabled="initializing || form.busy" label-position="top">
        <el-form-item label="Bank account">
          <el-input v-model="form.bank_account" />
          <input-description>{{ getSettingDescription('bank_account') }}</input-description>
        </el-form-item>
        <el-form-item label="GCash">
          <el-input v-model="form.g_cash" />
          <input-description>{{ getSettingDescription('g_cash') }}</input-description>
        </el-form-item>
        <base-button type="primary" :loading="form.busy" :disabled="initializing" @click="saveSettings()">
          Save Settings
        </base-button>
      </el-form>
    </card>
  </div>
</template>

<script>
import { Form } from 'vform'
import { mapState } from 'vuex'
import { find } from 'lodash'
import alerts from '~/mixins/alerts'

export default {
  name: 'PaymentSettings',
  mixins: [alerts],
  data () {
    return {
      initializing: false,
      form: new Form({
        bank_account: null,
        g_cash: null
      })
    }
  },
  async fetch () {
    this.initializing = true
    await this.$store.dispatch('settings/load')
    this.initializedSettings()
    this.initializing = false
  },
  computed: {
    ...mapState({
      paymentSettings: state => state.settings.paymentSettings
    })
  },
  methods: {
    initializedSettings () {
      const formValues = {}
      for (const key of this.form.keys()) {
        formValues[key] = this.getSettingValue(key)
      }
      this.form.fill(formValues)
    },
    getSettingValue (key) {
      const found = find(this.paymentSettings, { name: key })
      if (found) {
        return found.value
      } else {
        return undefined
      }
    },
    getSettingDescription (key) {
      const found = find(this.paymentSettings, { name: key })
      if (found) {
        return found.description
      } else {
        return undefined
      }
    },
    async saveSettings () {
      const confirmed = await this.$confirm('Do you wish to save all current setting values?', 'Apply changes?', { type: 'warning' }).catch(() => false)
      if (!confirmed) {
        return
      }

      this.form.post('/api/settings')
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Settings has been saved.'
          })
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
    }
  }
}
</script>
