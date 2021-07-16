<template>
  <div>
    <ChangePlanApplications />
  </div>
</template>
<script>
import ChangePlanApplications from '~/components/Content/ChangePlanApplication/ChangePlanApplicationsTable'

export default {
  components: {
    ChangePlanApplications
  },
  data () {
    return {}
  },
  head () {
    return {
      title: 'Plan Applications'
    }
  }
}
</script>
