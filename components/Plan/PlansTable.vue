<template>
  <div>
    <TableCard title="Plans">
      <p>
        Manage hotspot plans. Create, Update and remove plans from the list.
        Plans are use when generating allocation vouchers.
      </p>
      <ServerTable ref="serverTable" :headers="tableHeaders" url="/api/plans" :query-params="queryParams">
        <template #item_radius_value="{row,value}">
          <el-popover v-if="row.radius_attribute === radiusAttributes.LOGIN_TIME" trigger="click" width="400">
            <a slot="reference" href="" @click.prevent>{{ value }}</a>
            <WeeklySchedule class="text-black-50" :content="value" />
          </el-popover>
          <el-popover v-else trigger="click">
            <a slot="reference" href="" @click.prevent>{{ value }}</a>
            <p class="text-black-50 text-center">
              {{ formatMaxAllSession(value) }}
            </p>
          </el-popover>
        </template>
        <template #item_actions="{row}">
          <TableActions :actions="tableActions" :data="row" />
        </template>
      </ServerTable>
    </TableCard>
    <card>
      <base-button type="primary" @click="addPlan()">
        Add Plan
      </base-button>
      <el-dialog :visible.sync="visiblePlanFormDialog">
        <template #title>
          {{ editPlanId ? 'Edit' : 'New' }} Plan
        </template>
        <PlanForm
          v-if="visiblePlanFormDialog"
          :edit-plan="editPlanId"
          @cancel="planFormCancel"
          @success="planFormSuccess"
        />
      </el-dialog>
    </card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ServerTable from '~/components/Tables/ServerTable'
import TableActions from '~/components/Tables/TableActions'
import alerts from '~/mixins/alerts'
import PlanForm from '~/components/Content/Plan/PlanForm'
import { radiusAttributes } from '~/assets/js/constants'
import WeeklySchedule from '~/components/Content/BandwidthProfile/WeeklySchedule'

const numeral = require('numeral')
const tableHeaders = [
  {
    label: 'Name',
    field: 'description'
  },
  {
    label: 'Rate Limit (Tx/Rx)',
    field: 'rate_limit'
  },
  {
    label: 'Price',
    field: 'price',
    formatValue: value => numeral(value).format('0,0.00')
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'PlansTable',
  components: { WeeklySchedule, PlanForm, TableActions, ServerTable },
  mixins: [alerts],
  data () {
    const tableActions = [
      {
        label: 'Update Plan',
        icon: 'tim-icons icon-pencil text-primary',
        to: ({ id }) => `plans/${id}/edit`
      },
      {
        label: 'Delete this plan',
        icon: 'tim-icons icon-simple-remove text-danger',
        disabled: row => Boolean(row.is_complimentary),
        on: {
          click: async ({ id, name }) => {
            const confirmed = await this.$confirm(
              'Delete plan',
              'Are you sure to delete ' + name + ' plan?',
              { type: 'warning' }
            )
            if (!confirmed) { return }

            try {
              await this.deletePlan(id)
              this.$notify({
                type: 'success',
                message: 'Plan Has been removed.'
              })
              this.reloadTable()
            } catch (e) {
              this.showRequestErrorMessage()
            }
          }
        }
      }
    ]

    return {
      tableHeaders,
      tableActions,
      radiusAttributes,
      visiblePlanFormDialog: false,
      queryParams: {},
      editPlanId: null
    }
  },
  mounted () {
    this.$root.$on('search-submitted', (search) => {
      this.$set(this.queryParams, 'search', search)
    })
  },
  methods: {
    ...mapActions({
      deletePlan: 'plan/delete'
    }),
    reloadTable () {
      this.$refs.serverTable.loadData()
    },
    addPlan () {
      this.visiblePlanFormDialog = true
    },
    planFormCancel () {
      this.visiblePlanFormDialog = false
      this.editPlanId = null
    },
    planFormSuccess () {
      this.visiblePlanFormDialog = false
      this.editPlanId = null
      this.reloadTable()
    },
    formatMaxAllSession (value) {
      if (!value) { return null }

      return String(value)
        .replaceAll('D', ' day(s)')
        .replaceAll('H', ' hour(s)')
    }
  }
}
</script>
