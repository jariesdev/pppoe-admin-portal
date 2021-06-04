<template>
  <div>
    <p>
      Enter values in the form below. Press "Save" to apply changes.
    </p>
    <alert-errors :form="form" />
    <el-form label-position="top">
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :span="24">
          <el-form-item label="Username" required>
            <el-input v-model="form.username" type="text" />
          </el-form-item>
          <input-description>User's full name.</input-description>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Name" required>
            <el-input v-model="form.name" type="text" />
          </el-form-item>
          <input-description>Use when logging in to system.</input-description>
        </el-col>
        <el-col :span="24">
          <el-form-item>
            <el-checkbox v-model="form.is_admin">
              Is Administrator
            </el-checkbox>
          </el-form-item>
        </el-col>
        <el-col v-show="isEditing" :span="24">
          <el-checkbox v-model="changePassword" label="Change Password" />
        </el-col>
        <el-col v-show="changePassword || !isEditing" :span="24">
          <el-form-item :label="(isEditing ? 'New' : '') + ' Password'" :required="!isEditing">
            <el-input v-model="form.password" type="password" />
          </el-form-item>
        </el-col>
        <el-col v-show="changePassword && isEditing" :span="24">
          <el-form-item :label="'Confirm Password'">
            <el-input v-model="form.password_confirmation" type="password" />
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
        All <span class="text-danger">*</span> are required.
      </p>
      <div>
        <base-button :loading="form.busy" type="primary" @click="submit()">
          Save
        </base-button>
        <base-button :disabled="form.busy" @click="cancel()">
          Cancel
        </base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { AlertErrors, Form } from 'vform'
import alerts from '~/mixins/alerts'

export default {
  name: 'UserForm',
  components: { AlertErrors },
  mixins: [alerts],
  props: {
    editUser: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      changePassword: false,
      form: new Form({
        username: null,
        name: null,
        is_admin: false,
        password: undefined,
        password_confirmation: undefined
      })
    }
  },
  computed: {
    isEditing () {
      return this.editUser !== null
    }
  },
  watch: {
    changePassword (value) {
      if (!value) {
        this.form.password = undefined
        this.form.password_confirmation = undefined
      }
    }
  },
  mounted () {
    this.loadEditData()
  },
  methods: {
    async submit () {
      let url = '/api/employees'
      if (this.isEditing) {
        url = url + '/' + this.editUser
      }

      try {
        const response = await this.form.submit(this.isEditing ? 'put' : 'post', url).then(({ data }) => data)
        this.$emit('success', response)
        this.$notify({
          type: 'success',
          message: 'User has been saved.'
        })
      } catch (e) {
        this.showRequestErrorMessage()
      }
    },
    cancel () {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm () {
      this.form.reset()
      this.form.clear()
    },
    async loadEditData () {
      if (this.editUser) {
        const employee = await this.$store.dispatch('employee/get', this.editUser)
        this.$set(this.form, 'username', employee.username)
        this.$set(this.form, 'name', employee.name)
        this.$set(this.form, 'is_admin', employee.is_admin)
      }
    }
  }
}
</script>
