<template>
  <div>
    <UsersTable />
  </div>
</template>
<script>
import UsersTable from '~/components/Content/User/UsersTable'

export default {
  components: { UsersTable },
  data () {
    return {}
  },
  head () {
    return {
      title: 'Users'
    }
  }
}
</script>
