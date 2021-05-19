<template>
  <div>
    <AllocationDetails :allocation-id="allocationId"/>
    <card title="Auth Logs">
      <AllocationAuthLogs :allocation-id="allocationId"/>
    </card>
    <card title="Connection Logs">
      <AllocationConnectionLogs :allocation-id="allocationId"/>
    </card>
    <div>
      <base-button @click="$router.back()">Back</base-button>
    </div>
  </div>
</template>

<script>
import AllocationDetails from "~/components/Content/Alllocation/AllocationDetails";
import JobOrderDetails from "~/components/Content/JobOrder/JobOrderDetails";
import AllocationAuthLogs from "~/components/Content/Alllocation/AllocationAuthLogs";
import AllocationConnectionLogs from "~/components/Content/Alllocation/AllocationConnectionLogs";

export default {
  components: {AllocationConnectionLogs, AllocationAuthLogs, JobOrderDetails, AllocationDetails},
  data() {
    return {
      allocationId: null
    }
  },
  created() {
    this.allocationId = +this.$route.params.id
  }
}
</script>
