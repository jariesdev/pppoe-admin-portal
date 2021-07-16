<template>
  <card>
    <h5>Wireless Interface</h5>
    <div v-if="tableData.length > 0" class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Address</th>
            <th>Network</th>
            <th>Interface</th>
            <th>Actual Interface</th>
            <th>Invalid</th>
            <th>Dynamic</th>
            <th>Disabled</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data,index) in tableData" :key="index">
            <td>
              {{ data['address'] }}
            </td>
            <td>{{ data['network'] }}</td>
            <td>{{ data['interface'] }}</td>
            <td>{{ data['actual-interface'] }}</td>
            <td>{{ data['invalid'] === 'true' ? 'Yes' : 'No' }}</td>
            <td>{{ data['dynamic'] === 'true' ? 'Yes' : 'No' }}</td>
            <td>{{ data['disabled'] === 'true' ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else class="font-italic">
      No Information yet.
    </p>
  </card>
</template>

<script>
export default {
  name: 'NasInterface',
  props: {
    nasId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      tableData: [],
      showRowModalId: null
    }
  },
  fetch () {
    this.$axios.$get(`/api/nas/${this.nasId}/interfaces`)
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
