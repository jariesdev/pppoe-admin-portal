<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane name="details" label="Details">
        <NasInfo :nas-id="nasId" />
      </el-tab-pane>
      <el-tab-pane name="pppoe-profiles" label="PPPoE Profiles">
        <NasProfiles :nas-id="nasId" />
      </el-tab-pane>
    </el-tabs>
    <div>
      <base-button @click="$router.back()">
        Cancel
      </base-button>
    </div>
  </div>
</template>
<script>
import NasInfo from '~/components/Content/NAS/NasInfo'
import NasProfiles from '~/components/Content/NAS/Widgets/NasProfiles'

/**
 * @todo add PPPoE profiles checkboxes
 */
export default {
  components: { NasProfiles, NasInfo },
  data () {
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
      activeTab: 'details',
      nasId: null,
      visibleAPFormDialog: false,
      editAccessPointId: null,
      tableActions
    }
  },
  head () {
    return {
      title: 'NAS Details'
    }
  },
  created () {
    this.nasId = +this.$route.params.id
  },
  methods: {
    addAccessPoint () {
      this.visibleAPFormDialog = true
    },
    accessPointFormSuccess () {
      this.visibleAPFormDialog = false
      this.$refs.accessPointTable.reloadTable()
    },
    editAccessPoint ({ id }) {
      this.editAccessPointId = +id
      this.visibleAPFormDialog = true
    }
  }
}
</script>
