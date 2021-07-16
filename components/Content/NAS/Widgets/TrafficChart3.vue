<template>
  <card type="chart">
    <template slot="header">
      <div class="d-md-flex d-block">
        <h4 class="card-title">
          Traffic Monitor
          <i :class="{'text-success': loading}" :style="{fontSize: '8px'}" class="fas fa-circle" />
        </h4>
        <div class="mx-auto" />
        <div class="d-flex align-items-center">
          <span class="mr-2">Select Ethernet:</span>
          <el-select v-model="selectedEthernet" size="mini">
            <el-option
              v-for="ethernet in availableEthernetOptions"
              :key="ethernet.value"
              :label="ethernet.label"
              :value="ethernet.value"
            />
          </el-select>
        </div>
      </div>
    </template>
    <div class="chart-area">
      <highcharts ref="highcharts" :options="hcOptions" />
    </div>
    <div class="small font-italic px-3 text-muted d-flex">
      <span class="mr-2">
        Avg. Tx: <animated-number :value="getSpeedFormat(averageTx).value" class="font-weight-bold" /> {{ getSpeedFormat(averageTx).unit }}
      </span>
      <span class="mr-2">
        Avg. Rx: <animated-number :value="getSpeedFormat(averageRx).value" class="font-weight-bold" /> {{ getSpeedFormat(averageRx).unit }}
      </span>
      <span class="mr-2">
        Max link down <span title="Relative to current data">(rel.)</span>: <animated-number :value="maxLinkDown" class="font-weight-bold" />
      </span>
    </div>
  </card>
</template>
<script>
import { forEach, map, max, sumBy, throttle } from 'lodash'
import Highcharts from 'highcharts'
import { mapState } from 'vuex'
import intervals from '~/mixins/intervals'
import AnimatedNumber from '~/components/animatedNumber'

const numeral = require('numeral')

export default {
  name: 'TrafficChart3',
  components: { AnimatedNumber },
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
    const formatByteSpeed = this.formatByteSpeed
    const chartOptions = {
      colors: ['#fdda29', '#21d524', '#c92424'],
      chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        events: {
          load () { }
        }
      },
      line: {
        shadow: true
      },
      time: {
        useUTC: false
      },
      title: {
        text: 'Ethernet Traffic'
      },
      accessibility: {
        announceNewData: {
          enabled: true,
          minAnnounceInterval: 15000,
          announcementFormatter (allSeries, newSeries, newPoint) {
            if (newPoint) {
              return 'New point added. Value: ' + newPoint.y
            }
            return false
          }
        }
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Speed in bit/sec'
        },
        labels: {
          formatter () {
            return formatByteSpeed(this.value)
          }
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}',
        pointFormatter () {
          const date = new Date(this.x)
          return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` + `<br/>${formatByteSpeed(this.y)}`
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: []
    }

    return {
      loading: false,
      ethernetData: [],
      maxTrafficDataStack: 50,
      chartOptions,
      selectedEthernet: null
    }
  },
  async fetch () {
    await this.loadData()
  },
  computed: {
    ...mapState({
      isDarkMode: state => state.settings.darkMode
    }),
    availableEthernetOptions () {
      if (this.ethernetData.length === 0) {
        return []
      }

      return map(this.ethernetData[0], (o) => {
        return {
          label: o.name,
          value: o.name
        }
      })
    },
    selectedEthernetData () {
      if (this.selectedEthernet === null || this.ethernetData.length === 0) { return [] }

      const data = []
      forEach(this.ethernetData, (ethernets) => {
        forEach(ethernets, (ethernet) => {
          if (ethernet.name === this.selectedEthernet) {
            data.push(ethernet)
          }
        })
      })
      return data
    },
    averageTx () {
      if (this.selectedEthernetData.length === 0) { return 0 }
      return sumBy(this.selectedEthernetData, o => Number(o['tx-bits-per-second'])) / this.selectedEthernetData.length
    },
    averageRx () {
      if (this.selectedEthernetData.length === 0) { return 0 }
      return sumBy(this.selectedEthernetData, o => Number(o['rx-bits-per-second'])) / this.selectedEthernetData.length
    },
    maxLinkDown () {
      if (this.selectedEthernetData.length === 0) { return 0 }
      return max(map(this.selectedEthernetData, o => Number(o['link-downs'])))
    },
    chartSeries () {
      const data = this.selectedEthernetData

      return [
        {
          name: 'Tx Data',
          data: map(data, (d) => {
            return {
              x: d.response_time.getTime(),
              y: Number(d['tx-bits-per-second'])
            }
          })
        },
        {
          name: 'Rx Data',
          data: map(data, (d) => {
            return {
              x: d.response_time.getTime(),
              y: Number(d['rx-bits-per-second'])
            }
          })
        }
      ]
    },
    hcOptions () {
      const options = {
        ...this.chartOptions,
        series: this.chartSeries,
        gridLineColor: '#333'
      }
      options.title.style = { color: this.isDarkMode ? '#FFFFFF' : '#333333', fontSize: '18px' }
      options.yAxis.gridLineColor = this.isDarkMode ? '#333333' : '#e6e6e6'
      return options
    }
  },
  watch: {
    accessPointId () {
      this.clearData()
      this.$nextTick(this.loadData)
    },
    nasId () {
      this.clearData()
      this.$nextTick(this.loadData)
    }
  },
  mounted () {
    const throttledFunc = throttle(this.loadData, '1000')
    this.setInterval(throttledFunc, 5000)
  },
  methods: {
    async loadData () {
      this.loading = true
      try {
        const { data } = await this.$axios.$get(`/api/nas/${this.nasId}/ethernet-graph`)
        const dataWithTime = map(data || [], (object) => {
          object.response_time = new Date()
          return object
        })

        if (this.ethernetData.length === 0) {
          this.selectedEthernet = data[0].name
        }

        this.ethernetData.push(dataWithTime)

        if (this.ethernetData.length > this.maxTrafficDataStack) {
          this.ethernetData.splice(0, 1)
        }
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
    clearData () {
      this.ethernetData = []
    },
    formatByteSpeed (bits) {
      const n = bits
      const format = this.getSpeedFormat(n)
      return numeral(format.value).format('0,0.0') + ' ' + format.unit
    },
    getSpeedFormat (bits) {
      let n = Number(bits)
      if (n >= Math.pow(10, 9)) {
        n = Math.ceil(n / Math.pow(10, 9))
        return {
          value: n,
          unit: 'Gbps'
        }
      } else if (n >= Math.pow(10, 6)) {
        n = Math.ceil(n / Math.pow(10, 6))
        return {
          value: n,
          unit: 'Mbps'
        }
      } else if (n >= Math.pow(10, 3)) {
        n = Math.ceil(n / Math.pow(10, 3))
        return {
          value: n,
          unit: 'Kbps'
        }
      } else {
        return {
          value: n,
          unit: 'bps'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-area {
  position: relative;
  height: auto;

  ::v-deep {
    //.chartjs-size-monitor {
    //  display: none;
    //}
    //
    //.chartjs-render-monitor {
    //  animation: none !important;
    //}
  }
}
</style>
