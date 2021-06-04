<template>
  <div class="radius-server-settings">
    <el-form v-model="formValid" :disabled="initializing" @submit.prevent="submit()">
      <el-form-item label="IP Address" required>
        <el-input v-model="form.ip_address" />
      </el-form-item>
      <el-form-item label="Secret" required>
        <el-input v-model="form.secret" />
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
  name: 'RadiusServerSettings',
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
        ip_address: '',
        secret: ''
      })
    }
  },
  beforeMount () {
    this.initializeForm()
  },
  methods: {
    submit () {
      this.form.post(`/api/nas/${this.nasId}/radius-server`)
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
      this.$axios.$get(`/api/nas/${this.nasId}/radius-server`)
        .then(({ data }) => {
          if (data.length > 0) {
            const config = data[0]
            this.form.fill({
              ip_address: config.address,
              secret: config.secret
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
