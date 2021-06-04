<template>
  <card title="Billing Details" class="billing-details">
    <div v-if="billing" class="row">
      <div class="col-12 col-lg-6">
        <p>
          Billing reference no.:
          <strong>{{ billing.billing_reference_no }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Customer:
          <strong>{{ billing.customer_name }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Year:
          <strong>{{ billing.year }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Month:
          <strong>{{ billing.month }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Coverage:
          <strong>{{ billing.coverage }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Statement date:
          <strong>{{ billing.statement_date }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Account no.:
          <strong>{{ billing.account_no }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Customer name:
          <strong>{{ billing.customer_name }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Billing address:
          <strong>{{ billing.billing_address }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Service fee:
          <strong>{{ billing.service_fee | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Misc. fee:
          <strong>{{ billing.misc_fee | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          VAT:
          <strong>{{ billing.vat | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Current fee:
          <strong>{{ billing.current_fee | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Previous balance:
          <strong>{{ billing.previous_balance | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Previous payment:
          <strong>{{ billing.previous_payment | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Previous excess payment:
          <strong>{{ billing.previous_excess_payment | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Previous remaining balance:
          <strong>{{ billing.previous_remaining_balance | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Total current charge:
          <strong>{{ billing.total_current_charge | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Total fee:
          <strong>{{ billing.total_fee | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Payment:
          <strong>{{ billing.payment | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Balance:
          <strong>{{ billing.balance | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Excess payment:
          <strong>{{ billing.excess_payment | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Due date:
          <strong>{{ billing.due_date }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Is paid:
          <strong>
            <el-tag :type="billing.is_paid ? 'success' : 'warning'" size="mini">
              {{ billing.is_paid ? 'Yes' : 'No' }}
            </el-tag>
          </strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Paid date:
          <strong>{{ billing.paid_date }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Mode of payment:
          <strong>{{ billing.mode_of_payment }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Payment reference no.:
          <strong>{{ billing.payment_reference_no }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Processed by:
          <strong>{{ billing.processed_by }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Is latest:
          <strong>
            <el-tag :type="billing.is_latest ? 'success' : 'warning'" size="mini">
              {{ billing.is_latest ? 'Yes' : 'No' }}
            </el-tag>
          </strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Remarks:
          <strong>{{ billing.remarks }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Old plan price:
          <strong>{{ billing.old_plan_price | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Old plan days:
          <strong>{{ billing.old_plan_days }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Old plan charge:
          <strong>{{ billing.old_plan_charge }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Old plan VAT:
          <strong>{{ billing.old_plan_vat | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Old plan less vat:
          <strong>{{ billing.old_plan_less_vat | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Old plan coverage:
          <strong>{{ billing.old_plan_coverage | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Current plan price:
          <strong>{{ billing.current_plan_price | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Current plan days:
          <strong>{{ billing.current_plan_days }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Current plan charge:
          <strong>{{ billing.current_plan_charge }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Current plan VAT:
          <strong>{{ billing.current_plan_vat | formatNumber({ format: '0,0.00' }) }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Current plan less VAT:
          <strong>{{ billing.current_plan_less_vat }}</strong>
        </p>
      </div>
      <div class="col-12 col-lg-6">
        <p>
          Current plan coverage:
          <strong>{{ billing.current_plan_coverage }}</strong>
        </p>
      </div>
    </div>
    <div class="d-flex">
      <div class="ml-auto" />
      <base-button type="info" :disabled="!billing" size="sm" :loading="downloading" @click="downloadStatement()">
        Download Statement
      </base-button>
    </div>
  </card>
</template>

<script>
import request from '~/mixins/request'

export default {
  name: 'BillingDetails',
  mixins: [request],
  props: {
    billingId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      billing: null,
      downloading: false
    }
  },
  async fetch () {
    this.billing = await this.$store.dispatch('billing/get', this.billingId)
  },
  methods: {
    downloadStatement () {
      this.downloading = true
      const url = `/api/billings/${this.billing.id}/download`
      const filename = `${this.billing.billing_reference_no}.pdf`
      this.downloadFromServer(url, filename, {}, {})
        .finally(() => {
          this.downloading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
p {
  line-height: 2;
}
</style>
