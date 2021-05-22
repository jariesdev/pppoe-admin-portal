<template>
  <table-card title="Branches">
    <p>
      Manage partner's branches.
    </p>
    <ServerTable ref="serverTable" :headers="tableHeaders" url="/api/branches">
      <template #item_coordinates="{row,value}">
        <a :href="`http://www.google.com/maps/place/${row.latitude},${row.longitude}`" target="_blank">{{ value }}</a>
      </template>
      <template #item_actions="{row}">
        <TableActions :actions="tableActions" :data="row" />
      </template>
    </ServerTable>
    <div>
      <base-button type="primary" @click="addBranch()">
        New Branch
      </base-button>
    </div>
    <el-dialog :visible.sync="visibleBranchFormDialog" destroy-on-close :before-close="resetFormDialog">
      <template #title>
        {{ editBranchId === null ? 'New' : 'Edit' }} Branch
      </template>
      <BranchForm
        v-if="visibleBranchFormDialog"
        :edit-branch="editBranchId"
        @cancel="cancelBranchFormDialog()"
        @success="closeAndReloadTable()"
      />
    </el-dialog>
  </table-card>
</template>

<script>
import { Dialog } from 'element-ui'
import { mapActions } from 'vuex'
import ServerTable from '~/components/Tables/ServerTable'
import { defaultDateTimeFormat } from '~/util/utilities'
import BranchForm from '~/components/Content/Branches/BranchForm'
import TableActions from '~/components/Tables/TableActions'
import alertsMixin from '~/mixins/alerts'

const tableHeaders = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Address',
    field: 'store_address'
  },
  {
    label: 'Contact',
    field: 'contact_number'
  },
  {
    label: 'Coordinates',
    field: 'coordinates'
  },
  {
    label: 'Date Created',
    field: 'created_at',
    formatValue: value => defaultDateTimeFormat(value)
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'BranchesTable',
  components: {
    TableActions,
    BranchForm,
    [Dialog.name]: Dialog,
    ServerTable
  },
  mixins: [alertsMixin],
  data () {
    const tableActions = [
      {
        label: 'Edit',
        icon: 'tim-icons icon-pencil text-primary',
        on: {
          click: ({ id }) => {
            this.editBranchId = id
            this.openBranchFormDialog()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'tim-icons icon-simple-remove text-danger',
        on: {
          click: async ({ id, name }) => {
            const confirmed = await this.$confirm(
              'You are about to delete "' + name + '" branch, continue?',
              'Delete branch',
              { type: 'warning' }
            ).catch(() => false)
            if (!confirmed) { return }

            try {
              await this.deleteBranch(id)
              this.$notify({ message: 'Branch has been deleleted.', type: 'success', icon: 'icon-check-2' })
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
      visibleBranchFormDialog: false,
      editBranchId: null
    }
  },
  mounted () {
    if (this.$route.query.add) {
      this.openBranchFormDialog()
    }
  },
  methods: {
    ...mapActions({
      deleteBranch: 'branch/delete'
    }),
    addBranch () {
      this.openBranchFormDialog()
    },
    openBranchFormDialog () {
      this.visibleBranchFormDialog = true
    },
    closeBranchFormDialog () {
      this.visibleBranchFormDialog = false
    },
    reloadTable () {
      this.$refs.serverTable.loadData()
    },
    closeAndReloadTable () {
      this.closeBranchFormDialog()
      this.reloadTable()
    },
    resetFormDialog (done) {
      this.editBranchId = null
      done()
    },
    cancelBranchFormDialog () {
      this.closeBranchFormDialog()
      this.editBranchId = null
    }
  },
  head () {
    return {
      title: 'Branches'
    }
  }
}
</script>
