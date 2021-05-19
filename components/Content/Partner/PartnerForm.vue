<template>
  <el-form v-model="formIsValid">
    <alert-errors :form="form" />
    <h4>Partner Details</h4>
    <hr>
    <el-row :gutter="15" type="flex flex-wrap">
      <el-col :span="12">
        <el-form-item label="Name" required>
          <el-input v-model="form.name" name="name" type="text" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Registered Email" required>
          <el-input v-model="form.email" type="email" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Contact Person" required>
          <el-input v-model="form.contact" type="text" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Contact Number" required>
          <el-input v-model="form.contact_number" type="text" />
        </el-form-item>
      </el-col>
    </el-row>
    <h4>Transaction Settings</h4>
    <hr>
    <el-row :gutter="15" type="flex flex-wrap">
      <el-col :span="12">
        <el-form-item label="Commission Rate" required>
          <el-input v-model="form.commission_rate" type="number">
            <template #suffix>
              <span class="px-2">%</span>
            </template>
          </el-input>
        </el-form-item>
        <p class="small text-muted">
          Use when computing revenue from partner's commission each transactions.
        </p>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Cutoff Period" required>
          <el-select v-model="form.cutoff_period" type="number">
            <el-option v-for="(_,index) in Array(31)" :key="index" :value="index + 1" :label="(index + 1) + getNth(index + 1)" />
          </el-select>
        </el-form-item>
        <p class="small text-muted">
          This determine the span of time which transactions are calculated, such as sales and remittance.
        </p>
      </el-col>
    </el-row>
    <h4>Login Credentials</h4>
    <hr>
    <el-row :gutter="15" type="flex flex-wrap">
      <el-col :span="12">
        <el-form-item label="Username" required>
          <el-input v-model="form.username" type="text" />
        </el-form-item>
      </el-col>
      <el-col v-if="isEditing" :span="24">
        <el-checkbox v-model="changePassword">
          Change Password
        </el-checkbox>
      </el-col>
      <el-col v-if="!isEditing || changePassword && isEditing" :span="12">
        <el-form-item label="Password" required>
          <el-input v-model="form.password" type="password" />
        </el-form-item>
      </el-col>
      <el-col v-if="!isEditing || changePassword && isEditing" :span="12">
        <el-form-item label="Confirm Password" required>
          <el-input v-model="form.password_confirmation" type="password" />
        </el-form-item>
      </el-col>
    </el-row>
    <p class="font-italic text-right text-muted">
      All <span class="text-danger">*</span> fields are required.
    </p>
    <div>
      <base-button :loading="processing" type="primary" @click="submit()">
        Save
      </base-button>
      <base-button :disabled="processing" @click="cancel()">
        Cancel
      </base-button>
    </div>
  </el-form>
</template>

<script>
import { Col, Form, FormItem, Input, Row } from 'element-ui'
import { AlertErrors, Form as VForm } from 'vform'
import { get } from 'lodash'

export default {
  name: 'PartnerForm',
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Row.name]: Row,
    [Col.name]: Col,
    AlertErrors
  },
  props: {
    partnerId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      formIsValid: false,
      processing: false,
      form: new VForm({
        name: undefined,
        email: undefined,
        contact: undefined,
        contact_number: undefined,
        // Transaction Settings
        commission_rate: 0,
        cutoff_period: 1,
        // Credentials
        username: undefined,
        password: undefined,
        password_confirmation: undefined
      }),
      changePassword: false
    }
  },
  computed: {
    isEditing () {
      return this.partnerId !== null
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    async submit () {
      if (this.isEditing && !await this.confirmUpdate()) {
        return
      }

      if (!this.form.password) {
        this.form.password = undefined
      }
      if (this.isEditing && !this.changePassword) {
        this.form.password = undefined
        this.form.password_confirmation = undefined
      }
      let url = '/api/partners'
      if (this.isEditing) {
        url = url + '/' + this.partnerId
        this.form._method = 'put'
      }

      this.processing = true
      try {
        const response = await this.form.post(url)
        this.$notify({
          message: get(response, 'data.message', 'Partner has been created.')
        })
        this.resetForm()
        this.$emit('success', get(response, 'data.data'))
      } catch (e) {
      } finally {
        this.processing = false
      }
    },
    async confirmUpdate () {
      return await this.$confirm('Update partner information?').catch(() => false)
    },
    resetForm () {
      this.form.clear()
      this.form.reset()
    },
    cancel () {
      this.resetForm()
      this.$emit('cancel')
    },
    async loadData () {
      if (this.partnerId) {
        const partner = await this.$store.dispatch('partner/get', this.partnerId)
        this.$set(this.form, 'name', partner.name)
        this.$set(this.form, 'email', partner.email)
        this.$set(this.form, 'contact', partner.contact)
        this.$set(this.form, 'contact_number', partner.contact_number)
        this.$set(this.form, 'username', partner.username)
      }
    },
    getNth (d) {
      if (d > 3 && d < 21) { return 'th' }
      switch (d % 10) {
        case 1:
          return 'st'
        case 2:
          return 'nd'
        case 3:
          return 'rd'
        default:
          return 'th'
      }
    }
  }
}
</script>
