<template>
  <div>
    <NasTable />
  </div>
</template>

<script>
import NasTable from '~/components/Content/NAS/NasTable'

export default {
  components: {
    NasTable
  },
  data () {
    return { }
  },
  head () {
    return {
      title: 'NAS'
    }
  }
}
</script>
