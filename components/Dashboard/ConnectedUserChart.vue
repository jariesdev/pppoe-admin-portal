<template>
  <card title="Connected Users" type="chart">
    <div class="chart-area">
      <client-only>
        <line-chart
            :chart-data="chartData"
            :extra-options="chartOptions"
            :gradient-colors="greenLineChart.gradientColors"
            :gradient-stops="greenLineChart.gradientStops"
            style="height: 100%"
        >
        </line-chart>
      </client-only>
    </div>
  </card>
</template>
<script>
import {map, throttle} from 'lodash'
import LineChart from "~/components/Charts/LineChart";
import config from "~/config";
import * as chartConfigs from "~/components/Charts/config";
import intervals from "~/mixins/intervals";

const numeral = require('numeral')

const chartOptions = {
  ...chartConfigs.greenChartOptions, ...{
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
            suggestedMax: 50,
            padding: 20,
            fontColor: '#9e9e9e'
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: 'transparent'
          },
          ticks: {
            padding: 20,
            fontColor: '#9e9e9e'
          }
        }
      ]
    }
  }
}

export default {
  name: 'ConnectedUsersChart',
  components: {LineChart},
  mixins: [intervals],
  data() {
    return {
      loading: false,
      connectedUsers: [],
      maxTrafficDataStack: 30,
      chartOptions,
      greenLineChart: {
        gradientColors: [
          'rgba(66,134,121,0.15)',
          'rgba(66,134,121,0.0)',
          'rgba(66,134,121,0)'
        ],
        gradientStops: [1, 0.4, 0]
      },
    }
  },
  async fetch() {
    this.loading = true
    try {
      const {data} = await this.$axios.$get(`/api/connected-users`)
      this.connectedUsers.push({
        time: new Date,
        count: (data || []).length
      })

      if (this.connectedUsers.length > this.maxTrafficDataStack) {
        this.connectedUsers.splice(0, 1)
      }
    } catch (e) {
    } finally {
      this.loading = false
    }
  },
  computed: {
    chartData() {
      const labels = map(this.connectedUsers, (data) => {
        const hours = data.time.getHours()
        const minutes = data.time.getMinutes()
        const seconds = data.time.getSeconds()
        return [hours, String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')].join(':')
      })
      return {
        labels: labels,
        datasets: this.getDatasets()
      }
    }
  },
  mounted() {
    const throttleFunc = throttle(this.$fetch, '1000')
    this.setInterval(throttleFunc, 10000)
  },
  methods: {
    getDatasets() {
      const values = map(this.connectedUsers, d => d.count)
      const dataset = {
        label: 'Connected Users',
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
        data: values
      }

      return [dataset]
    }
  }
}
</script>
