<template>
  <card>
    <h5>Wireless Interface</h5>
    <div v-if="tableData.length > 0" class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th>default name</th>
            <th>name</th>
            <th>mtu</th>
            <th>mac address</th>
            <th>Running</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data,index) in tableData" :key="index">
            <td>
              <a href="" @click.prevent="()=>showRowModalId = data['.id']">{{ data['name'] }}</a>
              <el-dialog :visible="showRowModalId === data['.id']" title="Wireless Interface" :before-close="()=>showRowModalId=null" width="70%">
                <div class="row">
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      ID: <strong>{{ data['.id'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Name: <strong>{{ data['name'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Default Name: <strong>{{ data['default-name'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Type: <strong>{{ data['type'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      MTU: <strong>{{ data['mtu'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Actual MTU: <strong>{{ data['actual-mtu'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      L2MTU: <strong>{{ data['l2mtu'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Max L2MTU: <strong>{{ data['max-l2mtu'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Mac Address: <strong>{{ data['mac-address'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Link downs: <strong>{{ data['link-downs'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Rx byte: <strong>{{ data['rx-byte'] }} bytes</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Tx-byte: <strong>{{ data['tx-byte'] }} bytes</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Rx packet: <strong>{{ data['rx-packet'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Tx packet: <strong>{{ data['tx-packet'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Rx drop: <strong>{{ data['rx-drop'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Tx drop: <strong>{{ data['tx-drop'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Tx queue drop: <strong>{{ data['tx-queue-drop'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Rx error: <strong>{{ data['rx-error'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Tx error: <strong>{{ data['tx-error'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      FP-Rx byte: <strong>{{ data['fp-rx-byte'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      FP-Tx byte: <strong>{{ data['fp-tx-byte'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      FP-Rx packet: <strong>{{ data['fp-rx-packet'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      FP-Tx packet: <strong>{{ data['fp-tx-packet'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Running: <strong>{{ data['running'] }}</strong>
                    </p>
                  </div>
                  <div class="col-12 col-lg-6 col-xl-3">
                    <p>
                      Disabled: <strong>{{ data['disabled'] }}</strong>
                    </p>
                  </div>
                </div>
              </el-dialog>
            </td>
            <td>{{ data['name'] }}</td>
            <td>{{ data['mtu'] }}</td>
            <td>{{ data['mac-address'] }}</td>
            <td>{{ data['running'] ? 'Yes' : 'No' }}</td>
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
