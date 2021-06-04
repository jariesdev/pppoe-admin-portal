<template>
  <div>
    <BillingsTable />
  </div>
</template>

<script>
import BillingsTable from '~/components/Content/Billing/BillingsTable'
export default {
  components: { BillingsTable },
  head () {
    return {
      title: 'Billings'
    }
  }
}
</script>

<style scoped>

</style>
