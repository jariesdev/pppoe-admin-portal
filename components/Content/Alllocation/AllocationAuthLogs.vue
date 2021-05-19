<template>
  <ServerTable :url="`/api/allocations/${allocationId}/auth-logs`" :headers="headers" />
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
    label: 'pass',
    field: 'pass'
  },
  {
    label: 'Nas',
    field: 'nas'
  },
  {
    label: 'reply',
    field: 'reply'
  },
  {
    label: 'authdate',
    field: 'authdate'
  },
  {
    label: 'Reply Message',
    field: 'reply_message'
  }
]

export default {
  name: 'AllocationAuthLogs',
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
