<template>
  <div>
    <alert-errors :form="form"/>
    <el-form label-position="top" v-loading="form.busy" :disabled="form.busy">
      <el-row type="flex" class="flex-wrap" :gutter="15">
        <el-col :lg="12">
          <el-form-item label="Name (IP Address)">
            <el-input v-model="form.nasname" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Alias">
            <el-input v-model="form.shortname" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Select Partner">
            <el-select v-model="selectedPartner" @change="selectedPartnerChange">
              <el-option v-for="partner in partners" :key="partner.id" :label="partner.name" :value="partner.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Select Branch">
            <el-select v-model="form.branch_id"  :disabled="!selectedPartner">
              <el-option v-for="branch in partnerBranches" :key="branch.id" :label="branch.name" :value="branch.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Secret">
            <el-input v-model="form.secret" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Server">
            <el-input v-model="form.server" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="type">
            <el-input v-model="form.type" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="port">
            <el-input type="number" v-model="form.port" />
          </el-form-item>
        </el-col>
        <el-col :lg="12">
          <el-form-item label="Community">
            <el-input v-model="form.community" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="Description">
            <el-input v-model="form.description" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted font-italic text-right">
        All <span class="text-danger">*</span> fields are required.
      </p>
      <div>
        <base-button type="primary" @click="submit" :loading="form.busy">Save</base-button>
        <base-button @click="cancel" :disabled="form.busy">Cancel</base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {Form} from 'vform'
import alerts from "~/mixins/alerts";
import {mapState} from "vuex";

export default {
  name: 'NasForm',
  mixins: [alerts],
  data() {
    return {
      selectedPartner: null,
      form: new Form({
        nasname: null,
        shortname: null,
        branch_id: null,
        type: null,
        port: null,
        secret: null,
        server: null,
        community: null,
        description: null,
      }),
      partnerBranches: []
    }
  },
  computed: {
    ...mapState({
      partners: state => state.partner.partners
    }),
  },
  fetch(){
    this.$store.dispatch('partner/load')
  },
  methods: {
    submit(){
      this.form.post('/api/nas')
      .then(({data})=>{
        this.$notify({
          type: 'success',
          message: 'NAS has been saved.'
        })
        this.$emit('success', data)
      })
      .catch(()=>{
        this.showRequestErrorMessage()
      })
    },
    cancel(){
      this.resetForm()
      this.$emit('cancel')
    },
    resetForm(){
      this.form.reset()
      this.form.clear()
    },
    async selectedPartnerChange(id) {
      this.partnerBranches = []
      this.form.branch_id = null
      if (!id) return

      const {data} = await this.$axios.$get(`/api/partners/${id}/branches`)
      this.partnerBranches = data
    }
  }
}
</script>
