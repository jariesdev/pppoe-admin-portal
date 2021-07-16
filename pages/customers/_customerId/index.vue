<template>
  <div class="customer">
    <el-tabs v-model="activeTab">
      <el-tab-pane name="details" label="Details">
        <CustomerDetails :customer-id="customerId">
          <template #footer>
            <div class="d-flex">
              <div class="ml-auto"/>
              <base-button class="mr-2" type="warning" @click="disconnect()">
                Disconnect Access
              </base-button>
              <nuxt-link class="btn btn-info" :to="`/customers/${customerId}/edit`">
                Edit
              </nuxt-link>
            </div>
          </template>
        </CustomerDetails>
      </el-tab-pane>
      <el-tab-pane name="account-settings" label="Account Settings">
        <CustomerAccountSettings :customer-id="customerId"/>
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
import alerts from '~/mixins/alerts'

export default {
  mixins: [alerts],
  components: {
    CustomerAccountSettings,
    CustomerDetails
  },
  data: () => ({
    customerId: null,
    activeTab: 'details'
  }),
  fetch () {
    this.customerId = parseInt(this.$route.params.customerId)
  },
  methods: {
    async disconnect () {
      const confirmed = await this.$confirm('Are you sure to disconnect the user.', {
        type: 'warning',
        title: 'Confirm User Disconnection'
      }).catch(() => false)

      if (!confirmed) {
        return
      }

      this.$axios.$post(`/api/customers/${this.customerId}/disconnect`)
        .then(() => {
          this.$notify({
            type: 'success',
            message: 'Successfully disconnected the user.'
          })
        })
        .catch(({ response: { data: { message } } }) => {
          this.$notify({
            type: 'danger',
            message
          })
        })
    }
  }
}
</script>
