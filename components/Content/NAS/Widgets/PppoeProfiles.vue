<template>
  <card>
    <div class="d-flex align-content-start">
      <h5>PPPoE Profiles</h5>
      <div class="mx-auto" />
      <a href="" :class="{'text-muted': !loading, 'text-info': loading}" title="refresh " @click.prevent="$fetch()">
        <i class="fas fa-sync" :class="{'fa-spin':loading}" />
      </a>
    </div>
    <div class="table-responsive">
      <table v-loading="loading" class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Bridge Learning</th>
            <th>Esu MPLS</th>
            <th>Use compression</th>
            <th>Use encryption</th>
            <th>Only one</th>
            <th>Change TCP MSS</th>
            <th>Use uPNP</th>
            <th>Address list</th>
            <th>Dns server</th>
            <th>on-up</th>
            <th>on-down</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(data,index) in tableData" :key="index">
              <td>{{ data['name'] }}</td>
              <td>{{ data['bridge-learning'] }}</td>
              <td>{{ data['use-mpls'] }}</td>
              <td>{{ data['use-compression'] }}</td>
              <td>{{ data['use-encryption'] }}</td>
              <td>{{ data['only-one'] }}</td>
              <td>{{ data['change-tcp-mss'] }}</td>
              <td>{{ data['use-upnp'] }}</td>
              <td>{{ data['address-list'] }}</td>
              <td>{{ data['dns-server'] }}</td>
              <td>{{ data['on-up'] }}</td>
              <td>{{ data['on-down'] }}</td>
              <td>{{ data['default'] }}</td>
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
import alerts from '~/mixins/alerts'

export default {
  name: 'PppoeProfiles',
  mixins: [alerts],
  props: {
    nasId: {
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
    this.$axios.$get(`/api/nas/${this.nasId}/pppoe-profiles`)
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
  }
}
</script>
