<template>
  <card>
    <h5>RouterOS Firmware</h5>
    <ul v-if="tableData.length > 0" class="list-unstyled">
      <li v-for="(data,index) in tableData" :key="index" class="mb-2">
        <div class="row">
          <div class="col-6">
            <p>Router board: <strong>{{ data['routerboard'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Board name: <strong>{{ data['board-name'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Model: <strong>{{ data['model'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Serial number: <strong>{{ data['serial-number'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Firmware type: <strong>{{ data['firmware-type'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Factory firmware: <strong>{{ data['factory-firmware'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Current firmware: <strong>{{ data['current-firmware'] }}</strong></p>
          </div>
          <div class="col-6">
            <p>Upgrade firmware: <strong>{{ data['upgrade-firmware'] }}</strong></p>
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
  name: 'RouterFirmware',
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
      tableData: []
    }
  },
  fetch () {
    this.$axios.$get(`/api/nas/${this.nasId}/accesspoints/${this.accessPointId}/router-board`)
      .then(({ data }) => {
        this.tableData = data
      })
      .catch(() => null)
  },
  watch: {
    accessPointId () {
      this.$fetch()
    },
    nasId () {
      this.$fetch()
    }
  }
}
</script>
