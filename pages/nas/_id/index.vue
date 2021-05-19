<template>
  <div>
    <NasInfo :nas-id="nasId"/>
    <card>
      <template #header>
        <div class="d-flex">
          <h4 class="card-title">Access Points</h4>
          <div class="mx-auto" />
          <a class="btn btn-sm btn-info" href="" @click.prevent="addAccessPoint()" title="Add Access point">
            <i slot="title" class="el-icon-plus"></i>
          </a>
        </div>
      </template>
      <AccessPointTable ref="accessPointTable" :nas-id="nasId">
        <template #empty>
          <span>No access point yet. <a href="" @click.prevent="visibleAPFormDialog=true">Click here</a> to add.</span>
        </template>
        <template slot="item_ap_address" slot-scope="{row,value}">
          <slot :row="row" :value="value" name="item_ap_address">
            <nuxt-link :to="`/nas/${nasId}/access-points/status?id=${row.id}`">{{ value }}</nuxt-link>
          </slot>
        </template>
        <template #table_actions="{row,actions}">
          <TableActions :data="row" :actions="[].concat(tableActions, actions)" />
        </template>
      </AccessPointTable>
      <div class="d-flex">
        <div class="mr-auto"/>
        <el-dialog :before-close="accessPointDialogBeforeClose" :visible="visibleAPFormDialog">
          <template #title>
            {{ editAccessPointId !== null ? 'Edit' : 'New' }} Access Point
          </template>
          <AccessPointForm v-if="visibleAPFormDialog" :access-point="editAccessPointId" :nas-id="nasId"
                           @cancel="accessPointFormCancel()"
                           @success="accessPointFormSuccess"/>
        </el-dialog>
      </div>
    </card>
    <div>
      <base-button @click="$router.back()">Cancel</base-button>
    </div>
  </div>
</template>
<script>
import NasInfo from "~/components/Content/NAS/NasInfo";
import AccessPointTable from "~/components/Content/NAS/AccessPoint/AccessPointTable";
import AccessPointForm from "~/components/Content/NAS/AccessPoint/AccessPointForm";
import TableActions from "~/components/Tables/TableActions";

export default {
  components: {TableActions, AccessPointForm, AccessPointTable, NasInfo},
  data() {
    const tableActions = [
      {
        label: 'Edit',
        icon: 'tim-icons icon-pencil',
        on: {
          click: (row) => {
            this.editAccessPoint(row)
          }
        }
      }
    ]

    return {
      nasId: null,
      visibleAPFormDialog: false,
      editAccessPointId: null,
      tableActions
    }
  },
  created() {
    this.nasId = +this.$route.params.id
  },
  methods: {
    addAccessPoint() {
      this.visibleAPFormDialog = true
    },
    accessPointFormSuccess() {
      this.visibleAPFormDialog = false
      this.$refs['accessPointTable'].reloadTable()
    },
    editAccessPoint({id}) {
      this.editAccessPointId = +id
      this.visibleAPFormDialog = true
    },
    accessPointDialogBeforeClose(done) {
      this.visibleAPFormDialog = false
      this.editAccessPointId = null
      done()
    },
    accessPointFormCancel() {
      this.visibleAPFormDialog = false
      this.editAccessPointId = null
    }
  },
  head() {
    return {
      title: 'NAS Details'
    }
  }
}
</script>
