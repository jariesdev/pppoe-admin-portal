<template>
  <card>
    <div class="d-flex">
      <h5>PPPoE Service</h5>
      <div class="mx-auto" />
      <el-popover popper-class="radius-server-settings-popper" width="250" title="Configurations">
        <el-button slot="reference" size="sm">
          <i class="tim-icons icon-settings-gear-63" />
        </el-button>
        <pppoe-service-settings :nas-id="nasId" />
      </el-popover>
    </div>
    <ul v-if="tableData.length > 0" class="list-unstyled">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>
              Service name: <strong>{{ data['service-name'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Interface: <strong>{{ data['interface'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Max MTU: <strong>{{ data['max-mtu'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Max MRU: <strong>{{ data['max-mru'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              MRRU: <strong>{{ data['mrru'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Authentication: <strong>{{ data['authentication'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Keepalive timeout: <strong>{{ data['keepalive-timeout'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              One-session-per-host: <strong>{{ data['one-session-per-host'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Max sessions: <strong>{{ data['max-sessions'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              PADO delay: <strong>{{ data['pado-delay'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Default profile: <strong>{{ data['default-profile'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Invalid: <strong>{{ data['invalid'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Disabled: <strong>{{ data['disabled'] }}</strong>
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
import PppoeServiceSettings from '~/components/Content/NAS/PppoeServiceSettings'

const numeral = require('numeral')

export default {
  name: 'PppoeService',
  components: { PppoeServiceSettings },
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
    this.$axios.$get(`/api/nas/${this.nasId}/pppoe-service`)
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

<style lang="scss">
.radius-server-settings-popper {
  .radius-server-settings {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }

    .el-form-item {
      margin-bottom: 10px;
    }

    .btn {
      padding: 5px 15px;
    }
  }
}
</style>
