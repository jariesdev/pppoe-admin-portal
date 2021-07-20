<template>
  <div>
    <table-card title="Users">
      <p>
        Users to have access to partner's portal.
      </p>
      <server-table ref="userTable" :headers="tableHeaders" :url="`/api/partners/${partnerId}/users`">
        <template #empty>
          No users assigned yet.
        </template>
        <template #item_admin="{row, value}">
          <el-tag :type="value ? 'warning' : 'success'" size="small">
            {{ value ? 'Administrator' : 'Standard' }}
          </el-tag>
        </template>
        <template #actions="{row}">
          <TableActions :actions="tableActions" :data="row" />
        </template>
      </server-table>
      <div>
        <base-button type="primary" @click="addUser()">
          Add User
        </base-button>
      </div>
      <el-dialog
        :before-close="(done)=>{ showAddUserDialog = false; done() ;}"
        :title="editUserId ? 'Edit User' : 'New User'"
        :visible="showAddUserDialog"
        modal
      >
        <partner-user-form
          v-if="showAddUserDialog"
          :edit-user="editUserId"
          :partner-id="partnerId"
          @cancel="formCancel()"
          @success="formSuccess($event)"
        />
      </el-dialog>
    </table-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ServerTable from '~/components/Tables/ServerTable'
import TableActions from '~/components/Tables/TableActions'
import PartnerUserForm from '~/components/Content/Partner/PartnerUserForm'

const tableHeaders = [
  {
    label: 'Username',
    field: 'username'
  },
  {
    label: 'User Type',
    field: 'admin'
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'PartnerUsersTable',
  components: { PartnerUserForm, TableActions, ServerTable },
  props: {
    partnerId: {
      type: Number,
      required: true
    }
  },
  data () {
    const tableActions = [
      {
        label: 'Edit',
        icon: 'tim-icons icon-pencil text-primary',
        on: {
          click: (row) => {
            this.editUserId = parseInt(row.id)
            this.showAddUserDialog = true
          }
        }
      },
      {
        label: 'Delete',
        icon: 'tim-icons icon-simple-remove text-danger',
        on: {
          click: async (row) => {
            const confirmed = await this.$confirm('Delete partner\'s user.', 'Confirm Delete', { type: 'warning' })
              .catch(() => false)

            if (!confirmed) { return }

            await this.deletePartnerUser({
              partnerId: this.partnerId,
              userId: row.id
            })
            this.reloadTable()
          }
        }
      }
    ]

    return {
      tableHeaders,
      tableActions,
      showAddUserDialog: false,
      editUserId: null
    }
  },
  methods: {
    ...mapActions({
      deletePartnerUser: 'partner-user/delete'
    }),
    addUser () {
      this.showAddUserDialog = true
    },
    formSuccess (data) {
      this.showAddUserDialog = false
      this.editUserId = null

      this.$notify({
        type: 'success',
        message: `User ${data.username} has been saved.`
      })

      this.reloadTable()
    },
    formCancel () {
      this.showAddUserDialog = false
      this.editUserId = null
    },
    reloadTable () {
      this.$refs.userTable.loadData()
    }
  }
}
</script>

<style scoped>

</style>
