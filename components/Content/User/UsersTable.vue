<template>
  <div>
    <table-card title="Users">
      <p>
        Manage users/employees who access the system.
      </p>
      <ServerTable ref="serverTable" :headers="tableHeaders" :query-params="queryParams" url="/api/employees">
        <template #name="{row,value}">
          {{ value }} <sup v-show="isCurrentUser(row)">(You)</sup>
        </template>
        <template #actions="{row}">
          <TableActions :actions="tableActions" :data="row" />
        </template>
      </ServerTable>
    </table-card>
    <card>
      <div>
        <base-button type="primary" @click="showUserFormDialog()">
          New User
        </base-button>
      </div>
      <el-dialog :before-close="userFormBeforeClose" :visible.sync="visibleUserFormDialog" destroy-on-close>
        <template #title>
          {{ editUserId === null ? 'New' : 'Edit' }} User
        </template>
        <UserForm
          v-if="visibleUserFormDialog"
          :edit-user="editUserId"
          @cancel="userFormCancel"
          @success="userFormSuccess"
        />
      </el-dialog>
    </card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ServerTable from '~/components/Tables/ServerTable'
import { dateTimeFormat } from '~/util/utilities'
import UserForm from '~/components/Content/User/UserForm'
import TableActions from '~/components/Tables/TableActions'
import alerts from '~/mixins/alerts'

const tableHeaders = [
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Username',
    field: 'username'
  },
  {
    label: 'Date Added',
    field: 'created_at',
    formatValue: value => dateTimeFormat(value)
  },
  {
    label: 'Actions',
    field: 'actions'
  }
]

export default {
  name: 'UsersTable',
  components: {
    TableActions,
    UserForm,
    ServerTable
  },
  mixins: [alerts],
  data () {
    const tableActions = [
      {
        label: 'Edit',
        icon: 'tim-icons icon-pencil',
        on: {
          click: ({ id }) => {
            if (this.$auth.user.id === id) {
              this.$router.push('/user')
            }
            this.editUserId = id
            this.showUserFormDialog()
          }
        }
      },
      {
        label: 'Delete',
        icon: 'tim-icons icon-simple-remove text-danger',
        disabled: ({ id }) => this.$auth.user.id === id,
        on: {
          click: async ({ id }) => {
            const confirmed = await this.$confirm(
              'You are about to permanently delete user, continue?',
              'Delete User?',
              { type: 'warning' }
            ).catch(() => false)
            if (!confirmed) {
              return
            }

            try {
              await this.deleteEmployee(id)
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
      visibleUserFormDialog: false,
      queryParams: {},
      editUserId: null
    }
  },
  head () {
    return {
      title: 'Users'
    }
  },
  mounted () {
    this.$root.$on('search-submitted', (search) => {
      this.$set(this.queryParams, 'search', search)
    })
  },
  methods: {
    ...mapActions({
      deleteEmployee: 'employee/delete'
    }),
    userFormCancel () {
      this.visibleUserFormDialog = false
      this.editUserId = null
    },
    userFormBeforeClose (done) {
      this.editUserId = null
      done()
    },
    userFormSuccess () {
      this.userFormCancel()
      this.reloadTable()
    },
    reloadTable () {
      this.$refs.serverTable.loadData()
    },
    showUserFormDialog () {
      this.visibleUserFormDialog = true
    },
    isCurrentUser (user) {
      return user.id === this.$auth.user.id
    }
  }
}
</script>
