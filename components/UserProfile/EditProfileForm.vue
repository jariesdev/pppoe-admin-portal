<template>
  <card>
    <h5 slot="header" class="title">
      Edit Profile
    </h5>
    <alert-errors :form="user" />
    <form @submit.prevent="updateProfile">
      <div class="row">
        <div class="col-md-4">
          <base-input
            v-model="user.username"
            type="text"
            label="Username"
            placeholder="Username"
          />
        </div>
        <div class="col-md-8">
          <base-input
            v-model="user.name"
            type="text"
            label="Name"
            placeholder="name"
          />
        </div>
      </div>
      <base-checkbox
        v-model="changePassword"
        inline
      >
        Change Password
      </base-checkbox>
      <div v-show="changePassword" class="row">
        <div class="col-md-6">
          <base-input
            v-model="user.password"
            show-password
            label="Password"
            placeholder="Password"
          />
        </div>
        <div class="col-md-6">
          <base-input
            v-model="user.password_confirmation"
            show-password
            label="Confirm Password"
            placeholder="Retype Password"
          />
        </div>
      </div>
      <hr>
      <base-button native-type="submit" type="primary" class="btn-fill" :loading="user.busy">
        Save
      </base-button>
    </form>
  </card>
</template>
<script>
import { Form, AlertErrors } from 'vform'
import alerts from '~/mixins/alerts'

export default {
  components: { AlertErrors },
  mixins: [alerts],
  data () {
    return {
      changePassword: false,
      user: new Form({
        username: this.$auth.user.username,
        name: this.$auth.user.name,
        password: null,
        password_confirmation: null
      })
    }
  },
  methods: {
    updateProfile () {
      if (!this.changePassword) {
        this.user.password = undefined
        this.user.password_confirmation = undefined
      }

      try {
        this.user.post('/api/my-info')
        this.$notify({
          type: 'success',
          message: 'Account updated.'
        })
      } catch (e) {
        this.showRequestErrorMessage()
      }
    }
  }
}
</script>
<style></style>
