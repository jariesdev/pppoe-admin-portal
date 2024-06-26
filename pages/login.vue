<template>
  <div class="row login-page">
    <notifications />
    <div class="col-xl-3 col-md-4 ml-auto mr-auto">
      <card class="card card-white card-login">
        <template #header>
          <img :src="cardImage" alt="">
          <h1 class="card-title">
            Log in
          </h1>
        </template>
        <FadeTransition>
          <div v-show="invalidCredentials" class="alert alert-danger" role="alert">
            <span v-if="statusCode >= 500">Server Error. Please contact system administrator.</span>
            <span v-else>Invalid username/password.</span>
          </div>
        </FadeTransition>
        <form class="pb-3" @submit.prevent="userLogin">
          <div class="control-wrap mb-4">
            <div class="form-group">
              <label for="username">Username</label>
              <base-input
                id="username"
                v-model="login.username"
                addon-left-icon="tim-icons icon-email-85"
                type="text"
                autofocus
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <base-input
                id="password"
                v-model="login.password"
                show-password
                addon-left-icon="tim-icons icon-lock-circle"
              />
            </div>
          </div>
          <div>
            <base-button block native-type="submit" type="info" :loading="loading">
              {{ loading ? 'Please wait...' : 'Login' }}
            </base-button>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import cardImage from '@/static/img/card-info.png'
import { FadeTransition } from 'vue2-transitions'

export default {
  auth: 'guest',
  components: { FadeTransition },
  layout: 'full-page',
  data () {
    return {
      cardImage,
      invalidCredentials: false,
      login: {
        username: '',
        password: ''
      },
      loading: false,
      statusCode: null
    }
  },
  head () {
    return {
      title: 'Login'
    }
  },
  mounted () {
    if (this.$route.query.demo) {
      this.login.username = 'admin'
      this.login.password = 'password'
      this.userLogin()
    }
  },
  methods: {
    async userLogin () {
      this.invalidCredentials = false
      this.statusCode = null
      this.loading = true
      try {
        await this.$auth.loginWith('laravelJWT', { data: this.login })
          .then(() => {
            const userName = this.$auth.user.username
            const message = `Login successful. Welcome ${userName}!`
            this.$notify({
              message,
              type: 'success'
            })
            this.$router.push('/')
          }, ({ response: { status } }) => {
            this.statusCode = status
            this.invalidCredentials = true
          })
      } catch ({ response }) {
        this.$notify({
          message: 'Sorry, something went wrong. Try reloading the page.',
          type: 'danger'
        })
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  padding-top: 150px;
}

.card-login {
  ::v-deep {
    .card-header {
      padding: 0;

      img {
        max-height: 200px;
      }
    }

    .card-title {
      position: absolute;
      top: 50px;
      left: 15px;
      font-size: 4em;
      font-weight: 900;
      color: #FFF;
      z-index: 1;
    }
  }
}
</style>
