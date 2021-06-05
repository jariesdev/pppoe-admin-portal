<template>
  <div class="row login-page">
    <notifications />
    <div class="login-wrap col ml-auto mr-auto">
      <card class="card card-white bg-dark">
        <template #header>
          <h1 class="card-title">
            Log in
          </h1>
        </template>
        <FadeTransition>
          <div v-show="invalidCredentials" class="alert alert-danger" role="alert">
            Invalid username/password.
          </div>
        </FadeTransition>
        <form class="pb-3" @submit.prevent="userLogin">
          <div class="control-wrap mb-4">
            <div class="form-group">
              <base-input
                id="username"
                v-model="login.username"
                label="Username"
                addon-left-icon="tim-icons icon-email-85"
                type="text"
                autofocus
              />
            </div>
            <div class="form-group">
              <base-input
                id="password"
                v-model="login.password"
                label="Password"
                addon-left-icon="tim-icons icon-lock-circle"
                type="password"
              />
            </div>
          </div>
          <div>
            <base-button block native-type="submit" :loading="loading" class="submit-button">
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
      loading: false
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
          }, () => {
            this.invalidCredentials = true
          })
      } catch (err) {
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
.login-wrap {
  max-width: 500px;
}

.login-page {
  padding-top: 150px;
}

.card {
  box-shadow: 0 0 10px rgba(#ff002a, 0.4);
  transition: all ease 1s;

  &:focus-within,
  &:active {
    box-shadow: 0 0 10px rgba(#ff002a, 0.5);
  }

  .card-title {
    color: #FFFFFF;
    font-weight: bold;
  }
}

.form-group {
  ::v-deep {
    label {
      color: #FFFFFF !important;
    }

    .input-group {

      .input-group-text {
        background: transparent !important;
        color: #FFFFFF;
        border-width: 1px;
        border-color: #FFFFFF !important;
      }
    }

    .form-control {
      color: #FFFFFF;
      background: transparent !important;
      border-color: #FFFFFF !important;
    }
  }
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
