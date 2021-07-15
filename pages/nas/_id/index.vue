<template>
  <div>
    <NasInfo :nas-id="nasId" />
    <div>
      <base-button @click="$router.back()">
        Cancel
      </base-button>
    </div>
  </div>
</template>
<script>
import NasInfo from '~/components/Content/NAS/NasInfo'

/**
 * @todo add PPPoE profiles checkboxes
 */
export default {
  components: { NasInfo },
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
