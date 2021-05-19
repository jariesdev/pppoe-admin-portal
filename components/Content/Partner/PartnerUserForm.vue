<template>
  <el-form v-model="formValid" label-position="top" @submit.prevent="submit()">
    <alert-errors :form="form" />
    <el-row class="flex-wrap" type="flex">
      <el-col>
        <el-form-item label="Username" required>
          <el-input v-model="form.username" />
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="Password" :required="!isEditing">
          <el-input v-model="form.password" />
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item>
          <el-checkbox v-model="form.is_admin">
            Is Administrator
          </el-checkbox>
        </el-form-item>
        <p class="small text-muted">
          User has limited access to your system. Administrator has full access.
        </p>
      </el-col>
      <el-col v-show="!form.is_admin">
        <el-form-item label="Authorized Branch">
          <el-checkbox-group v-model="form.branch_id">
            <el-checkbox v-for="plan in partnerPlans" :key="plan.id" :label="plan.id" class="d-block">
              {{ plan.description }} ({{ plan.rate_limit }})
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <p class="small text-muted">
          Provide access to branch. Administrator always has access to all available branch.
        </p>
      </el-col>
    </el-row>
    <p class="font-italic text-right text-muted">
      All <span class="text-danger">*</span> fields are required.
    </p>
    <div>
      <base-button :loading="processing" :disabled="loading" type="primary" @click="submit()">
        Save
      </base-button>
      <base-button :disabled="processing" @click="cancel()">
        Cancel
      </base-button>
    </div>
  </el-form>
</template>

<script>
import { Form } from 'vform'
import { mapActions } from 'vuex'
import { filter, map } from 'lodash'

export default {
  name: 'PartnerUserForm',
  props: {
    partnerId: {
      type: Number,
      required: true
    },
    editUser: {
      type: Number,
      required: false,
      default: null
    }
  },
  data: () => ({
    loading: false,
    formValid: false,
    processing: false,
    form: new Form({
      username: '',
      password: '',
      is_admin: false,
      branch_id: []
    }),
    plans: []
  }),
  computed: {
    isEditing () {
      return this.editUser !== null
    },
    partnerPlans () {
      return filter(this.plans, o => !o.is_complimentary)
    }
  },
  mounted () {
    this.loadPartnerPlans()
    this.initializeForm()
  },
  methods: {
    ...mapActions({
      getUser: 'partner-user/get',
      getPlans: 'partner/getPlans'
    }),
    submit () {
      this.processing = true
      let url = `/api/partners/${this.partnerId}/users`
      if (this.isEditing) {
        url = `/api/partners/${this.partnerId}/users/${this.editUser}`
      }

      const data = {
        username: this.form.username,
        password: this.form.password || undefined,
        admin: this.form.is_admin ? 1 : 0,
        branch_id: this.form.branch_id
      }

      this.form.submit(this.isEditing ? 'put' : 'post', url, {
        data
      })
        .then(({ data }) => {
          this.$emit('success', data)
        })
        .catch(() => {
          this.$emit('failed')
        })
        .finally(() => {
          this.processing = false
        })
    },
    cancel () {
      this.$emit('cancel')
    },
    async initializeForm () {
      if (!this.isEditing) { return }

      const user = await this.getUser({ partnerId: this.partnerId, userId: this.editUser })
      this.form.fill({
        username: user.username,
        is_admin: !!user.admin,
        branch_id: map(user.branches, o => o.id)
      })
    },
    async loadPartnerPlans () {
      this.loading = true
      try {
        this.plans = await this.getPlans(this.partnerId)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
