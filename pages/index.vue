<template>
  <div class="row main-row">
    <div :class="{ 'text-right': isRTL }" class="col-lg-6">
      <DailySalesChart />
    </div>
    <div class="col-lg-5 d-none">
      <card :header-classes="{ 'text-right': isRTL }" type="tasks">
        <template slot="header" class="d-inline">
          <h6 class="title d-inline">
            Tasks (5)
          </h6>
          <p class="card-category d-inline">
            Today
          </p>

          <base-dropdown
            class="float-right"
            menu-on-right=""
            tag="div"
            title-classes="btn btn-link btn-icon"
          >
            <i slot="title" class="tim-icons icon-settings-gear-63" />
            <nuxt-link class="dropdown-item" to="/">
              Action
            </nuxt-link>
            <nuxt-link class="dropdown-item" to="/">
              Another action
            </nuxt-link>
            <nuxt-link class="dropdown-item" to="/">
              Something else
            </nuxt-link>
          </base-dropdown>
        </template>
        <div class="table-full-width table-responsive">
          <task-list />
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import * as chartConfigs from '@/components/Charts/config'
import TaskList from '@/components/Dashboard/TaskList'
import config from '@/config'
import { Table, TableColumn } from 'element-ui'
import DailySalesChart from '~/components/Content/Sale/DailySalesChart'

const bigChartData = [
  [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
  [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
  [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
]
const bigChartLabels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const bigChartDatasetOptions = {
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
  pointRadius: 4
}

export default {
  name: 'Dashboard',
  components: {
    DailySalesChart,
    TaskList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      tableData: [
        {
          id: 1,
          name: 'Dakota Rice',
          salary: '$36.738',
          country: 'Niger',
          city: 'Oud-Turnhout'
        },
        {
          id: 2,
          name: 'Minerva Hooper',
          salary: '$23,789',
          country: 'Curaçao',
          city: 'Sinaai-Waas'
        },
        {
          id: 3,
          name: 'Sage Rodriguez',
          salary: '$56,142',
          country: 'Netherlands',
          city: 'Baileux'
        },
        {
          id: 4,
          name: 'Philip Chaney',
          salary: '$38,735',
          country: 'Korea, South',
          city: 'Overland Park'
        },
        {
          id: 5,
          name: 'Doris Greene',
          salary: '$63,542',
          country: 'Malawi',
          city: 'Feldkirchen in Kärnten'
        }
      ],
      bigLineChart: {
        activeIndex: 0,
        chartData: {
          datasets: [{
            ...bigChartDatasetOptions,
            data: bigChartData[0]
          }],
          labels: bigChartLabels
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
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
              data: [80, 100, 70, 80, 120, 80]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0]
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
          datasets: [
            {
              label: 'My First dataset',
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80]
            }
          ]
        },
        gradientColors: [
          'rgba(66,134,121,0.15)',
          'rgba(66,134,121,0.0)',
          'rgba(66,134,121,0)'
        ],
        gradientStops: [1, 0.4, 0]
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
          datasets: [
            {
              label: 'Countries',
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [53, 20, 10, 80, 100, 45]
            }
          ]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
      }
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL
    },
    isRTL () {
      return this.$rtl.isRTL
    },
    bigLineChartCategories () {
      return [{ name: 'Accounts', icon: 'tim-icons icon-single-02' }, {
        name: 'Purchases',
        icon: 'tim-icons icon-gift-2'
      }, { name: 'Sessions', icon: 'tim-icons icon-tap-02' }]
    }
  },
  mounted () {
    // this.initBigChart(0);
  },
  methods: {
    initBigChart (index) {
      const chartData = {
        datasets: [{
          ...bigChartDatasetOptions,
          data: bigChartData[index]
        }],
        labels: bigChartLabels
      }
      this.$refs.bigChart.updateGradients(chartData)
      this.bigLineChart.chartData = chartData
      this.bigLineChart.activeIndex = index
    }
  }
}
</script>
<style scoped lang="scss">
.main-row {
  & > div {
    margin-bottom: 30px;

    & > .card {
      height: 100%;
      margin: 0;
    }
  }
}
</style>
