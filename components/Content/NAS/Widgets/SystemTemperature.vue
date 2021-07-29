<template>
  <card>
    <h5>System Temperature</h5>
    <p v-if="data === null" class="font-italic">
      No Information yet.
    </p>
    <p v-if="!featureAvailable" class="font-italic">
      Feature not available on this device.
    </p>
    <ul v-else-if="featureAvailable" class="list-unstyled">
      <li>
        <div class="alert">
          Feature not available on this device.
        </div>
      </li>
      <li class="mb-2">
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
  </card>
</template>

<script>
import { get } from 'lodash'

export default {
  name: 'SystemTemperature',
  props: {
    nasId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      data: []
    }
  },
  fetch () {
    this.$axios.$get(`/api/nas/${this.nasId}/temp`)
      .then(({ data }) => {
        this.data = data
      })
      .catch(() => null)
  },
  computed: {
    featureAvailable () {
      return get(this.data, 'state') !== 'disabled'
    }
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
