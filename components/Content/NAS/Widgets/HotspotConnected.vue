<template>
  <card>
    <div class="d-flex align-content-start">
      <h5>Hotspot Active</h5>
      <div class="mx-auto" />
      <a href="" :class="{'text-muted': !loading, 'text-info': loading}" @click.prevent="$fetch()">
        <i class="fas fa-sync" :class="{'fa-spin':loading}" />
      </a>
    </div>
    <div class="table-responsive">
      <table v-loading="loading" class="table table-sm table-hover">
        <thead>
          <tr>
            <th>User</th>
            <th>Address</th>
            <th>Uptime</th>
            <th>Session-time-left idle-timeout</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(data,index) in tableData" :key="index">
              <td>{{ data['user'] }}</td>
              <td>{{ data['address'] }}</td>
              <td>{{ data['uptime'] }}</td>
              <td>{{ data['session-time-left idle-timeout'] }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4">
                <p class="font-italic">
                  No Information yet.
                </p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </card>
</template>

<script>
import intervals from '~/mixins/intervals'

export default {
  name: 'HotspotConnected',
  mixins: [intervals],
  props: {
    nasId: {
      type: Number,
      required: true
    },
    accessPointId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  fetch () {
    this.loading = true
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/hotspot-connected`)
      .then(({ data }) => {
        this.tableData = data
      })
      .catch(() => null)
      .finally(() => {
        this.loading = false
      })
  },
  watch: {
    accessPointId () {
      this.$fetch()
    },
    nasId () {
      this.$fetch()
    }
  },
  mounted () {
    this.setInterval(this.$fetch, 10000)
  }
}
</script>
