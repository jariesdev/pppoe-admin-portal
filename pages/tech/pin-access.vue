<template>
  <div class="pin-access">
    <div class="container">
      <el-form @submit.prevent="submit()">
        <el-form-item label="Enter PIN">
          <el-input v-model="form.pin" type="password" class="d-block" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'simple',
  auth: false,
  methods: {
    submit () {
      this.$axios.$post('/api/')
    }
  }
}
</script>

<style scoped>

</style>
