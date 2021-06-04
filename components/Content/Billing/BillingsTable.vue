<template>
  <div class="billings">
    <table-card title="Billings">
      <ServerTable url="/api/billings" :headers="tableHeaders">
        <template #item_total_fee="{value}">
          {{ value | formatNumber({format: '0,0.00'}) }}
        </template>
        <template #item_is_paid="{value}">
          <el-tag :type="value ? `success` : 'warning'" size="small">
            {{ value ? `Yes` : 'No' }}
          </el-tag>
        </template>
        <template #item_actions="{row}">
          <TableActions :data="row" :actions="tableActions" />
        </template>
      </ServerTable>
    </table-card>
  </div>
</template>

<script>
import ServerTable from '~/components/Tables/ServerTable'
import TableActions from '~/components/Tables/TableActions'
import request from '~/mixins/request'

const tableHeaders = [
  {
    label: 'Billing Reference',
    field: 'billing_reference_no'
  },
  {
    label: 'Customer',
    field: 'customer_name'
  },
  {
    label: 'Period',
    field: 'period',
    formatValue: (value, row) => `${row.month} ${row.year}`
  },
  {
    label: 'Coverage',
    field: 'coverage'
  },
  {
    label: 'Statement date',
    field: 'statement_date'
  },
  {
    label: 'Account no.',
    field: 'account_no'
  },
  {
    label: 'Total',
    field: 'total_fee'
  },
  {
    label: 'Due Date',
    field: 'due_date'
  },
  {
    label: 'Paid',
    field: 'is_paid'
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'BillingsTable',
  components: {
    TableActions,
    ServerTable
  },
  mixins: [request],
  data () {
    const tableActions = [
      {
        label: 'Download',
        icon: 'tim-icons icon-cloud-download-93',
        on: {
          click: (row) => {
            this.downloadPdf(row)
          }
        }
      }
    ]

    return {
      tableHeaders,
      tableActions
    }
  },
  methods: {
    downloadPdf (row) {
      const url = `/api/billings/${row.id}/download`
      const filename = `${row.billing_reference_no}.pdf`
      this.downloadFromServer(url, filename, {}, {})
    }
  }
}
</script>

<style scoped>

</style>
