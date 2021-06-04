<template>
  <card>
    <div class="d-flex align-content-start">
      <h5>CAPS Man</h5>
      <div class="mx-auto" />
      <a href="" :class="{'text-muted': !loading, 'text-info': loading}" @click.prevent="$fetch()">
        <i class="fas fa-sync" :class="{'fa-spin':loading}" />
      </a>
    </div>
    <ul v-if="tableData.length > 0" v-loading="loading" class="list-unstyled">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>
              ID: <strong>{{ data['.id'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Interface: <strong>{{ data['interface'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              SSID: <strong>{{ data['ssid'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              MAC Address: <strong>{{ data['mac-address'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Tx rate: <strong>{{ data['tx-rate'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Rx rate: <strong>{{ data['rx-rate'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Rx signal: <strong>{{ data['rx-signal'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Uptime: <strong>{{ data['uptime'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Packets: <strong>{{ data['packets'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Bytes: <strong>{{ data['bytes'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Tx rate-set: <strong>{{ data['tx-rate-set'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              EAP identity: <strong>{{ data['eap-identity'] }}</strong>
            </p>
          </div>
        </div>
      </li>
    </ul>
    <p v-else class="font-italic">
      No Information yet.
    </p>
  </card>
</template>

<script>
import { filter } from 'lodash'
import intervals from '~/mixins/intervals'

export default {
  name: 'CapsMan',
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
      tableData: [],
      loading: false
    }
  },
  fetch () {
    this.loading = true
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/caps-man`)
      .then(({ data }) => {
        this.tableData = filter(data || [], (o) => {
          return o !== null
        })
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
