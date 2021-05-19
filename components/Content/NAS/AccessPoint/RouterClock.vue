<template>
  <card>
    <div class="d-flex align-content-start">
      <h5>RouterOS Clock</h5>
      <div class="mx-auto" />
      <a href="" @click.prevent="$fetch()" :class="{'text-muted': !loading, 'text-info': loading}">
        <i class="fas fa-sync" :class="{'fa-spin':loading}"></i>
      </a>
    </div>
    <ul v-if="tableData.length > 0" class="list-unstyled" v-loading="loading">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>Time: <strong>{{ data['time'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Date: <strong>{{ data['date'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Time zone autodetect: <strong>{{ data['time-zone-autodetect'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Time zone: <strong>{{ data['time-zone-name'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>GMT offset: <strong>{{ data['gmt-offset'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>DST active: <strong>{{ data['dst-active'] }}</strong></p>
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
export default {
  name: 'RouterClock',
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
    this.loading = true
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/router-clock`)
        .then(({data}) => {
          this.tableData = data
        })
        .catch(() => null)
        .finally(() => {
          this.loading = false
        })
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
      tableData: [],
      loading: false
    }
  }
}
</script>
