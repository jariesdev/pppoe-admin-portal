<template>
  <div>
    <table-card title="Job Orders">
      <p>
        Manage system job orders. Job orders helps you track what happening on the system.
      </p>
      <ServerTable ref="mainTable" :headers="tableHeaders" url="/api/job-orders" :query-params="queryParams">
        <template #item_parameters="{row}">
          <strong>Qty:</strong> {{ row.qty }}
        </template>
        <template #item_id="{row, value}">
          <nuxt-link :to="`/job-orders/${row.id}`">
            {{ value }}
          </nuxt-link>
        </template>
        <template #item_actions="{row}">
          <TableActions :actions="tableActions" :data="row" />
        </template>
      </ServerTable>
    </table-card>
    <card>
      <div>
        <base-button type="primary" @click="addNewJobOrder()">
          Create Job Order
        </base-button>
        <el-dialog :visible.sync="visibleJobOrderFormDialog" title="New Job Order">
          <JobOrderForm @cancel="visibleJobOrderFormDialog=false" @success="jobOrderFormSuccess" />
        </el-dialog>
      </div>
    </card>
  </div>
</template>
<script>
import ServerTable from '~/components/Tables/ServerTable'
import { defaultDateTimeFormat } from '~/util/utilities'
import TableActions from '~/components/Tables/TableActions'
import JobOrderForm from '~/components/Content/JobOrder/JobOrderForm'
import TableCard from '~/components/Cards/TableCard'

const tableHeaders = [
  {
    label: 'JO #',
    field: 'id',
    formatValue: value => (String(value).padStart(4, '0'))
  },
  {
    label: 'Job Type',
    field: 'type'
  },
  {
    label: 'parameters',
    field: 'parameters'
  },
  {
    label: 'Employee',
    field: 'employee_name'
  },
  {
    label: 'Date Created',
    field: 'created_at',
    formatValue: value => defaultDateTimeFormat(value)
  }
  // {
  //   label: 'Actions',
  //   field: 'actions'
  // }
]

export default {
  components: { TableCard, JobOrderForm, TableActions, ServerTable },
  data () {
    const tableActions = [
      {
        label: 'View Details',
        icon: 'fas fa-info-circle',
        href: ({ id }) => '/job-orders/' + id
      }
    ]

    return {
      tableHeaders,
      tableActions,
      queryParams: {},
      visibleJobOrderFormDialog: false
    }
  },
  head () {
    return {
      title: 'Job Orders'
    }
  },
  mounted () {
    this.$root.$on('search-submitted', (search) => {
      this.$set(this.queryParams, 'search', search)
    })
  },
  methods: {
    addNewJobOrder () {
      this.visibleJobOrderFormDialog = true
    },
    jobOrderFormSuccess () {
      this.visibleJobOrderFormDialog = false
      this.reloadTable()
    },
    reloadTable () {
      this.$refs.mainTable.loadData()
    }
  }
}
</script>
