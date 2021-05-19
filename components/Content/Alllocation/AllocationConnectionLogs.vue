<template>
  <ServerTable :url="`/api/allocations/${allocationId}/connections`" :headers="headers" />
</template>
<script>
import ServerTable from '~/components/Tables/ServerTable'

const headers = [
  {
    label: 'Branch',
    field: 'branch'
  },
  {
    label: 'username',
    field: 'username'
  },
  {
    label: 'accountingStart',
    field: 'accountingStart'
  },
  {
    label: 'accountingEnd',
    field: 'accountingEnd'
  },
  {
    label: 'duration',
    field: 'duration'
  },
  {
    label: 'hotSpotIpAddress',
    field: 'hotSpotIpAddress'
  },
  {
    label: 'mtControllerAddress',
    field: 'mtControllerAddress'
  },
  {
    label: 'terminationCause',
    field: 'terminationCause'
  }
]

export default {
  name: 'AllocationConnectionLogs',
  components: { ServerTable },
  props: {
    allocationId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      headers
    }
  }
}
</script>
