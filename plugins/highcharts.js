import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import {Chart} from 'highcharts-vue'

Vue.use(HighchartsVue)
Vue.component('highcharts', Chart)
