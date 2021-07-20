<template>
  <table-card title="Sale Transactions">
    <ServerTable ref="dataTable" url="/api/transactions" :headers="tableHeaders" :query-params="tableQueryParams">
      <template #empty>
        No transactions yet.
      </template>
      <template #remarks="{value}">
        <span v-if="!value">-</span>
        <el-popover v-else>
          <h5>Remarks</h5>
          <p>{{ value }}</p>
          <a slot="reference" href="" @click.prevent>view</a>
        </el-popover>
      </template>
    </ServerTable>
    <div>
      <base-button type="primary" :loading="exporting" @click="exportToExcel()">
        Export
      </base-button>
    </div>
  </table-card>
</template>

<script>
/**
 * @todo Add transaction single page
 */
import ServerTable from '~/components/Tables/ServerTable'
import alerts from '~/mixins/alerts'
import { defaultDateTimeFormat } from '~/util/utilities'

const numeral = require('numeral')

const tableHeaders = [
  {
    label: 'Partner',
    field: 'partner.name'
  },
  {
    label: 'Branch',
    field: 'branch.name'
  },
  {
    label: 'Mobile',
    field: 'mobile',
    formatValue: value => value || 'n/a'
  },
  {
    label: 'Quantity',
    field: 'qty',
    formatValue: value => numeral(value).format('0,0')
  },
  {
    label: 'Remarks',
    field: 'remarks'
  },
  {
    label: 'Assigned User',
    field: 'partner_user.username'
  },
  {
    label: 'Record Date',
    field: 'created_at',
    formatValue: value => defaultDateTimeFormat(value)
  }
]

export default {
  name: 'SaleTransactionsCard',
  components: { ServerTable },
  mixins: [alerts],
  data () {
    return {
      tableHeaders,
      exporting: false,
      tableQueryParams: {
        search: ''
      }
    }
  },
  created () {
    this.$root.$on('search-submitted', this.tableSearch)
  },
  methods: {
    async exportToExcel () {
      try {
        // @todo use custom header with more data
        this.exporting = true
        await this.$refs.dataTable.exportTo('transactions', {
          headers: this.tableHeaders
        })
      } catch (e) {
        this.showRequestErrorMessage()
      } finally {
        this.exporting = false
      }
    },
    tableSearch (value) {
      this.$set(this.tableQueryParams, 'search', value)
    }
  }
}
</script>

<style scoped>

</style>
