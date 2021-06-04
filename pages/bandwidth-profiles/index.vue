<template>
  <div>
    <BandwidthProfileTable />
  </div>
</template>
<script>
import BandwidthProfileTable from '~/components/Content/BandwidthProfile/BandwidthProfileTable'

export default {
  components: { BandwidthProfileTable },
  data () {
    return { }
  },
  head () {
    return {
      title: 'Bandwidth Profiles'
    }
  }
}
</script>
