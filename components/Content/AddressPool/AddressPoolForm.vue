<template>
  <div class="address-pool-form">
    <alert-errors :form="form" />
    <el-form label-position="top" :disabled="initializing || saving">
      <el-form-item label="Name" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="IP Range" required>
        <el-input v-model="form.ip_range" placeholder="192.168.102.2-192.168.102.254" />
      </el-form-item>
      <div class="d-flex">
        <div class="ml-auto" />
        <base-button type="primary" :loading="saving" :disabled="initializing" @click="submit()">
          Save
        </base-button>
        <base-button @click="cancel()">
          Cancel
        </base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Form } from 'vform'
import alerts from '~/mixins/alerts'

export default {
  name: 'AddressPoolForm',
  mixins: [alerts],
  props: {
    addressPoolId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data: () => ({
    saving: false,
    initializing: false,
    form: new Form({
      name: '',
      ip_range: ''
    })
  }),
  computed: {
    isEditing () {
      return this.addressPoolId !== null
    }
  },
  watch: {
    addressPoolId (value) {
      if (value) {
        this.initializeForm()
      }
    }
  },
  mounted () {
    if (this.isEditing) {
      this.initializeForm()
    }
  },
  methods: {
    submit () {
      this.saving = true
      let url = '/api/address-pools'
      if (this.isEditing) {
        url = `/api/address-pools/${this.addressPoolId}`
      }
      this.form.submit(this.isEditing ? 'put' : 'post', url)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Address pool saved.'
          })
          this.$emit('success')
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
        .finally(() => {
          this.saving = false
        })
    },
    async initializeForm () {
      this.initializing = true
      const addressPool = await this.$store.dispatch('address-pool/get', this.addressPoolId)
      this.form.fill({
        name: addressPool.name,
        ip_range: addressPool.ip_range
      })
      this.initializing = false
    },
    cancel () {
      this.form.clear()
      this.form.reset()
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>
