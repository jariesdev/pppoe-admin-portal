<template>
  <div>
    <alert-errors :form="form" />
    <el-form v-loading="form.busy" label-position="top" :disabled="form.busy">
      <el-row type="flex" class="flex-wrap" :gutter="15">
        <el-col :lg="12">
          <el-form-item label="Name (IP Address)" required>
            <el-input v-model="form.nasname" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Alias" required>
            <el-input v-model="form.shortname" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Select Branch" required>
            <el-select v-model="form.branch_id">
              <el-option v-for="branch in branches" :key="branch.id" :label="branch.name" :value="branch.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Secret" required>
            <el-input v-model="form.secret" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Interface" required>
            <el-input v-model="form.interface" />
          </el-form-item>
        </el-col>
      </el-row>
      <h5>Access Point</h5>
      <el-row type="flex" class="flex-wrap" :gutter="15">
        <el-col :lg="12">
          <el-form-item label="IP Address" required>
            <el-input v-model="form.ap_address" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Username" required>
            <el-input v-model="form.ap_username" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Password" required>
            <el-input v-model="form.ap_password" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Port" required>
            <el-input v-model="form.ap_port" />
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
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
import { mapActions, mapState } from 'vuex'
import alerts from '~/mixins/alerts'

export default {
  name: 'NasForm',
  mixins: [alerts],
  props: {
    editNasId: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      selectedPartner: null,
      form: new Form({
        nasname: null,
        shortname: null,
        branch_id: null,
        secret: null,
        interface: null,
        ap_address: null,
        ap_username: null,
        ap_password: null,
        ap_port: null
      })
    }
  },
  async fetch () {
    await this.$store.dispatch('branch/load')
  },
  computed: {
    ...mapState({
      branches: state => state.branch.branches
    }),
    isEditing () {
      return this.editNasId !== null
    }
  },
  mounted () {
    this.initializeForm()
  },
  methods: {
    ...mapActions({
      getNas: 'nas/get'
    }),
    submit () {
      const url = this.isEditing ? '/api/nas/' + this.editNasId : '/api/nas'
      this.form.submit(this.isEditing ? 'put' : 'post', url)
        .then(({ data }) => {
          this.$notify({
            type: 'success',
            message: 'NAS has been saved.'
          })
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
      if (!this.isEditing) {
        return
      }
      const nas = await this.getNas(this.editNasId)
      this.form.fill({
        nasname: nas.nasname,
        shortname: nas.shortname,
        branch_id: nas.branch_id,
        secret: nas.secret,
        interface: nas.interface,
        ap_address: nas.ap_address,
        ap_username: nas.ap_username,
        ap_password: nas.ap_password,
        ap_port: nas.ap_port
      })
    }
  }
}
</script>
