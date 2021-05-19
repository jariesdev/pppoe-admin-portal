<template>
  <div>
    <el-row v-loading="loading" :gutter="15" class="flex-wrap" type="flex">
      <el-col :lg="12" class="mb-2">
        <p>
          Username:
          <strong>{{ allocation.username || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="12" class="mb-2">
        <p>
          Partner:
          <strong>{{ allocation.partner || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="12" class="mb-2">
        <p>
          Branch:
          <strong>{{ allocation.branch || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="12" class="mb-2">
        <p>
          Total allocated time:
          <strong>{{ allocation.total_allocated_time || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="12" class="mb-2">
        <p>
          Total upload (MB):
          <strong>{{ allocation.total_upload_in_MBytes || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="12" class="mb-2">
        <p>
          Total download (MB):
          <strong>{{ allocation.total_download_in_MBytes || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="12" class="mb-2">
        <p>
          Total consumption (hrs):
          <strong>{{ allocation.total_consumption_hours || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="12" class="mb-2">
        <p>
          Total Remaining (hrs):
          <strong>{{ allocation.total_remain_hours || '-' }}</strong>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VoucherConsumption',
  props: {
    allocationId: {
      type: Number,
      required: true
    }
  },
  async fetch() {
    this.loading = true
    try {
      this.allocation = await this.$store.dispatch('allocation/get', this.allocationId)
    } finally {
      this.loading = false
    }
  },
  data() {
    return {
      allocation: {}
    }
  }
}
</script>
