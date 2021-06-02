<template>
  <div>
    <JobOrdersTable />
  </div>
</template>
<script>

import JobOrdersTable from '~/components/Content/JobOrdersTable'
export default {
  components: { JobOrdersTable },
  data () {
    return {}
  },
  head () {
    return {
      title: 'Job Orders'
    }
  },
  methods: {}
}
</script>
