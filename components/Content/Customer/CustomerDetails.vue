<template>
  <card v-if="customer" class="customer-details" title="Details">
    <div class="row">
      <div class="col-lg-6">
        <p>
          Customer:
          <span v-show="customer.salutation">{{ customer.salutation }}</span>
          <strong>{{ customer.first_name }} {{ customer.last_name }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Age:
          <strong>{{ customer.age }}</strong>
        </p>
      </div>
    </div>
    <hr>
    <h4>Contact Details</h4>
    <div class="row">
      <div class="col-lg-6">
        <p>
          Mobile:
          <strong>
            <a :href="`tel:${customer.mobile_no}`">
              {{ customer.mobile_no }}
            </a>
          </strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Email:
          <strong>
            <a :href="`mailto:${customer.email}`">
              {{ customer.email }}
            </a>
          </strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Address 1:
          <strong>{{ customer.address_1 }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Address 2:
          <strong>{{ customer.address_2 }}</strong>
        </p>
      </div>
      <div v-if="customer.city" class="col-lg-6">
        <p>
          City:
          <strong>{{ customer.city.name }}</strong>
        </p>
      </div>
      <div v-if="customer.city" class="col-lg-6">
        <p>
          Area Code:
          <strong>{{ customer.area_code }}</strong>
        </p>
      </div>
    </div>
    <hr>
    <h4>Account</h4>
    <div class="row">
      <div v-if="customer.bandwidth_profile" class="col-lg-6">
        <p>
          PPPoE profile:
          <strong>{{ customer.bandwidth_profile.name }}</strong>
        </p>
      </div>
      <div v-if="customer.nas" class="col-lg-6">
        <p>
          NAS:
          <strong>{{ customer.nas.shortname }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Account type:
          <strong>{{ customer.account_type }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Contract start:
          <strong>{{ customer.contract_start }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Account no.:
          <strong>{{ customer.account_no }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Customer Profile:
          <strong>{{ customer.customer_profile }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Username:
          <strong>{{ customer.rad_username }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Misc balance:
          <strong>{{ customer.misc_balance }}</strong>
        </p>
      </div>
      <div v-if="customer.plan" class="col-lg-6">
        <p>
          Plan:
          <strong>{{ customer.plan.description }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Active:
          <strong>
            <el-tag :type="customer.is_active ? 'success' : 'info'" size="small">
              {{ customer.is_active ? 'Yes' : 'No' }}
            </el-tag>
          </strong>
        </p>
      </div>
    </div>
    <hr>
    <h4>Other Details</h4>
    <div class="row">
      <div class="col-lg-6">
        <p>
          Date Created:
          <strong>{{ customer.created_at | formatDateAndTime }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Last Seen:
          <strong>{{ customer.last_seen }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Change Type:
          <strong>{{ customer.change_type }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Change Date:
          <strong>{{ customer.change_date }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Changed by:
          <strong>{{ customer.changed_by }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Disconnection type:
          <strong>{{ customer.disconnection_type }}</strong>
        </p>
      </div>
      <div class="col-lg-6">
        <p>
          Connection Active:
          <span v-if="customer.is_connection_active" class="badge badge-success">Yes</span>
          <span v-else class="badge badge-light">No</span>
        </p>
      </div>
    </div>
    <template #footer>
      <slot name="footer" />
    </template>
  </card>
</template>

<script>
export default {
  name: 'CustomerDetails',
  props: {
    customerId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      customer: null
    }
  },
  async fetch () {
    this.customer = await this.$store.dispatch('customer/get', this.customerId)
    this.$emit('loaded', this.customer)
  }
}
</script>

<style scoped lang="scss">
p {
  line-height: 2;
}
</style>
