<template>
  <img :src="appLogo">
</template>

<script>
import { find } from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'Logo',
  computed: {
    ...mapState({
      generalSettings: state => state.settings.generalSettings
    }),
    appLogo () {
      const found = find(this.generalSettings, { name: 'system_logo' })
      return found ? found.value : ''
    }
  }
}
</script>

<style scoped>

</style>
