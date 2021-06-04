<template>
  <div class="billing-form">
    <alert-errors :form="form" />
    <el-form label-position="top" :disabled="form.busy">
      <el-form-item label="Amount Paid" required>
        <el-input v-model="form.amount_paid" type="number" />
      </el-form-item>
      <el-form-item label="Mode of Payment" required>
        <el-select v-model="form.mode_of_payment" class="d-block">
          <el-option v-for="(mode,index) in modeOfPayments" :key="index" :label="mode.label" :value="mode.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="Payment Reference No." required>
        <el-input v-model="form.payment_reference_no" />
      </el-form-item>
      <el-form-item label="Remarks">
        <el-input v-model="form.remarks" type="textarea" />
      </el-form-item>
      <div class="d-flex">
        <div class="ml-auto" />
        <base-button type="primary" :loading="form.busy" @click="submit()">
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
import { paymentModes } from '~/assets/js/constants'
import alerts from '~/mixins/alerts'

const modeOfPayments = [
  {
    label: 'CASH',
    value: paymentModes.CASH
  },
  {
    label: 'GCASH',
    value: paymentModes.GCASH
  },
  {
    label: 'PAYMAYA',
    value: paymentModes.PAYMAYA
  },
  {
    label: 'Credit/Debit Card',
    value: paymentModes.CARD_PAYMENT
  }
]

export default {
  name: 'BillingPaymentForm',
  mixins: [alerts],
  props: {
    billingId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      modeOfPayments,
      form: new Form({
        amount_paid: null,
        mode_of_payment: null,
        payment_reference_no: null,
        remarks: ''
      })
    }
  },
  methods: {
    submit () {
      this.form.post(`/api/admin/billings/${this.billingId}/paid`)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Set to paid successfully.'
          })
          this.$emit('success')
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
    },
    cancel () {
      this.form.reset()
      this.form.clear()
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>
