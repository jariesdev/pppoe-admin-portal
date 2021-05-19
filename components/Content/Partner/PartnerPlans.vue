<template>
  <card title="Partner's Plans">
    <el-table
      ref="plansTable"
      multiple
      :data="availablePlans"
      empty-text="No plans available."
      row-key="id"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="Description" prop="description"/>
      <el-table-column label="radius_value" prop="radius_value"/>
      <el-table-column label="Rate" prop="rate_limit"/>
      <el-table-column label="Price" prop="price"/>
    </el-table>
    <template #footer>
      <base-button type="primary" :loading="processing" :disabled="!isDirty" @click="saveSelectedPlans()">
        {{ processing ? 'Saving' : 'Save' }} Plans
      </base-button>
    </template>
  </card>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {filter, findIndex, forEach, intersectionBy, map} from "lodash";
import alerts from "~/mixins/alerts";

export default {
  mixins: [alerts],
  name: "PartnerPlans",
  async fetch() {
    await this.$store.dispatch('plan/load')
  },
  props: {
    partnerId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      originalPlans: [],
      selectedPlans: [],
      processing: false
    }
  },
  computed: {
    ...mapState({
      plans: state => state.plan.plans
    }),
    availablePlans() {
      return filter(this.plans, o => o.is_complimentary === 0)
    },
    isDirty() {
      return this.selectedPlans.length !== this.originalPlans.length
        || intersectionBy(this.selectedPlans, this.originalPlans, 'id').length !== this.selectedPlans.length
    }
  },
  mounted() {
    this.initialSelection()
  },
  methods: {
    ...mapActions({
      getPartnerPlans: 'partner/getPlans'
    }),
    async initialSelection() {
      this.processing = true
      try {
        const plans = await this.getPartnerPlans(this.partnerId)
        if (Array.isArray(plans)) {
          this.selectedPlans = filter(this.availablePlans, availablePlan => findIndex(plans, o => o.id === availablePlan.id) !== -1)
          this.originalPlans = this.selectedPlans
          forEach(this.selectedPlans, plan => {
            this.$refs.plansTable.toggleRowSelection(plan);
          })
        }
      } catch (e) {} finally {
        this.processing = false
      }
    },
    handleSelectionChange(value) {
      this.selectedPlans = value
    },
    saveSelectedPlans() {
      this.processing = true
      const data = {
        plan_id: map(this.selectedPlans, o => o.id)
      }
      this.$axios.$post(`/api/partners/${this.partnerId}/plans`, data)
        .then(({data: {plans}}) => {
          this.originalPlans = filter(this.availablePlans, availablePlan => {
            return findIndex(this.selectedPlans, o => o.id === availablePlan.id) !== -1
          })

          this.$notify({
            type: 'success',
            message: 'Partner\'s plans has been updated'
          })
        })
        .catch(() => {
          this.$notify({
            title: 'danger',
            message: 'Unable to update partner\'s plans.'
          })
        })
        .finally(() => {
          this.processing = false
        })
    }
  }
}
</script>

<style scoped>

</style>
