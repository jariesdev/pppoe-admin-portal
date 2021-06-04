<template>
  <div class="address-pool">
    <AddressPoolsTable />
  </div>
</template>

<script>
import AddressPoolsTable from '~/components/Content/AddressPool/AddressPoolsTable'

export default {
  components: { AddressPoolsTable },
  head () {
    return {
      title: 'Address Pools'
    }
  }
}
</script>

<style scoped>

</style>
