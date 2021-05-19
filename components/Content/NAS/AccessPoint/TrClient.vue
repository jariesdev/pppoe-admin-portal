<template>
  <card>
    <h5>TR Client</h5>
    <ul class="list-unstyled" v-if="tableData.length > 0">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>
              Enabled: <strong>{{ data['enabled'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Connection Request Username: <strong>{{ data['connection-request-username'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Connection Request Password: <strong>{{ data['connection-request-password'] }}</strong>
            </p>
          </div>
          <div class="col-6">
            <p>
              Provisioning Code: <strong>{{ data['provisioning-code'] }}</strong>
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
import {filter} from 'lodash'

export default {
  name: 'TrClient',
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
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/tr-client`)
        .then(({data}) => {
          this.tableData = filter(data || [], o => {
            return o !== null
          })
        })
        .catch(() => null)
  },
  watch: {
    accessPointId(){
      this.$fetch()
    },
    nasId(){
      this.$fetch()
    }
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>
