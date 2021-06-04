<template>
  <div class="radius-server-settings">
    <el-form v-model="formValid" :disabled="initializing" @submit.prevent="submit()">
      <el-form-item label="Interface" required>
        <el-input v-model="form.interface" />
      </el-form-item>
      <base-button type="info" :loading="form.busy" :disabled="initializing" @click="submit()">
        Save
      </base-button>
    </el-form>
  </div>
</template>

<script>
import { Form } from 'vform'
import alerts from '~/mixins/alerts'

export default {
  name: 'PppoeServiceSettings',
  mixins: [alerts],
  props: {
    nasId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      initializing: false,
      formValid: false,
      form: new Form({
        interface: ''
      })
    }
  },
  beforeMount () {
    this.initializeForm()
  },
  methods: {
    submit () {
      this.form.post(`/api/nas/${this.nasId}/pppoe-service`)
        .then(({ data }) => {
          this.$notify({
            type: 'success',
            message: 'Configuration saved.'
          })
        }, ({ response: { data: { message } } }) => {
          this.$notify({
            type: 'danger',
            message
          })
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
    },
    initializeForm () {
      this.initializing = true
      this.$axios.$get(`/api/nas/${this.nasId}/pppoe-service`)
        .then(({ data }) => {
          if (data.length > 0) {
            const config = data[0]
            this.form.fill({
              interface: config.interface
            })
          }
        })
        .finally(() => {
          this.initializing = false
        })
    }
  }
}
</script>

<style scoped>

</style>
