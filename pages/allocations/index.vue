<template>
  <div>
    <TableCard title="Allocations">
      <p>
        Manage allocation vouchers. To generate voucher, please see
        <nuxt-link to="job-orders">
          Job Orders
        </nuxt-link>
        section. For complimentary vouchers, <nuxt-link to="/allocations/complimentary">
          click here
        </nuxt-link>.
      </p>
      <ServerTable ref="mainTable" :headers="tableHeaders" :query-params="queryParams" url="/api/allocations">
        <template #is_sold="{row,value}">
          <span v-if="value" class="badge badge-success" title="Already sold">Yes</span>
          <button v-else class="badge badge-light" title="Click to mark as sold" @click="markAsSold(row)">
            No
          </button>
        </template>
        <template #allocation="{value}">
          {{ value | humanizeTimeAllocation }}
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

export default {
  components: { VoucherConsumption, TableActions, ServerTable },
  mixins: [alerts],
  data () {
    const tableHeaders = [
      {
        label: 'Partner',
        field: 'partner'
      },
      {
        label: 'Branch',
        field: 'branch'
      },
      {
        label: 'Plan',
        field: 'plan'
      },
      {
        label: 'Cost Price',
        field: 'price'
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
        label: 'Sold',
        field: 'is_sold'
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
        label: 'View Job Order',
        icon: 'tim-icons icon-bullet-list-67',
        disabled: row => !row.job_order_id,
        href: row => row.job_order_id ? `/job-orders/${row.job_order_id}` : null
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
        complimentary: 0
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
