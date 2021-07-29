<template>
  <table-card title="Plan Applications">
    <p>
      Manage plan applications.
    </p>
    <ServerTable ref="serverTable" :headers="tableHeaders" url="/api/changePlan-applications">
      <template #id="{value}">
        <nuxt-link :to="`/plan-applications/${value}`">
          #{{ String(value).padStart(4, '0') }}
        </nuxt-link>
      </template>
    </ServerTable>
  </table-card>
</template>

<script>
import { get } from 'lodash'
import ServerTable from '~/components/Tables/ServerTable'
import alertsMixin from '~/mixins/alerts'
import { dateTimeFormat } from '~/util/utilities/index'

const tableHeaders = [
  {
    label: 'Application No.',
    field: 'id'
  },
  {
    label: 'Customer',
    field: 'first_name',
    formatValue: (value, row) => `${row.customer.first_name} ${row.customer.last_name}`
  },
  {
    label: 'Current Plan',
    field: 'current_plan',
    formatValue: (value, row) => row.current_plan.description
  },
  {
    label: 'Applied Plan',
    field: 'applied_plan',
    formatValue: (value, row) => get(row, 'applied_plan.description')
  },
  {
    label: 'Approved By',
    field: 'approved_by',
    formatValue: (value, row) => row.approved_by ? row.approved_by.name : ''
  },
  {
    label: 'Approved Date',
    field: 'approved_date',
    formatValue: value => dateTimeFormat(value, { format: 'MMM. d, yyyy' })
  },
  {
    label: 'Status',
    field: 'status'
  }
]

export default {
  name: 'ChangePlanApplications',
  components: {
    ServerTable
  },
  mixins: [alertsMixin],
  data () {
    return {
      tableHeaders
    }
  },
  methods: {

  }
}
</script>
