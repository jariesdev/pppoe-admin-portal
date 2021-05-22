<template>
  <div class="">
    <alert-errors :form="form" />
    <el-form label-position="top" :disabled="form.busy">
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :span="12">
          <el-form-item label="Name" required>
            <el-input v-model="form.name" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Contact No." required>
            <el-input v-model="form.contact_number" type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Address" required>
            <el-input v-model="form.store_address" type="textarea" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Coordinates (Lat,Long)" required>
            <el-row type="flex">
              <el-col :span="11">
                <el-input v-model="form.latitude" placeholder="Latitude" type="number" />
              </el-col>
              <el-col :span="2">
                <div class="text-center px-2">
                  ,
                </div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="form.longitude" placeholder="Longitude" type="number" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
        All <span class="text-danger">*</span> are required.
      </p>
      <div>
        <base-button :loading="form.busy" type="primary" :disabled="initializing" @click="submit()">
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
import { mapActions } from 'vuex'
import alertsMixin from '~/mixins/alerts'

export default {
  name: 'BranchForm',
  components: { AlertErrors },
  mixins: [alertsMixin],
  props: {
    editBranch: {
      type: Number,
      required: false,
      default: null
    }
  },
  data () {
    return {
      initializing: false,
      form: new Form({
        name: null,
        store_address: null,
        contact_number: null,
        latitude: null,
        longitude: null,
        coordinates: null
      })
    }
  },
  computed: {
    isEditing () {
      return this.editBranch !== null
    }
  },
  mounted () {
    this.loadEditData()
  },
  methods: {
    ...mapActions({
      getBranch: 'branch/get'
    }),
    async submit () {
      const data = this.form.data()
      const { latitude, longitude } = data
      data.coordinates = `${latitude},${longitude}`

      let url = '/api/branches'
      if (this.isEditing) {
        url = url + '/' + this.editBranch
      }

      try {
        const response = await this.form.submit(this.isEditing ? 'put' : 'post', url, {
          data
        }).then(({ data }) => data)
        this.$emit('success', response)
        this.$notify({
          type: 'success',
          message: 'Branch has been saved.'
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
      this.form.clear()
      this.form.reset()
    },
    async loadEditData () {
      if (this.editBranch) {
        this.initializing = true
        try {
          const branch = await this.getBranch(this.editBranch)
          this.$set(this.form, 'name', branch.name)
          this.$set(this.form, 'store_address', branch.store_address)
          this.$set(this.form, 'contact_number', branch.contact_number)
          this.$set(this.form, 'latitude', branch.latitude)
          this.$set(this.form, 'longitude', branch.longitude)
        } finally {
          this.initializing = false
        }
      }
    }
  }
}
</script>
