<template>
  <card>
    <h5>Radius Server</h5>
    <ul v-if="tableData.length > 0" class="list-unstyled">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>Service: <strong>{{ data['service'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Called id: <strong>{{ data['called-id'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Domain: <strong>{{ data['domain'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Address: <strong>{{ data['address'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Secret: <strong>{{ data['secret'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Authentication-port: <strong>{{ data['authentication-port'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Accounting-port: <strong>{{ data['accounting-port'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Timeout: <strong>{{ data['timeout'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Accounting-backup: <strong>{{ data['accounting-backup'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Realm: <strong>{{ data['realm'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Protocol: <strong>{{ data['protocol'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Certificate: <strong>{{ data['certificate'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Disabled: <strong>{{ data['disabled'] }}</strong></p>
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
const numeral = require('numeral')

export default {
  name: 'RadiusSetup',
  props: {
    nasId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  fetch () {
    this.$axios.$get(`/api/nas/${this.nasId}/radius-server`)
      .then(({ data }) => {
        this.tableData = data
      })
      .catch(() => null)
  },
  watch: {
    accessPointId () {
      this.$fetch()
    },
    nasId () {
      this.$fetch()
    }
  },
  methods: {
    formatSpeedInBytes (value) {
      return this.formatUnit(value, 'iB')
    },
    formatSizeInBytes (value) {
      return this.formatUnit(value, 'B')
    },
    formatHertz (value) {
      return this.formatUnit(value, 'hz')
    },
    formatUnit (value, unit) {
      if (!value) {
        return 0 + ' ' + unit
      }
      const digitCount = String(value).length
      const newBytes = Number(value) / Math.pow(10, Math.floor(digitCount / 4) * 3)

      const suffix = [unit, 'K' + unit, 'M' + unit, 'G' + unit, 'T' + unit, 'P' + unit]
      const suffixIndex = Math.floor(digitCount / 4)
      if (newBytes > 1000) {
        return numeral(newBytes).format('0,0.00') + ' ' + suffix[suffixIndex]
      } else {
        return numeral(newBytes).format('0,0') + ' ' + suffix[suffixIndex]
      }
    }
  }
}
</script>
