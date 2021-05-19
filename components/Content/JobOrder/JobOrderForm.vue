<template>
  <div>
    <alert-errors :form="form"/>

    <el-form label-position="top">
      <el-row :gutter="15" class="flex-wrap" type="flex">
        <el-col :lg="12" :span="24">
          <el-form-item label="Select Plan">
            <el-select v-model="form.plan_id" class="d-block">
              <el-option v-for="plan in plans" :key="plan.id" :label="plan.description" :value="plan.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Quantity">
            <el-input-number v-model="form.quantity"/>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Select Partner">
            <el-select v-model="form.partner_id" @change="selectedPartnerChange" class="d-block">
              <el-option v-for="partner in partners" :key="partner.id" :label="partner.name" :value="partner.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Partner Branch">
            <el-select v-model="form.branch_id" :disabled="!form.partner_id" class="d-block">
              <el-option v-for="branch in partnerBranches" :key="branch.id" :label="branch.name" :value="branch.id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Requestor">
            <el-input v-model="form.requestor"/>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :span="24">
          <el-form-item label="Type">
            <el-select v-model="form.type" class="d-block">
              <el-option label="Outright" value="outright"/>
              <el-option label="Consignment" value="consignment"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <p class="text-muted text-right font-italic">
        All <span class="text-danger">*</span> fields are required.
      </p>
      <div>
        <base-button type="primary" @click="submit()">Save</base-button>
        <base-button @click="cancel()">Cancel</base-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import {Form} from 'vform'
import {mapState} from 'vuex'
import alerts from "~/mixins/alerts";

export default {
  name: 'JobOrderForm',
  mixins: [alerts],
  async fetch() {
    await this.$store.dispatch('plan/load')
    await this.$store.dispatch('partner/load')
  },
  data() {
    return {
      form: new Form({
        "quantity": 1,
        "voucher_length": 8,
        "combination": "alphanumspec",
        "plan_id": null,
        "partner_id": null,
        "branch_id": null,
        "requestor": null,
        "type": "outright"
      }),
      partnerBranches: [],
    }
  },
  computed: {
    ...mapState({
      plans: state => state.plan.plans,
      partners: state => state.partner.partners
    })
  },
  methods: {
    submit(){
      this.form.post('/api/job-orders')
      .then(({data})=>{
        this.$notify({
          type: 'success',
          message: 'Job order created.'
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
    resetForm() {
      this.form.clear()
      this.form.reset()
    },
    selectedPartnerChange(id){
      this.partnerBranches = []
      this.form.branch_id = null

      if(!id){
        return
      }

      this.$axios.$get(`/api/partners/${id}/branches`)
      .then(({data})=>{
        this.partnerBranches = data
      })
      .catch(()=>{
        this.partnerBranches = []
      })
    }
  }
}
</script>
