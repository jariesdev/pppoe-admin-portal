<template>
  <table-card class="customers" title="Customers">
    <ServerTable ref="customers" url="/api/customers" :headers="tableHeaders" :query-params="tableQueryParams">
      <template #item_first_name="{value ,row}">
        <nuxt-link :to="`/customers/${row.id}`">
          {{ value }}
        </nuxt-link>
      </template>
      <template #item_is_active="{row}">
        <el-tag :type="row.is_active ? 'success' : 'info'" size="small">
          {{ row.is_active ? 'Yes' : 'No' }}
        </el-tag>
      </template>
    </ServerTable>
  </table-card>
</template>

<script>
import ServerTable from '~/components/Tables/ServerTable'
const tableHeaders = [
  {
    label: 'Customer',
    field: 'first_name',
    formatValue: (value, row) => `${value} ${row.last_name}`
  },
  {
    label: 'Account No.',
    field: 'account_no'
  },
  {
    label: 'Email',
    field: 'email'
  },
  {
    label: 'Mobile',
    field: 'mobile_no'
  },
  {
    label: 'Account Type',
    field: 'account_type'
  },
  {
    label: 'Contract Start',
    field: 'contract_start'
  },
  {
    label: 'Active',
    field: 'is_active'
  }
]
export default {
  name: 'CustomerTable',
  components: { ServerTable },
  data () {
    return {
      tableHeaders,
      tableQueryParams: {}
    }
  }
}
</script>

<style scoped>

</style>
