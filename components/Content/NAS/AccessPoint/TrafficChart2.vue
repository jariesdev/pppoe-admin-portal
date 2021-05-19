<template>
  <card type="chart">
    <template slot="header">
      <div class="d-md-flex d-block">
        <h4 class="card-title">
          Traffic (Gbps)
          <i :class="{'text-success': loading}" :style="{fontSize: '8px'}" class="fas fa-circle"/>
        </h4>
        <div class="mx-auto"/>
        <div class="d-flex align-items-center">
          <span class="mr-2">Select Ethernet:</span>
          <el-select v-model="selectedEthernet" size="mini">
            <el-option v-for="ethernet in availableEthernetOptions"
                       :key="ethernet.value"
                       :label="ethernet.label"
                       :value="ethernet.value"/>
          </el-select>
        </div>
      </div>
    </template>
    <div class="chart-area">
        <line-chart
            :chart-data="chartData"
            :extra-options="chartOptions"
            :gradient-colors="purpleLineChart.gradientColors"
            :gradient-stops="purpleLineChart.gradientStops"
            :style="{height: '100%'}"/>
    </div>
  </card>
</template>
<script>
import {forEach, map, throttle} from 'lodash'
import LineChart from '@/components/Charts/LineChart'
import config from '@/config'
import {basicOptions} from '@/components/Charts/config'
import intervals from "~/mixins/intervals";

const chartOptions = {
  ...basicOptions,
  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: 'nearest',
    intersect: 0,
    position: 'nearest'
  },
  scales: {
    yAxes: [
      {
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.0)',
          zeroLineColor: 'transparent'
        },
        ticks: {
          beginAtZero: true,
          // suggestedMin: 0,
          // suggestedMax: 125,
          padding: 20,
          fontColor: '#9a9a9a'
        }
      }
    ],

    xAxes: [
      {
        type: 'time',
        distribution: 'series',
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(225,78,202,0.1)',
          zeroLineColor: 'transparent'
        },
        ticks: {
          padding: 20,
          fontColor: '#9a9a9a'
        }
      }
    ]
  }
}

export default {
  name: 'TrafficChart2',
  components: {LineChart},
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
  data() {
    return {
      loading: false,
      ethernetData: [],
      maxTrafficDataStack: 10,
      chartOptions,
      basicOptions,
      purpleLineChart: {
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      selectedEthernet: null
    }
  },
  async fetch() {
    await this.loadData()
  },
  computed: {
    availableEthernetOptions() {
      if (this.ethernetData.length === 0) {
        return []
      }

      return map(this.ethernetData[0], (o) => {
        return {
          label: o.name + ' (' + o['default-name'] + ')',
          value: o['.id']
        }
      })
    },
    selectedEthernetData() {
      if (this.selectedEthernet === null || this.ethernetData.length === 0) return []

      const data = []
      forEach(this.ethernetData, ethernets => {
        forEach(ethernets, ethernet => {
          if (ethernet['.id'] === this.selectedEthernet) {
            data.push(ethernet)
          }
        })
      })
      return data
    },
    chartData() {
      let labels;
      if (this.ethernetData.length !== 0) {
        labels = map(this.ethernetData, (data) => {
          const hours = data[0].response_time.getHours()
          const minutes = data[0].response_time.getMinutes()
          const seconds = data[0].response_time.getSeconds()
          return [hours, String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')].join(':')
        })
      } else {
        labels = []
      }
      return {
        labels,
        datasets: this.getDatasets()
      }
    }
  },
  watch: {
    accessPointId() {
      this.$nextTick(this.loadData)
    },
    nasId() {
      this.$nextTick(this.loadData)
    }
  },
  mounted() {
    const throttleFunc = throttle(this.loadData, '1000')
    this.setInterval(throttleFunc, 1000)
  },
  methods: {
    async loadData() {
      this.loading = true
      try {
        const {data} = await this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/ethernet-graph`)
        const dataWithTime = map(data || [], (object) => {
          object.response_time = new Date()
          return object
        })

        if (this.ethernetData.length === 0) {
          this.selectedEthernet = data[0]['.id']
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
    getDatasets() {
      if (this.selectedEthernetData.length === 0) return []
      const data = this.selectedEthernetData

      const ethernetTxDs = {
        label: data[0].name + ' Transfer Rate (Gbps)',
        fill: true,
        borderColor: config.colors.orange,
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: config.colors.orange,
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: config.colors.orange,
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: map(data, d => Number(d['tx-bytes'] / Math.pow(10, 9)).toFixed(0))
      }
      const ethernetRxDs = {
        label: data[0].name + ' Receive Rate (Gbps)',
        fill: true,
        borderColor: config.colors.primary,
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: config.colors.primary,
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: config.colors.primary,
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: map(data, d => Number(d['rx-bytes'] / Math.pow(10, 9)).toFixed(0))
      }

      return [ethernetTxDs, ethernetRxDs]
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-area {
  position: relative;
  height: 250px;

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
