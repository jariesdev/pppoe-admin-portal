<template>
  <card title="NAS Details">
    <h4>Basic Info</h4>
    <hr>
    <el-row :gutter="15" class="flex-wrap mb-3" type="flex">
      <el-col :lg="8" class="mb-2">
        <p>
          Alias: <br>
          <strong>{{ nas.shortname }}</strong>
        </p>
      </el-col>
      <el-col :lg="8" class="mb-2">
        <p>
          Name: <br>
          <strong>{{ nas.nasname }}</strong>
        </p>
      </el-col>
      <el-col :lg="8" class="mb-2">
        <p>
          Type: <br>
          <strong>{{ nas.type || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="8" class="mb-2">
        <p>
          Ports: <br>
          <strong>{{ nas.ports || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="8" class="mb-2">
        <p>
          Secret: <br>
          <strong>{{ nas.secret || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="8" class="mb-2">
        <p>
          Server: <br>
          <strong>{{ nas.server || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="8" class="mb-2">
        <p>
          Community: <br>
          <strong>{{ nas.community || '-' }}</strong>
        </p>
      </el-col>
      <el-col :lg="8" class="mb-2">
        <p>
          Description: <br>
          <strong>{{ nas.description || '-' }}</strong>
        </p>
      </el-col>
    </el-row>
    <div v-if="nas.branch">
      <h4>Branch Details</h4>
      <hr>
      <el-row :gutter="15">
        <el-col :lg="8" class="mb-2">
          <p>
            Branch: <br>
            <strong>{{ nas.branch.name }}</strong>
          </p>
        </el-col>
      </el-row>
    </div>
  </card>
</template>

<script>
export default {
  name: 'NasInfo',
  async fetch() {
    this.nas = await this.$store.dispatch('nas/get', this.$route.params.id)
  },
  data() {
    return {
      nas: {}
    }
  },

}
</script>
