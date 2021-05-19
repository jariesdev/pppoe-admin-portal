<template>
<div class="settings">
  <card >
    <h2>Settings</h2>
    <ThemeSettings :background-color.sync="sidebarBackground"/>
  </card>
</div>
</template>

<script>
import ThemeSettings from "~/components/Settings/ThemeSettings";
export default {
  name: "Settings",
  components: {ThemeSettings},
  data(){
    return {}
  },
  computed: {
    sidebarBackground: {
      get(){
        return this.$store.state.settings.backgroundColor
      },
      set(value){
        this.$store.commit('settings/backgroundColor', value)
      }
    }
  }
}
</script>
