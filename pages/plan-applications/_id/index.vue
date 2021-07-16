<template>
  <div class="plan-application-details">
    <change-plan-application-details :plan-application-id="planApplicationId">
      <template slot-scope="{planApplication}">
        <base-button v-show="planApplication.status === 'pending'" type="primary" @click="openModal()">
          Approve
        </base-button>
        <el-dialog :visible.sync="visibleBranchFormDialog" destroy-on-close title="Plan Application">
          <ChangePlanApplicationForm
            v-if="visibleBranchFormDialog"
            :change-plan-application-id="planApplicationId"
            @success="visibleBranchFormDialog=false"
            @cancel="visibleBranchFormDialog=false"
          />
        </el-dialog>
        <base-button @click="$router.back()">
          Back
        </base-button>
      </template>
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
