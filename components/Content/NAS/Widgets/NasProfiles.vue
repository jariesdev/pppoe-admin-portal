<template>
  <div>
    <card title="NAS Profiles">
      <el-table
        ref="nasProfileTable"
        :data="bandwidthProfiles"
        empty-text="No available PPPoE profile."
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" column-key="id" />
        <el-table-column label="Name" prop="name" />
        <el-table-column label="Rate Limit" prop="rate_limit" />
      </el-table>
    </card>
  </div>
</template>
<script>
import { debounce, intersectionWith, map } from 'lodash'
import { mapState } from 'vuex'

export default {
  name: 'NasProfiles',
  props: {
    nasId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      nasProfiles: [],
      loading: false,
      visibleProfileSelection: false,
      selectedBandwidthProfiles: []
    }
  },
  async fetch () {
    this.loading = true
    const p1 = await this.$store.dispatch('bandwidth-profile/load')
    const p2 = await this.$axios.$get(`/api/nas/${this.nasId}/pppoe-profiles`)
      .then(({ data }) => data)
      .catch(_ => [])

    Promise.all([
      p1,
      p2
    ]).then(([_, r2]) => {
      this.nasProfiles = r2
      this.setSelectedRows()
    })
      .finally(() => {
        this.loading = false
      })
  },
  mounted () {
    this.$fetch()
    this.debounceSaveBandwithProfiles = debounce(this.saveBandwidthProfiles, '500', { maxWait: 1000 })
  },
  computed: {
    ...mapState({
      bandwidthProfiles: state => state['bandwidth-profile'].bandwidthProfiles || []
    })
  },
  methods: {
    showProfileSelection () {
      this.visibleProfileSelection = true
    },
    saveBandwidthProfiles () {
      this.$axios.$post(`/api/nas/${this.nasId}/pppoe-profiles`, {
        bandwidth_profile_id: map(this.selectedBandwidthProfiles, o => o.id)
      })
    },
    handleSelectionChange (value) {
      this.selectedBandwidthProfiles = value

      this.debounceSaveBandwithProfiles()
    },
    setSelectedRows () {
      if (!this.$refs.nasProfileTable) { return }

      const selectedRows = intersectionWith(this.bandwidthProfiles, this.nasProfiles, (bp, np) => bp.name === np.name)
      for (let i = 0; i < selectedRows.length; i++) {
        this.$refs.nasProfileTable.toggleRowSelection(selectedRows[i])
      }
    }
  }
}
</script>
