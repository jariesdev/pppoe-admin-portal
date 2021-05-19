<template>
  <card :title="`Job Order #${jobOrderNo}`" v-loading="loading">
    <el-row class="flex-wrap" type="flex" :gutter="30">
      <el-col :span="24" :md="12" class="mb-3">
        <p>
          Type: <br>
          <strong>{{ jobOrderObject.type }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :md="12" class="mb-3">
        <p>
          Parameters: <br>
          Qty: <strong>{{ jobOrderObject.qty }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :md="12" class="mb-3">
        <p>
          Employee: <br>
          <strong>{{ jobOrderObject.employee_name }}</strong>
        </p>
      </el-col>
      <el-col :span="24" :md="12" class="mb-3">
        <p>
          Date Created: <br>
          <strong>{{ jobOrderObject.employee_name }}</strong>
        </p>
      </el-col>
    </el-row>
  </card>
</template>

<script>
export default {
  name: 'JobOrderDetails',
  props: {
    jobOrder: {
      type: Number,
      required: true
    }
  },
  async fetch() {
    try {
      this.loading = true
      this.jobOrderObject = await this.$store.dispatch('job-order/get', this.jobOrder)
    }finally {
      this.loading = false
    }
  },
  data() {

    return {
      loading: false,
      jobOrderObject: {}
    }
  },
  computed: {
    jobOrderNo() {
      return String(this.jobOrderObject.id || '').padStart(4, '0')
    }
  }
}
</script>
