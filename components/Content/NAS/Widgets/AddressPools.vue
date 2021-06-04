<template>
  <card>
    <div class="d-flex align-content-start">
      <h5>Address Pools</h5>
      <div class="mx-auto" />
      <a href="" :class="{'text-muted': !loading, 'text-info': loading}" @click.prevent="$fetch()">
        <i class="fas fa-sync" :class="{'fa-spin':loading}" />
      </a>
    </div>
    <div class="table-responsive">
      <table v-loading="loading" class="table table-sm table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ranges</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="tableData.length > 0">
            <tr v-for="(data,index) in tableData" :key="index">
              <td>{{ data['name'] }}</td>
              <td>{{ data['ranges'] }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4">
                <p class="font-italic">
                  No Information yet.
                </p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </card>
</template>

<script>
import alerts from '~/mixins/alerts'

export default {
  name: 'AddressPools',
  mixins: [alerts],
  props: {
    nasId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  fetch () {
    this.loading = true
    this.$axios.$get(`/api/nas/${this.nasId}/address-pools`)
      .then(({ data }) => {
        this.tableData = data
      })
      .catch(() => null)
      .finally(() => {
        this.loading = false
      })
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
