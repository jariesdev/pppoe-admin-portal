<template>
  <card type="chart">
    <template slot="header">
      <h5 class="card-category">Last 12 Month Sales</h5>
      <h3 class="card-title">
        <i class="tim-icons icon-delivery-fast text-info "></i> {{ totalYearSalesFormat }}
      </h3>
    </template>
    <div class="chart-area">
      <bar-chart
          :chart-data="chartData"
          :extra-options="blueBarChart.extraOptions"
          :gradient-stops="blueBarChart.gradientStops"
          style="height: 100%"
      >
      </bar-chart>
    </div>
  </card>
</template>

<script>
import * as chartConfigs from "~/components/Charts/config";
import config from "~/config";
import BarChart from "~/components/Charts/BarChart";
import {map, sum} from 'lodash'
import {mapGetters, mapState} from 'vuex'

const numeral = require('numeral');

export default {
  name: 'DailySalesChart',
  components: {BarChart},
    fetch() {
      this.$store.dispatch('sale/loadYearlySales')
  },
  data() {
    return {
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      }
    }
  },
  computed: {
    ...mapGetters({
      chartData: 'sale/getYearlySalesChartData',
      totalYearSales: 'sale/getTotalYearSales'
    }),
    totalYearSalesFormat() {
      return 'PHP ' + numeral(this.totalYearSales).format('0,0.00')
    }
  },
  methods: {
    async initializeChartData() {
      const {data} = await this.$axios.$get(`/api/monthly-sales`)

      const labels = map(data, o => o.month)
      const datasetData1 = map(data, o => o.totalSales)
      this.totalYearSales = sum(datasetData1)
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total Sales in a month',
            fill: true,
            borderColor: config.colors.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: datasetData1
          }
        ]
      }

      this.$set(this.blueBarChart, 'chartData', chartData)
    }
  }
}
</script>
