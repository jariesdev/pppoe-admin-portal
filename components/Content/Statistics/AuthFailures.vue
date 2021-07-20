<template>
  <div>
    <ServerTable ref="authFailureTable" :headers="headers" :hide-pagination="true" url="/api/auth-failures">
      <template #empty>
        All good, no authentication failures.
      </template>
      <template #username="{row,value}">
        <a href="" @click.prevent="showMoreDetails=row">{{ value }}</a>
      </template>
    </ServerTable>
    <el-dialog :before-close="showMoreDetails=null" :visible="showMoreDetails!==null" title="Auth Failures">
      <div v-if="showMoreDetails" class="row">
        <div class="col-xl-6">
          <p>
            username: <strong>{{ showMoreDetails['username'] }}</strong>
          </p>
        </div>
        <div class="col-xl-6">
          <p>
            pass: <strong>{{ showMoreDetails['pass'] }}</strong>
          </p>
        </div>
        <div class="col-xl-6">
          <p>
            authdate: <strong>{{ showMoreDetails['authdate'] }}</strong>
          </p>
        </div>
        <div class="col-xl-6">
          <p>
            nas: <strong>{{ showMoreDetails['nas'] }}</strong>
          </p>
        </div>
        <div class="col-xl-6">
          <p>
            branch: <strong>{{ showMoreDetails['branch'] }}</strong>
          </p>
        </div>
        <div class="col-xl-6">
          <p>
            reply_message: <strong>{{ showMoreDetails['reply_message'] }}</strong>
          </p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ServerTable from '~/components/Tables/ServerTable'
import { defaultDateTimeFormat } from '~/util/utilities'

const headers = [
  {
    label: 'Username',
    field: 'username'
  },
  {
    label: 'Auth Date',
    field: 'authdate',
    formatValue: value => defaultDateTimeFormat(value)
  }
]

export default {
  name: 'AuthFailures',
  components: { ServerTable },
  data () {
    return {
      headers,
      showMoreDetails: null
    }
  },
  mounted () {
    // setInterval(this.reloadTable, (10 * 60) * 1000)
  },
  methods: {
    reloadTable () {
      this.$refs.authFailureTable.loadData()
    }
  }
}
</script>
