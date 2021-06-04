<template>
  <div>
    <PlansTable />
  </div>
</template>
<script>
import PlansTable from '~/components/Plan/PlansTable'

export default {
  components: {
    PlansTable
  },
  data () {
    return {}
  },
  head () {
    return {
      title: 'Plans'
    }
  }
}
</script>
