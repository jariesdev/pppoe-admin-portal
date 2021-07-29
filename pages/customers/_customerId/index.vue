<template>
  <div class="customer">
    <el-tabs v-model="activeTab">
      <el-tab-pane name="details" label="Details">
        <CustomerDetails ref="customerDetails" :customer-id="customerId" @loaded="customerDetailLoaded">
          <template #footer>
            <div class="d-flex">
              <div class="ml-auto" />
              <base-button class="mr-3" type="danger" @click="deleteCustomer()">
                Delete
              </base-button>
              <base-button class="mr-2" :type="isInternetConnectionActive ? 'warning' : 'success'" :loading="activatingInternet" @click="toggleInternetConnection()">
                {{ isInternetConnectionActive ? 'Deactivate Internet' : 'Activate Internet' }}
              </base-button>
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
import { mapActions } from 'vuex'
import CustomerDetails from '~/components/Content/Customer/CustomerDetails'
import CustomerAccountSettings from '~/components/Content/Customer/CustomerAccountSettings'
import alerts from '~/mixins/alerts'

export default {
  components: {
    CustomerAccountSettings,
    CustomerDetails
  },
  mixins: [alerts],
  data: () => ({
    customerId: null,
    activeTab: 'details',
    isInternetConnectionActive: false,
    activatingInternet: false
  }),
  fetch () {
    this.customerId = parseInt(this.$route.params.customerId)
  },
  methods: {
    ...mapActions({
      activateInternet: 'customer/activateInternet',
      deactivateInternet: 'customer/deactivateInternet'
    }),
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
    },
    async deleteCustomer () {
      const confirmed = await this.$confirm('Are you sure to delete this user.', {
        type: 'error',
        title: 'Confirm User Delete'
      }).catch(() => false)

      if (!confirmed) {
        return
      }

      this.$axios.$delete(`/api/customers/${this.customerId}`)
        .then(() => {
          this.$router.push('/customers')
          this.$notify({
            type: 'success',
            message: 'Successfully deleted the user.'
          })
        })
        .catch(({ response: { data: { message } } }) => {
          this.showRequestErrorMessage()
        })
    },
    customerDetailLoaded (customer) {
      this.isInternetConnectionActive = Boolean(customer.is_connection_active)
    },
    async toggleInternetConnection () {
      try {
        this.activatingInternet = true
        if (this.isInternetConnectionActive) {
          await this.deactivateInternet(this.customerId)
          this.isInternetConnectionActive = false
          this.$notify({
            message: 'Customer Internet deactivated.',
            type: 'success'
          })
        } else {
          await this.activateInternet(this.customerId)
          this.isInternetConnectionActive = true
          this.$notify({
            message: 'Customer Internet activated.',
            type: 'success'
          })
        }
        this.$refs.customerDetails.$fetch()
      } catch (e) {
        this.showRequestErrorMessage()
      } finally {
        this.activatingInternet = false
      }
    }
  }
}
</script>
