<template>
  <div class="settings">
    <card>
      <el-form :disabled="initializing || form.busy" label-position="top">
        <el-form-item label="Company name">
          <el-input v-model="form.company_name" />
          <input-description>{{ getSettingDescription('company_name') }}</input-description>
        </el-form-item>
        <el-form-item label="Company address">
          <el-input v-model="form.company_address" />
          <input-description>{{ getSettingDescription('company_address') }}</input-description>
        </el-form-item>

        <el-form-item label="System logo">
          <img
            v-if="form.system_logo"
            class="border"
            :style="{width: '100px', height: '100px',objectFit: 'contain'}"
            :src="form.system_logo"
          ><br>
          <base-button type="info" size="sm" :disabled="initializing" @click="changeLogo()">
            {{ form.system_logo ? 'Change Logo' : 'Set Logo' }}
          </base-button>
          <base-button v-show="form.system_logo" type="danger" size="sm" @click="removeLogo()">
            Remove
          </base-button>
          <input
            ref="logoFileInput"
            type="file"
            accept="image/*"
            :style="{visibility: 'hidden', width: 0, height: 0}"
            @change="inputLogoChange"
          >
          <input-description>{{ getSettingDescription('system_logo') }}</input-description>
        </el-form-item>
        <el-form-item label="Disconnect after">
          <el-input v-model="form.disconnect_after" type="number">
            <template #append>
              {{ form.disconnect_after > 1 ? 'Days' : 'Day' }}
            </template>
          </el-input>
          <input-description>{{ getSettingDescription('disconnect_after') }}</input-description>
        </el-form-item>
        <el-form-item label="Company contact">
          <el-input v-model="form.company_contact" />
          <input-description>{{ getSettingDescription('company_contact') }}</input-description>
        </el-form-item>
        <el-form-item label="Social media link">
          <el-input v-model="form.soc_med_link" />
          <input-description>{{ getSettingDescription('soc_med_link') }}</input-description>
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
  name: 'GeneralSettings',
  mixins: [alerts],
  data () {
    return {
      initializing: false,
      form: new Form({
        company_name: null,
        company_address: null,
        system_logo: null,
        disconnect_after: null,
        company_contact: null,
        soc_med_link: null
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
      generalSettings: state => state.settings.generalSettings
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
      const found = find(this.generalSettings, { name: key })
      if (found) {
        return found.value
      } else {
        return undefined
      }
    },
    getSettingDescription (key) {
      const found = find(this.generalSettings, { name: key })
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
    },
    changeLogo () {
      this.$refs.logoFileInput.click()
    },
    removeLogo () {
      this.form.system_logo = ''
    },
    async inputLogoChange () {
      const file = this.$refs.logoFileInput.files[0]

      if (file && file.size < 3000000) {
        // max 3MB
        this.form.system_logo = await this.getBase64(file)
      } else {
        this.$notify({
          type: 'warning',
          message: 'File is too large, maximum of 3MB only.'
        })
      }
    },
    getBase64 (file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>
