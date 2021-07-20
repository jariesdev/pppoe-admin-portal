<template>
  <ServerTable ref="table" :headers="tableHeaders" :url="`/api/nas/${nasId}/accesspoints`">
    <template #empty>
      <slot name="empty">
        <span>No access point yet.</span>
      </slot>
    </template>
    <template slot="ap_address" slot-scope="{row,value}">
      <slot name="item_ap_address" :row="row" :value="value">
        {{ value }}
      </slot>
    </template>
    <template slot="actions" slot-scope="{row}">
      <slot name="table_actions" :row="row" :actions="tableActions">
        <TableActions :actions="tableActions" :data="row" />
      </slot>
    </template>
  </ServerTable>
</template>

<script>

import ServerTable from '~/components/Tables/ServerTable'
import { defaultDateTimeFormat } from '~/util/utilities'
import TableActions from '~/components/Tables/TableActions'

const tableHeaders = [
  {
    label: 'AP Address',
    field: 'ap_address'
  },
  {
    label: 'AP Name',
    field: 'ap_name'
  },
  {
    label: 'AP Port',
    field: 'ap_port'
  },
  {
    label: 'Username',
    field: 'ap_username'
  },
  {
    label: 'Date Created',
    field: 'created_at',
    formatValue: value => defaultDateTimeFormat(value)
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'AccessPointTable',
  components: { TableActions, ServerTable },
  props: {
    nasId: {
      type: Number,
      required: true
    }
  },
  data () {
    const tableActions = [
      {
        label: 'View Status',
        icon: 'tim-icons icon-sound-wave',
        href: ({ id }) => `/nas/${this.nasId}/access-points/status?id=${id}`
      },
      {
        label: 'Profiles',
        icon: 'tim-icons icon-single-copy-04',
        href: ({ id }) => `/nas/${this.nasId}/access-points/${id}/profiles`
      }
    ]

    return {
      tableHeaders,
      tableActions
    }
  },
  methods: {
    reloadTable () {
      this.$refs.table.loadData()
    }
  }
}
</script>
