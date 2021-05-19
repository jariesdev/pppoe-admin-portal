<template>
  <div>
    <el-tabs value="branches">
      <el-tab-pane label="Branches" name="branches">
        <partner-branches-table :partner-id="partnerId" />
      </el-tab-pane>
      <el-tab-pane label="Users" name="users">
        <partner-users-table :partner-id="partnerId" />
      </el-tab-pane>
      <el-tab-pane label="Plans" name="plans">
        <partner-plans :partner-id="partnerId" />
      </el-tab-pane>
      <div>
        <base-button @click="$router.push('/partners')">
          Back to Partners
        </base-button>
      </div>
    </el-tabs>
  </div>
</template>
<script>
import PartnerBranchesTable from '~/components/Content/Branches/PartnerBranchesTable'
import PartnerUsersTable from '~/components/Content/Partner/PartnerUsersTable'
import PartnerPlans from '~/components/Content/Partner/PartnerPlans'

export default {
  components: { PartnerPlans, PartnerUsersTable, PartnerBranchesTable },
  computed: {
    partnerId () {
      return this.$route.params.id ? +this.$route.params.id : null
    }
  }
}
</script>
