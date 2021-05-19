<template>
  <card><div class="d-flex align-content-start">
    <h5>Hotspot Active</h5>
    <div class="mx-auto" />
    <a href="" @click.prevent="$fetch()" :class="{'text-muted': !loading, 'text-info': loading}">
      <i class="fas fa-sync" :class="{'fa-spin':loading}"></i>
    </a>
  </div>
    <div class="table-responsive">
      <table class="table table-sm table-hover" v-loading="loading">
        <thead>
        <tr>
          <th>User</th>
          <th>Address</th>
          <th>Uptime</th>
          <th>Session-time-left idle-timeout</th>
        </tr>
        </thead>
        <tbody>
        <template v-if="tableData.length > 0" >
          <tr v-for="data in tableData">
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
import intervals from "~/mixins/intervals";

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
  fetch() {
    this.loading = true
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/hotspot-connected`)
        .then(({data}) => {
          this.tableData = data
        })
        .catch(() => null)
        .finally(() => {
          this.loading = false
        })
  },
  data() {
    return {
      loading: false,
      tableData: []
    }
  },
  watch: {
    accessPointId(){
      this.$fetch()
    },
    nasId(){
      this.$fetch()
    }
  },
  mounted() {
    this.setInterval(this.$fetch, 10000)
  }
}
</script>
