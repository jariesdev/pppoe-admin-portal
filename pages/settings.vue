<template>
  <div class="settings">
    <el-tabs value="general">
      <el-tab-pane name="general" label="General">
        <GeneralSettings />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import GeneralSettings from '~/components/Settings/GeneralSettings'
export default {
  components: { GeneralSettings },
  data () {
    return { }
  },
  head () {
    return {
      title: 'Settings'
    }
  }
}
</script>
