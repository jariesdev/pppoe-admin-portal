<template>
  <card type="chart">
    <template slot="header">
      <div class="d-md-flex d-block">
        <h4 class="card-title">
          Traffic (mbps)
          <i :class="{'text-success': loading}" :style="{fontSize: '8px'}" class="fas fa-circle" />
        </h4>
        <div class="mx-auto" />
        <div
          class="btn-group btn-group-toggle"
          data-toggle="buttons"
        >
          <label
            :class="{ active: showTransferRate }"
            class="btn btn-sm btn-primary btn-simple"
          >
            <input
              :checked="showTransferRate"
              autocomplete="off"
              name="options"
              type="radio"
              @click="showTransferRate=!showTransferRate"
            >
            <span class="d-none d-sm-block">Tx Rate</span>
            <span class="d-block d-sm-none">
              <i class="icon-cloud-upload-94" />
            </span>
          </label><label
            :class="{ active: !showTransferRate }"
            class="btn btn-sm btn-primary btn-simple"
          >
            <input
              :checked="showTransferRate"
              autocomplete="off"
              name="options"
              type="radio"
              @click="showTransferRate=!showTransferRate"
            >
            <span class="d-none d-sm-block">Rx Rate</span>
            <span class="d-block d-sm-none">
              <i class="icon-cloud-upload-94" />
            </span>
          </label>
        </div>
      </div>
    </template>
    <div class="chart-area">
      <client-only>
        <line-chart
          :chart-data="chartData"
          :extra-options="chartOptions"
          :gradient-colors="purpleLineChart.gradientColors"
          :gradient-stops="purpleLineChart.gradientStops"
          style="height: 100%"
        />
      </client-only>
    </div>
  </card>
</template>
<script>
import { get, map, throttle } from 'lodash'
import LineChart from '~/components/Charts/LineChart'
import config from '~/config'
import { basicOptions } from '~/components/Charts/config'
import intervals from '~/mixins/intervals'

const numeral = require('numeral')

const formatUnit = function (value, unit) {
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
          suggestedMin: 60,
          suggestedMax: 125,
          padding: 20,
          fontColor: '#9a9a9a'
        }
      }
    ],

    xAxes: [
      {
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
  name: 'TrafficChart',
  components: { LineChart },
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
      ethernetData: [],
      showTransferRate: true,
      maxTrafficDataStack: 10,
      chartOptions,
      purpleLineChart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Data',
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
              data: []
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      }
    }
  },
  async fetch () {
    this.loading = true
    try {
      const { data } = await this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/ethernet-graph`)
      const dataWithTime = map(data || [], (o) => {
        o.response_time = new Date()
        return o
      })
      this.ethernetData.push(dataWithTime)

      if (this.ethernetData.length > this.maxTrafficDataStack) {
        this.ethernetData.splice(0, 1)
      }
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
  computed: {
    chartData () {
      const labels = map(this.transposedEthernetData[0] || [], (data) => {
        const hours = data.response_time.getHours()
        const minutes = data.response_time.getMinutes()
        const seconds = data.response_time.getSeconds()
        return [hours, String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')].join(':')
      })
      return {
        labels,
        datasets: this.getDatasets()
      }
    },
    eachEthernetDataCount () {
      return this.ethernetData.length === 0 ? 0 : this.ethernetData[0].length
    },
    transposedEthernetData () {
      return this.ethernetData.length === 0 ? [] : this.ethernetData[0].map((_, colIndex) => this.ethernetData.map(row => row[colIndex]))
    }
  },
  watch: {
    accessPointId () {
      this.$fetch()
    },
    nasId () {
      this.$fetch()
    }
  },
  created () {
    this.$set(this.chartOptions, 'scales.yAxes.0.ticks.callback', function (label, index, labels) {
      return label + ' mb/s'
    })
  },
  mounted () {
    const throttleFunc = throttle(this.$fetch, '1000')
    this.setInterval(throttleFunc, 15000)
  },
  methods: {
    getDatasets () {
      return map(this.transposedEthernetData, (ethernetData) => {
        const values = map(ethernetData, (d) => {
          if (this.showTransferRate) {
            return Number(d['tx-bytes'] / Math.pow(10, 6)).toFixed(2)
          } else {
            return Number(d['rx-bytes'] / Math.pow(10, 6)).toFixed(2)
          }
          // return {
          //   x: Number(d['tx-bytes'] / Math.pow(10, 6)),
          //   y: Number(d['rx-bytes']/ Math.pow(10, 6))
          // }
        })
        return {
          label: ethernetData[0].name + (this.showTransferRate ? ' Tx' : ' Rx'),
          fill: true,
          borderColor: config.colors.primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: this.showTransferRate ? config.colors.orange : config.colors.primary,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: this.showTransferRate ? config.colors.orange : config.colors.primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: values
        }
      })
    }
  }
}
</script>
