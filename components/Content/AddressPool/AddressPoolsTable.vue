<template>
  <table-card title="Address Pools" class="address-pools">
    <ServerTable url="/api/address-pools" :headers="tableHeaders" />
    <div>
      <base-button type="info" @click="addNew()">
        Add New
      </base-button>
      <el-dialog :visible="formDialogVisible" modal :close-on-click-modal="false">
        <template #title>
          {{ editAddressPoolId ? 'Edit' : 'New' }} Address Pool
        </template>
        <AddressPoolForm :address-pool-id="editAddressPoolId" @cancel="cancel()" />
      </el-dialog>
    </div>
  </table-card>
</template>

<script>
import ServerTable from '~/components/Tables/ServerTable'
import { defaultDateTimeFormat } from '~/util/utilities'
import AddressPoolForm from '~/components/Content/AddressPool/AddressPoolForm'

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
    formatValue: value => defaultDateTimeFormat(value)
  }
]

export default {
  name: 'AddressPoolsTable',
  components: { AddressPoolForm, ServerTable },
  data () {
    return {
      tableHeaders,
      formDialogVisible: false,
      editAddressPoolId: null
    }
  },
  methods: {
    addNew () {
      this.editAddressPoolId = null
      this.formDialogVisible = true
    },
    cancel () {
      this.formDialogVisible = false
      this.editAddressPoolId = null
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

</style>
