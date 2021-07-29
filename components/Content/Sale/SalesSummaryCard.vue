<template>
  <TableCard>
    <template #header>
      <div class="d-flex">
        <h2 class="card-title">
          Sales Summary
        </h2>
        <div class="mx-auto" />
        <base-button :type="showFilter ? 'info' : ''" icon @click="showFilter=!showFilter">
          <i class="fas fa-filter" />
        </base-button>
      </div>
    </template>
    <div v-show="showFilter" class="filters mb-3">
      <el-form class="row" label-position="top">
        <div class="col-lg-6 col-xl-3">
          <el-form-item label="Sold Date">
            <el-date-picker v-model="filters.dateRange" type="daterange" value-format="yyyy-MM-dd" />
          </el-form-item>
        </div>
        <div class="col-lg-6 col-xl-3">
          <el-form-item label="Select Partner">
            <el-select v-model="filters.partner" class="d-block" clearable>
              <el-option v-for="partner in partners" :key="partner.id" :label="partner.name" :value="partner.id" />
            </el-select>
          </el-form-item>
        </div>
        <!--        <div class="col-lg-6 col-xl-3">
                  <el-form-item label="Select Plan">
                    <el-select v-model="filters.plan" class="d-block" clearable>
                      <el-option v-for="plan in plans" :key="plan.id" :label="plan.description" :value="plan.id"/>
                    </el-select>
                  </el-form-item>
                </div>-->
      </el-form>
      <div>
        <div class="ml-auto" />
        <base-button type="primary" @click="updateTableQuery()">
          Filter
        </base-button>
        <base-button @click="clearFilter()">
          Reset
        </base-button>
      </div>
    </div>
    <ServerTable
      ref="dataTable"
      :headers="tableHeaders"
      :query-params="queryParams"
      class="mb-3"
      default-expand-all
      url="/api/sales-summary"
    >
      <template #month="{row}">
        {{ row.year }} {{ row.month }}
      </template>
      <template #actions="{row}">
        <TableActions :data="row" :actions="tableActions" />
      </template>
    </ServerTable>
  </TableCard>
</template>
<script>
import { mapState } from 'vuex'
import { findIndex, reject } from 'lodash'
import ServerTable from '~/components/Tables/ServerTable'
import TableActions from '~/components/Tables/TableActions'
import TableCard from '~/components/Cards/TableCard'
import alerts from '~/mixins/alerts'
import { dateTimeFormat } from '~/util/utilities'

const numeral = require('numeral')

const tableHeaders = [
  {
    label: 'Partner',
    field: 'partner_id'
  },
  {
    label: 'Period Month',
    field: 'month'
  },
  {
    label: 'Coverage',
    field: 'coverage'
  },
  {
    label: 'Commission Rate',
    field: 'commission_rate'
  },
  {
    label: 'Total Sales',
    field: 'total_amount_sold',
    formatValue: value => numeral(value).format('0,0.00')
  },
  {
    label: 'Date Generated',
    field: 'created_at',
    formatValue: value => dateTimeFormat(value)
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'SalesSummaryCard',
  components: { TableCard, TableActions, ServerTable },
  mixins: [alerts],
  data () {
    const tableActions = [
      {
        label: 'Export',
        icon: 'tim-icons icon-cloud-download-93',
        disabled: (row) => {
          return findIndex(this.activeExport, o => o.id === row.id) !== -1
        },
        on: {
          click: (row) => {
            this.exportSalesSummary(row)
          }
        }
      }
    ]

    return {
      tableHeaders,
      tableActions,
      queryParams: {
        search: null
      },
      showFilter: false,
      filters: {
        dateRange: [],
        partner: null,
        branch: null,
        plan: null
      },
      activeExport: []
    }
  },
  fetch () {
    this.$store.dispatch('partner/load')
    this.$store.dispatch('plan/load')
  },
  computed: {
    ...mapState({
      partners: state => state.partner.partners,
      plans: state => state.plan.plans
    }),
    isExporting () {
      return this.activeExport.length > 0
    }
  },
  mounted () {
    this.$root.$on('search-submitted', (value) => {
      this.queryParams.search = value
    })
  },
  methods: {
    updateTableQuery () {
      this.queryParams = Object.assign({}, this.queryParams, {
        from: this.filters.dateRange ? this.filters.dateRange[0] : undefined,
        to: this.filters.dateRange ? this.filters.dateRange[1] : undefined,
        per_partner: this.filters.partner,
        per_branch: this.filters.branch,
        per_plan: this.filters.plan
      })
    },
    clearFilter () {
      this.filters.dateRange = null
      this.filters.partner = null
      this.filters.branch = null
      this.filters.plan = null

      this.updateTableQuery()
    },
    getPlanSalesPerformance (plan) {
      return Number((plan.sold - plan.total_vouchers) * plan.cost)
    },
    exportSalesSummary (row) {
      this.activeExport.push(row.id)
      const exportQuery = { ...this.queryParams }
      this.$axios.$get(`/api/sales-summary/${row.id}/export`, {
        params: exportQuery,
        responseType: 'blob'
      })
        .then((data) => {
          const extension = 'xlsx'
          const type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
          const url = window.URL.createObjectURL(new Blob([data], { type }))
          const link = document.createElement('a')
          link.href = url
          const currentDate = new Date()
          const dateSuffix = [currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes()].join('-')
          link.setAttribute('download', `sales-summary--${dateSuffix}.${extension}`)
          document.body.appendChild(link)
          link.click()
        })
        .catch(() => {
          this.showRequestErrorMessage()
        })
        .finally(() => {
          this.activeExport = reject(this.activeExport, summaryId => summaryId === row.id)
        })
    }
  }
}
</script>
