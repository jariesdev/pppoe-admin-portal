<template>
  <table-card title="Address Pools" class="address-pools">
    <ServerTable ref="addressPools" url="/api/address-pools" :headers="tableHeaders">
      <template #actions="{row}">
        <TableActions :data="row" :actions="tableActions" />
      </template>
    </ServerTable>
    <div>
      <base-button type="info" @click="addNew()">
        Add New
      </base-button>
      <el-dialog :visible="formDialogVisible" modal :close-on-click-modal="false" :show-close="false">
        <template #title>
          {{ editAddressPoolId ? 'Edit' : 'New' }} Address Pool
        </template>
        <AddressPoolForm :address-pool-id="editAddressPoolId" @success="formSuccess()" @cancel="formCancel()" />
      </el-dialog>
    </div>
  </table-card>
</template>

<script>
import ServerTable from '~/components/Tables/ServerTable'
import { dateTimeFormat } from '~/util/utilities'
import AddressPoolForm from '~/components/Content/AddressPool/AddressPoolForm'
import TableActions from '~/components/Tables/TableActions'

const tableHeaders = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'IP Range',
    field: 'ip_range'
  },
  {
    label: 'Date Created',
    field: 'created_at',
    formatValue: value => dateTimeFormat(value)
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'AddressPoolsTable',
  components: { TableActions, AddressPoolForm, ServerTable },
  data () {
    const tableActions = [
      {
        label: 'Edit',
        icon: 'tim-icons icon-pencil',
        on: {
          click: (row) => {
            this.editAddressPoolId = row.id
            this.formDialogVisible = true
          }
        }
      }
    ]

    return {
      tableHeaders,
      tableActions,
      formDialogVisible: false,
      editAddressPoolId: null
    }
  },
  methods: {
    addNew () {
      this.editAddressPoolId = null
      this.formDialogVisible = true
    },
    formSuccess () {
      this.formDialogVisible = false
      this.editAddressPoolId = null
      this.reloadTable()
    },
    formCancel () {
      this.formDialogVisible = false
      this.editAddressPoolId = null
      this.$emit('cancel')
    },
    reloadTable () {
      this.$refs.addressPools.loadData()
    }
  }
}
</script>

<style scoped>

</style>
