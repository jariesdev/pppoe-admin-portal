<template>
  <div class="plan-application-details">
    <change-plan-application-details :plan-application-id="planApplicationId">
      <base-button type="primary" @click="openModal()">
        Approve
      </base-button>
      <el-dialog :visible.sync="visibleBranchFormDialog" destroy-on-close title="Plan Application">
        <ChangePlanApplicationForm v-if="visibleBranchFormDialog" :change-plan-application-id="planApplicationId" @cancel="visibleBranchFormDialog=false" />
      </el-dialog>
    </change-plan-application-details>
  </div>
</template>

<script>
import ChangePlanApplicationDetails from '~/components/Content/ChangePlanApplication/ChangePlanApplicationDetails'
import ChangePlanApplicationForm from '~/components/Content/ChangePlanApplication/ChangePlanApplicationForm'

export default {
  components: {
    ChangePlanApplicationForm,
    ChangePlanApplicationDetails
  },
  asyncData ({ route }) {
    return {
      planApplicationId: +route.params.id
    }
  },
  data: () => ({
    visibleBranchFormDialog: false
  }),
  head: () => ({
    title: 'Plan Application Details'
  }),
  methods: {
    openModal () {
      this.visibleBranchFormDialog = true
    }
  }
}
</script>
