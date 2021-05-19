<template>
  <card>
    <h5>System Temperature</h5>
    <ul class="list-unstyled" v-if="tableData.length > 0">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>Voltage: <strong>{{ data['voltage'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Temperature: <strong>{{ data['temperature'] }}</strong></p>
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
import {filter} from 'lodash'
export default {
  name: 'SystemTemperature',
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
  fetch() {
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/temp`)
        .then(({data}) => {
          this.tableData = filter(data || [], o => o !== null)
        })
        .catch(() => null)
  },
  data() {
    return {
      tableData: []
    }
  },
  watch: {
    accessPointId(){
      this.$fetch()
    },
    nasId(){
      this.$fetch()
    }
  },
}
</script>
