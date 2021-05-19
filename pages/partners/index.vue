<template>
  <div>
    <table-card title="Partners">
      <p>
        Manage partners information.
      </p>
      <ServerTable ref="serverTable" :headers="headers" :query-params="queryParams" url="/api/partners">
        <template #item_name="{row: {id},value}">
          <nuxt-link :to="`/partners/${id}`">{{ value }}</nuxt-link>
        </template>
        <template #item_actions="{row}">
          <TableActions :actions="tableActions" :data="row"/>
        </template>
      </ServerTable>
    </table-card>
    <card>
      <base-button type="primary" @click="addPartner()">New Partner</base-button>
      <el-dialog :before-close="beforeModalClose" :visible.sync="showCreateDialog">
        <template #title>
          {{ editPartnerId === null ? 'New' : 'Edit' }} Partner
        </template>
        <PartnerForm v-if="showCreateDialog" :partner-id="editPartnerId" @cancel="partnerCancel()"
                     @success="partnerSaved"></PartnerForm>
      </el-dialog>
    </card>
  </div>
</template>

<script>
import ServerTable from "~/components/Tables/ServerTable";
import {defaultDateTimeFormat} from "~/util/utilities";
import TableActions from "~/components/Tables/TableActions";
import {Dialog} from 'element-ui'
import PartnerForm from "~/components/Content/Partner/PartnerForm";
import TableActionButton from "~/components/Tables/TableActionButton";
import {mapActions} from 'vuex'
import alertsMixin from "~/mixins/alerts";

const headers = [
  {
    field: 'name',
    label: 'Name',
  },
  {
    field: 'email',
    label: 'Email',
  },
  {
    field: 'contact',
    label: 'Contact Person',
  },
  {
    field: 'contact_number',
    label: 'Contact No.',
  },
  {
    field: 'created_at',
    label: 'Date Added',
    formatValue: (value) => defaultDateTimeFormat(value)
  },
  {
    field: 'actions',
    label: 'Actions',
  }
]

export default {
  components: {TableActionButton, PartnerForm, TableActions, ServerTable: ServerTable, [Dialog.name]: Dialog},
  mixins: [alertsMixin],
  data() {
    const tableActions = [
      {
        label: 'Edit',
        icon: 'tim-icons icon-pencil text-primary',
        on: {
          click: ({id}) => {
            this.editPartnerId = id
            this.showCreateDialog = true
          }
        }
      },
      {
        label: 'Delete',
        icon: 'tim-icons icon-simple-remove text-danger',
        on: {
          click: this.confirmDelete
        }
      }
    ]

    return {
      headers,
      tableActions,
      queryParams: {},
      showCreateDialog: false,
      editPartnerId: null
    }
  },
  mounted() {
    this.$root.$on('search-submitted', (search) => {
      this.$set(this.queryParams, 'search', search)
    })
  },
  methods: {
    ...mapActions({
      deletePartner: 'partner/delete'
    }),
    addPartner() {
      this.showCreateDialog = !this.showCreateDialog
    },
    async confirmDelete(row) {
      const confirmed = await this.$confirm('Do you want to DELETE partner?').catch(() => false)
      if (!confirmed) {
        return
      }

      try {
        await this.deletePartner(row.id)
        this.reloadTable()
        this.$notify({
          type: 'success',
          message: 'Partner has been deleted.'
        })
      } catch (e) {
        this.showRequestErrorMessage()
      }
    },
    reloadTable() {
      this.$refs['serverTable'].loadData()
    },
    partnerSaved({id, name}) {
      this.reloadTable()
      this.showCreateDialog = false

      if (!this.editPartnerId) {
        this.$confirm(`Do you want to add branch for ${name}?`)
            .then(() => {
              this.$router.push({
                path: `/partners/${id}/branches`,
                query: {
                  add: 1
                }
              })
            })
            .catch(() => {
            })
      }

      this.editPartnerId = null
    },
    beforeModalClose(done) {
      this.editPartnerId = null
      done()
    },
    partnerCancel() {
      this.showCreateDialog = false
      this.editPartnerId = null
    }
  },
  head() {
    return {
      title: 'Partners'
    }
  }
}
</script>
