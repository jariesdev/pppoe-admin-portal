<template>
  <div>
    <alert-errors :form="form" />
    <el-form :disabled="loading || form.busy" label-position="top">
      <el-form-item label="AP Name" required>
        <el-input v-model="form.ap_name" />
      </el-form-item>
      <el-form-item label="AP Address" required>
        <el-input v-model="form.ap_address" />
      </el-form-item>
      <el-form-item label="Port" required>
        <el-input v-model="form.ap_port" type="number" />
      </el-form-item>
      <el-form-item label="Username" required>
        <el-input v-model="form.ap_username" />
      </el-form-item>
      <el-form-item label="Password" required>
        <el-input v-model="form.ap_password" type="password" />
      </el-form-item>
      <p class="text-muted text-right font-italic">
        All <span class="text-danger">*</span> fields are required.
      </p>
      <div>
        <base-button type="primary" :loading="form.busy" @click="submit">
          Save
        </base-button>
        <base-button :disabled="form.busy" @click="cancel">
          Cancel
        </base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { Form } from 'vform'
import { mapActions } from 'vuex'
import alerts from '~/mixins/alerts'

export default {
  name: 'AccessPointForm',
  mixins: [alerts],
  props: {
    nasId: {
      type: Number,
      required: true
    },
    accessPoint: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      form: new Form({
        ap_name: null,
        ap_address: null,
        ap_port: null,
        ap_username: null,
        ap_password: null
      })
    }
  },
  computed: {
    isEditing () {
      return this.accessPoint !== null
    }
  },
  mounted () {
    this.initializeForm()
  },
  methods: {
    ...mapActions({
      getAccessPoint: 'access-point/get'
    }),
    submit () {
      const url = this.isEditing ? `/api/nas/${this.nasId}/accesspoints/${this.accessPoint}` : `/api/nas/${this.nasId}/accesspoints`
      this.form.submit(this.isEditing ? 'put' : 'post', url)
        .then(({ data }) => {
          this.$emit('success', data)
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
    },
    cancel () {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm () {
      this.form.reset()
      this.form.clear()
    },
    async initializeForm () {
      if (this.accessPoint) {
        this.loading = true
        try {
          const ap = await this.getAccessPoint({
            id: this.accessPoint,
            nasId: this.nasId
          })
          this.form.fill({
            ap_name: ap.ap_name,
            ap_address: ap.ap_address,
            ap_port: ap.ap_port,
            ap_username: ap.ap_username,
            ap_password: ap.ap_password
          })
        } finally {
          this.loading = false
        }
      }
    }
  }
}
</script>
