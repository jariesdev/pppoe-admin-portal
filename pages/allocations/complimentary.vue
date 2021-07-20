<template>
  <div>
    <TableCard title="Allocations">
      <p>
        Below are all complimentary allocations. For non-complimentary vouchers, <nuxt-link to="/allocations">
          click here
        </nuxt-link>.
      </p>
      <ServerTable ref="mainTable" :headers="tableHeaders" :query-params="queryParams" url="/api/allocations">
        <template #allocation="{value}">
          {{ value | humanizeTimeAllocation }}
        </template>
        <template #price="{value}">
          <span v-if="value === 'Free'" class="badge badge-success">FREE</span>
          <span>{{ value }}</span>
        </template>
        <template #actions="{row}">
          <TableActions :actions="tableActions" :data="row" />
        </template>
      </ServerTable>

      <el-dialog
        :before-close="(done)=>{ showConsumptionFor=null; done()}"
        :visible="showConsumptionFor!==null"
        title="Consumption Details"
      >
        <VoucherConsumption v-if="showConsumptionFor" :allocation-id="showConsumptionFor" />
        <div class="text-center">
          <base-button @click="showConsumptionFor=null">
            Close
          </base-button>
        </div>
      </el-dialog>
    </TableCard>
  </div>
</template>
<script>
import ServerTable from '~/components/Tables/ServerTable'
import TableActions from '~/components/Tables/TableActions'
import alerts from '~/mixins/alerts'
import VoucherConsumption from '~/components/Content/Alllocation/VoucherConsumptionDetails'

const numeral = require('numeral')

export default {
  components: { VoucherConsumption, TableActions, ServerTable },
  mixins: [alerts],
  data () {
    const tableHeaders = [
      {
        label: 'Mobile No.',
        field: 'mobile_number'
      },
      {
        label: 'Plan',
        field: 'plan'
      },
      {
        label: 'Cost Price',
        field: 'price',
        formatValue: value => value > 0 ? numeral(value).format('0,0.00') : 'Free'
      },
      {
        label: 'Voucher',
        field: 'voucher'
      },
      {
        label: 'Allocation',
        field: 'allocation'
      },
      {
        label: 'Actions',
        field: 'actions'
      }
    ]

    const tableActions = [
      {
        label: 'More Details',
        icon: 'fas fa-info-circle',
        href: ({ id }) => `/allocations/${id}`
      },
      {
        label: 'View Consumptions',
        icon: 'tim-icons icon-sound-wave',
        disabled: row => !row.is_sold,
        on: {
          click: ({ id }) => {
            this.showConsumptionFor = +id
          }
        }
      }
    ]

    return {
      tableHeaders,
      tableActions,
      showConsumptionFor: null,
      queryParams: {
        complimentary: 1
      }
    }
  },
  head () {
    return {
      title: 'Allocations'
    }
  },
  mounted () {
    this.$root.$on('search-submitted', (search) => {
      this.$set(this.queryParams, 'search', search)
    })
  },
  methods: {
    async markAsSold ({ voucher, partner }) {
      const confirmed = await this.$confirm(`Would you like to mark "${voucher}" (${partner}) as sold?`).catch(() => false)
      if (!confirmed) { return }

      this.$store.dispatch('allocation/markAsSold', voucher)
        .then(() => {
          this.reloadTable()
          this.$notify({
            type: 'success',
            message: 'Voucher has been mark as sold'
          })
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
    },
    reloadTable () {
      this.$refs.mainTable.loadData()
    }
  }
}
</script>
