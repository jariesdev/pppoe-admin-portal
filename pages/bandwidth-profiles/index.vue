<template>
  <div>
    <TableCard title="Bandwidth Profiles">
      <p>
        Manage bandwidth profiles which are import by the system to each deployed access points.
      </p>
      <ServerTable ref="mainTable" :headers="tableHeaders" url="/api/bandwidth-profiles" :query-params="queryParams">
        <template #item_actions="{row}">
          <TableActions :actions="tableActions" :data="row" />
        </template>
      </ServerTable>
    </TableCard>
    <card>
      <base-button type="primary" @click="openBandwidthProfileFormDialog()">
        Add Profile
      </base-button>
      <el-dialog :visible.sync="visibleBandwidthProfileFormDialog">
        <template #title>
          {{ editBandwidthProfile !== null ? 'Edit' : 'New' }} Bandwidth Profile
        </template>
        <BandwidthProfileForm
          v-if="visibleBandwidthProfileFormDialog"
          :bandwidth-profile="editBandwidthProfile"
          @cancel="bandwidthProfileFormCancel"
          @success="bandwidthProfileFormSuccess"
        />
      </el-dialog>
    </card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ServerTable from '~/components/Tables/ServerTable'
import TableActions from '~/components/Tables/TableActions'
import { defaultDateTimeFormat } from '~/util/utilities'
import BandwidthProfileForm from '~/components/Content/BandwidthProfile/BandwidthProfileForm'
import alerts from '~/mixins/alerts'

const tableHeaders = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Rate Limit (Tx/Rx)',
    field: 'rate_limit'
  },
  {
    label: 'Address Pool',
    field: 'address_pool'
  },
  {
    label: 'Date Created',
    field: 'created_at',
    formatValue: value => defaultDateTimeFormat(value)
  },
  {
    label: 'Last Updated',
    field: 'updated_at',
    formatValue: value => defaultDateTimeFormat(value)
  },
  {
    label: 'actions',
    field: 'actions'
  }
]

export default {
  components: { BandwidthProfileForm, TableActions, ServerTable },
  mixins: [alerts],
  data () {
    const tableActions = [
      {
        label: 'Edit Profile',
        icon: 'tim-icons icon-pencil text-primary',
        on: {
          click: ({ id }) => {
            this.editBandwidthProfile = id
            this.visibleBandwidthProfileFormDialog = true
          }
        }
      },
      {
        label: 'Delete Profile',
        icon: 'tim-icons icon-simple-remove text-danger',
        on: {
          click: async ({ id }) => {
            const confirmed = await this.$confirm('You are about to DELETE bandwidth profile. Continue?', 'Confirm Delete', {
              type: 'error'
            }).catch(() => false)
            if (!confirmed) { return }

            try {
              await this.deleteBandwidthProfile(id)
              this.reloadTable()
              this.$notify({
                type: 'success',
                message: 'Bandwidth Profile has been deleted.'
              })
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
      visibleBandwidthProfileFormDialog: false,
      queryParams: {},
      editBandwidthProfile: null
    }
  },
  mounted () {
    this.$root.$on('search-submitted', (search) => {
      this.$set(this.queryParams, 'search', search)
    })
  },
  methods: {
    ...mapActions({
      deleteBandwidthProfile: 'bandwidth-profile/delete'
    }),
    bandwidthProfileFormCancel () {
      this.visibleBandwidthProfileFormDialog = false
      this.editBandwidthProfile = null
    },
    bandwidthProfileFormSuccess () {
      this.visibleBandwidthProfileFormDialog = false
      this.reloadTable()
    },
    openBandwidthProfileFormDialog () {
      this.visibleBandwidthProfileFormDialog = true
      this.editBandwidthProfile = null
    },
    reloadTable () {
      this.$refs.mainTable.loadData()
    }
  }
}
</script>
