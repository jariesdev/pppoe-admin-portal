<template>
  <div>
    <card :title="`Edit Plan ${planId}`">
      <PlanForm :edit-plan="planId" @cancel="$router.back()" @success="" />
    </card>
  </div>
</template>
<script>
import PlanForm from "~/components/Content/Plan/PlanForm";

export default {
  components: {PlanForm},
  fetch() {
    this.planId = +this.$route.params.id
  },
  data() {
    return {
      planId: null
    }
  },
  head(){
    return {
      title: 'Edit Plan'
    }
  }
}
</script>
