<template>
  <div class="customers">
    <CustomerTable />
  </div>
</template>

<script>
import CustomerTable from '~/components/Content/Customer/CustomerTable'
export default {
  name: 'Index',
  components: { CustomerTable }
}
</script>

<style scoped>

</style>
