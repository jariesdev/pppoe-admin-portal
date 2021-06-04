<template>
  <div>
    <TableCard title="Network Access Servers (NAS)">
      <p>
        Current registered NAS.
      </p>

      <ServerTable ref="mainTable" :headers="tableHeaders" :query-params="queryParams" url="/api/nas">
        <template #item_nasname="{row: {id},value}">
          <nuxt-link :to="`nas/${id}`">
            {{ value }}
          </nuxt-link>
        </template>
        <template slot="item_actions" slot-scope="{row}">
          <TableActions :actions="tableActions" :data="row" />
        </template>
      </ServerTable>
    </TableCard>
    <card>
      <base-button type="primary" @click="addNAS">
        Register new NAS
      </base-button>
      <el-dialog :visible.sync="visibleNasFormDialog" show-close :close-on-click-modal="false" :before-close="beforeModalClose">
        <template #title>
          {{ editNasId ? 'Edit' : 'New' }} NAS
        </template>
        <NasForm v-if="visibleNasFormDialog" :edit-nas-id="editNasId" @cancel="nasFormCancel" @success="nasFormSuccess" />
      </el-dialog>
    </card>
  </div>
</template>

<script>
import ServerTable from '~/components/Tables/ServerTable'
import TableActions from '~/components/Tables/TableActions'
import NasForm from '~/components/Content/NAS/NasForm'

const tableHeaders = [
  {
    label: 'Name',
    field: 'nasname'
  },
  {
    label: 'Alias',
    field: 'shortname',
    formatValue: value => value || '-'
  },
  {
    label: 'Type',
    field: 'type'
  },
  {
    label: 'Ports',
    field: 'ports',
    formatValue: value => value || '-'
  },
  {
    label: 'Secret',
    field: 'secret'
  },
  {
    label: 'Server',
    field: 'server',
    formatValue: value => value || '-'
  },
  {
    label: 'Community',
    field: 'community',
    formatValue: value => value || '-'
  },
  {
    label: 'Description',
    field: 'description'
  },
  {
    label: 'branch',
    field: 'branch.name',
    formatValue: value => value || '-'
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'NasTable',
  components: { NasForm, TableActions, ServerTable },
  data () {
    const tableActions = [
      {
        label: 'View',
        icon: 'fas fa-info-circle',
        href: ({ id }) => `nas/${id}`
      },
      {
        label: 'Edit',
        icon: 'tim-icons icon-pencil',
        on: {
          click: (row) => {
            this.editNasId = row.id
            this.visibleNasFormDialog = true
          }
        }
      },
      {
        label: 'NAS Dashboard',
        icon: 'tim-icons icon-sound-wave',
        href: ({ id }) => `nas/${id}/access-points/status`
      }
    ]

    return {
      tableHeaders,
      tableActions,
      visibleNasFormDialog: false,
      editNasId: null,
      queryParams: {}
    }
  },
  head () {
    return {
      title: 'NAS'
    }
  },
  mounted () {
    this.$root.$on('search-submitted', (search) => {
      this.$set(this.queryParams, 'search', search)
    })
  },
  methods: {
    addNAS () {
      this.visibleNasFormDialog = true
    },
    nasFormCancel () {
      this.editNasId = null
      this.visibleNasFormDialog = false
    },
    nasFormSuccess () {
      this.visibleNasFormDialog = false
      this.editNasId = null
      this.reloadTable()
    },
    reloadTable () {
      this.$refs.mainTable.loadData()
    },
    beforeModalClose (done) {
      this.editNasId = null
      done()
    }
  }
}
</script>
