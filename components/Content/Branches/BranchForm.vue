<template>
  <div class="">
    <alert-errors :form="form"></alert-errors>
    <el-form label-position="top" :disabled="form.busy">
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :span="12">
          <el-form-item label="Name" required>
            <el-input v-model="form.name" type="text"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Contact No." required>
            <el-input v-model="form.contact_number" type="text"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Address" required>
            <el-input v-model="form.store_address" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Coordinates (Lat,Long)" required>
            <el-row type="flex">
              <el-col :span="11">
                <el-input v-model="form.latitude" placeholder="Latitude" type="number"></el-input>
              </el-col>
              <el-col :span="2">
                <div class="text-center px-2">,</div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="form.longitude" placeholder="Longitude" type="number"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
        All <span class="text-danger">*</span> are required.
      </p>
      <div>
        <base-button :loading="form.busy" type="primary" @click="submit()">Save</base-button>
        <base-button :disabled="form.busy" @click="cancel()">Cancel</base-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import {AlertErrors, Form} from 'vform'
import alertsMixin from "~/mixins/alerts";
import {mapActions} from "vuex";

export default {
  name: 'BranchForm',
  components: {AlertErrors},
  mixins: [alertsMixin],
  props: {
    partnerId: {
      type: Number,
      required: true
    },
    editBranch: {
      type: Number,
      required: false,
      default: null
    }
  },
  data() {
    return {
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
   isEditing(){
     return this.editBranch !== null
   }
  },
  mounted() {
    this.loadEditData()
  },
  methods: {
    ...mapActions({
      getBranch: 'branch/get'
    }),
    async submit() {
      const data = this.form.data()
      const {latitude, longitude} = data
      data.coordinates = `${latitude},${longitude}`

      let url = `/api/partners/${this.partnerId}/branches`
      if(this.isEditing){
        url = url + '/' + this.editBranch
      }

      try {
        const response = await this.form.submit(this.isEditing ? 'put' : 'post',url, {
          data: data
        }).then(({data}) => data)
        this.$emit('success', response)
        this.$notify({
          type: 'success',
          message: 'Branch has been saved.'
        })
      } catch (e) {
        this.showRequestErrorMessage()
      }
    },
    cancel() {
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm() {
      this.form.clear()
      this.form.reset()
    },
    async loadEditData() {
      if (this.editBranch) {
        const partner = await this.getBranch({partnerId: this.partnerId, branchId: this.editBranch})
        this.$set(this.form, 'name', partner.name)
        this.$set(this.form, 'store_address', partner.store_address)
        this.$set(this.form, 'contact_number', partner.contact_number)
        this.$set(this.form, 'latitude', partner.latitude)
        this.$set(this.form, 'longitude', partner.longitude)
      }
    }
  }
}
</script>
