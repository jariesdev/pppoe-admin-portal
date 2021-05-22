<template>
  <card>
    <h5>System Information</h5>
    <ul v-if="tableData.length > 0" class="list-unstyled">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>Uptime: <strong>{{ data['uptime'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Version: <strong>{{ data['version'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Build time: <strong>{{ data['build-time'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Factory software: <strong>{{ data['factory-software'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Free memory: <strong>{{ formatSizeInBytes(data['free-memory']) }}</strong></p>
          </div>
          <div class="col-6">
            <p>Total memory: <strong>{{ formatSizeInBytes(data['total-memory']) }}</strong></p>
          </div>
          <div class="col-6">
            <p>CPU: <strong>{{ data['cpu'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>CPU count: <strong>{{ data['cpu-count'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>CPU frequency: <strong>{{ formatHertz(data['cpu-frequency']) }}</strong></p>
          </div>
          <div class="col-6">
            <p>CPU load: <strong>{{ data['cpu-load'] }}%</strong></p>
          </div>
          <div class="col-6">
            <p>Free hdd space: <strong>{{ formatSizeInBytes(data['free-hdd-space']) }}</strong></p>
          </div>
          <div class="col-6">
            <p>Total hdd space: <strong>{{ formatSizeInBytes(data['total-hdd-space']) }}</strong></p>
          </div>
          <div class="col-6">
            <p>Write sector since-reboot: <strong>{{ data['write-sect-since-reboot'] | formatNumber }}</strong></p>
          </div>
          <div class="col-6">
            <p>write sector total: <strong>{{ data['write-sect-total'] | formatNumber }}</strong></p>
          </div>
          <div class="col-6">
            <p>Bad blocks: <strong>{{ data['bad-blocks'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Architecture name: <strong>{{ data['architecture-name'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Board name: <strong>{{ data['board-name'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Platform: <strong>{{ data['platform'] }}</strong></p>
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
  name: 'SystemInformation',
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
    this.$axios.$get(`/api/nas/${this.nasId}/system-info`)
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
