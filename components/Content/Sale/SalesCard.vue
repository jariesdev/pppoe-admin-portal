<template>
  <TableCard>
    <template #header>
      <div class="d-flex">
        <h2 class="card-title">Sales</h2>
        <div class="mx-auto"/>
        <base-button :type="showFilter ? 'info' : ''" icon @click="showFilter=!showFilter">
          <i class="fas fa-filter"></i>
        </base-button>
      </div>
    </template>
    <p>
      View sales information.
    </p>
    <div v-show="showFilter" class="filters mb-3">
      <el-form class="row" label-position="top">
        <div class="col-lg-6 col-xl-3">
          <el-form-item label="Sold Date">
            <el-date-picker v-model="filters.dateRange" type="daterange" value-format="yyyy-MM-dd"/>
          </el-form-item>
        </div>
        <div class="col-lg-6 col-xl-3">
          <el-form-item label="Select Partner">
            <el-select v-model="filters.partner" class="d-block" clearable @change="partnerChange">
              <el-option v-for="partner in partners" :key="partner.id" :label="partner.name" :value="partner.id"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-lg-6 col-xl-3">
          <el-form-item label="Select Branch">
            <el-select v-model="filters.branch" :disabled="!filters.partner" class="d-block" clearable>
              <el-option v-for="branch in partnerBranches" :key="branch.id" :label="branch.name" :value="branch.id"/>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-lg-6 col-xl-3">
          <el-form-item label="Select Plan">
            <el-select v-model="filters.plan" class="d-block" clearable>
              <el-option v-for="plan in plans" :key="plan.id" :label="plan.description" :value="plan.id"/>
            </el-select>
          </el-form-item>
        </div>
      </el-form>
      <div>
        <div class="ml-auto"/>
        <base-button type="primary" @click="updateTableQuery()">Filter</base-button>
        <base-button @click="clearFilter()">Reset</base-button>
      </div>
    </div>
    <ServerTable ref="dataTable"
                 :headers="tableHeaders"
                 :query-params="queryParams"
                 class="mb-3"
                 url="/api/sales"
                 @success="setTotalSales">
      <template #item_allocation="{value}">
        {{ value | humanizeTimeAllocation }}
      </template>
      <template #item_is_sold="{value}">
        <span v-if="value" class="badge badge-success">Yes</span>
        <span v-else class="badge">No</span>
      </template>
      <template #item_actions="{row}">
        <TableActions :data="row">
          <el-popover trigger="click">
            <button
                slot="reference"
                class="btn el-tooltip btn-link btn-icon btn-fab btn-neutral btn-sm"
                type="button">
              <i class="fas fa-ellipsis-v"/>
            </button>
            <template slot="default">
              <ul class="list-unstyled">
                <li>
                  <nuxt-link :to="`partners/${row.id}`" class="dropdown-item">Partner Details</nuxt-link>
                </li>
              </ul>
            </template>
          </el-popover>
        </TableActions>
      </template>
      <template #before-pagination>
        <div v-show="totalSales !== null">
          Total Sales: <strong>{{ totalSales }}</strong>
        </div>
      </template>
    </ServerTable>
    <div>
      <base-button :loading="exporting" type="info" @click="exportToExcel()">Export</base-button>
    </div>
  </TableCard>
</template>
<script>
import {get} from 'lodash'
import ServerTable from "~/components/Tables/ServerTable";
import {defaultDateTimeFormat} from "~/util/utilities";
import TableActions from "~/components/Tables/TableActions";
import TableActionButton from "~/components/Tables/TableActionButton";
import TableCard from "~/components/Cards/TableCard";
import {mapState} from "vuex";

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
    label: 'Plan',
    field: 'plan.description'
  },
  {
    label: 'Voucher',
    field: 'voucher'
  },
  {
    label: 'Allocation type',
    field: 'allocation_type'
  },
  {
    label: 'Allocation',
    field: 'allocation'
  },
  {
    label: 'Price on generate',
    field: 'price_on_generate',
    formatValue: (value) => numeral(value).format('0,0.00')
  },
  {
    label: 'Sold',
    field: 'is_sold',
    formatValue: (value) => Boolean(value) ? 'Yes' : 'No'
  },
  {
    label: 'Date sold',
    field: 'date_sold',
    formatValue: (value) => defaultDateTimeFormat(value)
  },
  {
    label: 'Date Created',
    field: 'created_at',
    formatValue: (value) => defaultDateTimeFormat(value)
  },
  // {
  //   label: 'Actions',
  //   field: 'actions'
  // }
]

export default {
  name: 'SalesCard',
  components: {TableCard, TableActionButton, TableActions, ServerTable},
  fetch() {
    this.$store.dispatch('partner/load')
    this.$store.dispatch('plan/load')
  },
  data() {
    return {
      tableHeaders,
      totalSales: null,
      queryParams: {
        search: null,
      },
      showFilter: false,
      filters: {
        dateRange: [],
        partner: null,
        branch: null,
        plan: null,
      },
      partnerBranches: [],
      exporting: false
    }
  },
  computed: {
    ...mapState({
      partners: state => state.partner.partners,
      plans: state => state.plan.plans
    }),
  },
  mounted() {
    this.$root.$on('search-submitted', (value) => {
      this.queryParams.search = value
    })
  },
  methods: {
    setTotalSales({response}) {
      this.totalSales = get(response, 'sales_data.totalSales', null)
    },
    partnerChange(value) {
      this.filters.branch = null
      if (value !== null) {
        this.$axios.$get(`/api/partners/${value}/branches`)
            .then(({data}) => {
              this.partnerBranches = data
            })
            .catch(() => {
              this.partnerBranches = []
            })
      }
    },
    updateTableQuery() {
      this.queryParams = Object.assign({}, this.queryParams, {
        from: this.filters.dateRange ? this.filters.dateRange[0] : undefined,
        to: this.filters.dateRange ? this.filters.dateRange[1] : undefined,
        per_partner: this.filters.partner,
        per_branch: this.filters.branch,
        per_plan: this.filters.plan,
      })
    },
    clearFilter() {
      this.filters.dateRange = null
      this.filters.partner = null
      this.filters.branch = null
      this.filters.plan = null

      this.updateTableQuery()
    },
    async exportToExcel() {
      try {
        this.exporting = true
        await this.$refs['dataTable'].exportTo('sales', {
          headers: this.tableHeaders
        })
      } catch (e) {
        throw e
      } finally {
        this.exporting = false
      }
    }
  }
}
</script>
