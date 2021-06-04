<template>
  <div class="customer">
    <el-tabs v-model="activeTab">
      <el-tab-pane name="details" label="Details">
        <CustomerDetails :customer-id="customerId" />
      </el-tab-pane>
      <el-tab-pane name="account-settings" label="Account Settings">
        <CustomerAccountSettings :customer-id="customerId" />
      </el-tab-pane>
    </el-tabs>
    <div>
      <base-button @click="$router.back()">
        Back
      </base-button>
    </div>
  </div>
</template>
<script>
import CustomerDetails from '~/components/Content/Customer/CustomerDetails'
import CustomerAccountSettings from '~/components/Content/Customer/CustomerAccountSettings'

export default {
  components: { CustomerAccountSettings, CustomerDetails },
  data: () => ({
    customerId: null,
    activeTab: 'details'
  }),
  fetch () {
    this.customerId = parseInt(this.$route.params.customerId)
  }
}
</script>
