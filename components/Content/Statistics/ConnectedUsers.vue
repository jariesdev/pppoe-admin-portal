<template>
  <div>
    <ServerTable ref="connectedUsersTable" :headers="headers" url="/api/connected-users" :hide-pagination="true">
      <template #empty>
        No connected users at this time.
      </template>
    </ServerTable>
  </div>
</template>

<script>
import ServerTable from '~/components/Tables/ServerTable'

const headers = [
  {
    label: 'Username',
    field: 'username'
  },
  {
    label: 'Accounting Start',
    field: 'accountingStart'
  },
  {
    label: 'Accounting End',
    field: 'accountingEnd'
  },
  {
    label: 'Duration',
    field: 'duration'
  },
  {
    label: 'NAS',
    field: 'nasshortname'
  }
]

export default {
  name: 'ConnectedUsers',
  components: { ServerTable },
  data () {
    return {
      headers
    }
  },
  methods: {
    reloadTable () {
      this.$refs.connectedUsersTable.loadData()
    }
  }
}
</script>
