<template>
  <card>
    <div class="d-flex align-content-start">
      <h5>Wired Interface</h5>
      <div class="mx-auto" />
      <a :class="{'text-muted': !loading, 'text-info': loading}" href="" @click.prevent="$fetch()">
        <i :class="{'fa-spin':loading}" class="fas fa-sync" />
      </a>
    </div>
    <div class="table-responsive">
      <table v-loading="loading" class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Mac address</th>
            <th>Client id</th>
            <th>Server</th>
            <th>Expires after</th>
            <th>Last seen</th>
            <th>Src mac address</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(data,index) in tableData" :key="index">
              <td>
                {{ data['address'] }}
              </td>
              <td>{{ data['mac-address'] }}</td>
              <td>{{ data['client-id'] || '-' }}</td>
              <td>{{ data['server'] }}</td>
              <td>{{ data['expires-after'] }}</td>
              <td>{{ data['last-seen'] }}</td>
              <td>{{ data['src-mac-address'] || '-' }}</td>
            </tr>
          </template>
          <template v-else>
            <p class="font-italic">
              No Information yet.
            </p>
          </template>
        </tbody>
      </table>
    </div>
  </card>
</template>

<script>
import intervals from '~/mixins/intervals'

export default {
  name: 'DhcpConnected',
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
    this.$axios.$get(`/api/nas/${this.nasId}/dhcp-connected`)
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
