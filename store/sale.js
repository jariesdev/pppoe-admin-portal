import {map, sum} from "lodash";
import config from "~/config";

export const state = () => {
    return {
        yearlySales: []
    }
}

export const getters = {
    getTotalYearSales(state){
        const datasetData1 = map(state.yearlySales, o => o.totalSales)
        return sum(datasetData1);
    },
    getYearlySalesChartData(state){
        const data = state.yearlySales
        const labels = map(data, o => o.month)
        const datasetData1 = map(data, o => o.totalSales)
        return {
            labels: labels,
            datasets: [
                {
                    label: 'Total sales this month',
                    fill: true,
                    borderColor: config.colors.info,
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    data: datasetData1
                }
            ]
        }
    }
}
export const mutations = {
    setYearlySales(state, value){
        state.yearlySales = value
    }
}

export const actions = {
    async loadYearlySales({commit}, id) {
        const {data} = await this.$axios.$get(`/api/monthly-sales`)
        commit('setYearlySales', data)
    }
}
