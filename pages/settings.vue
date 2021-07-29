<template>
  <div class="settings">
    <el-tabs value="general">
      <el-tab-pane name="general" label="General">
        <GeneralSettings />
      </el-tab-pane>
      <el-tab-pane name="payment" label="Payment">
        <PaymentSettings />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import GeneralSettings from '~/components/Settings/GeneralSettings'
import PaymentSettings from '~/components/Settings/PaymentSettings'
export default {
  components: { PaymentSettings, GeneralSettings },
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
