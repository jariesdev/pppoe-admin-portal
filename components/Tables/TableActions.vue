<template>
  <div class="table-actions">
    <TableActionButton
      v-for="(action,index) in actions"
      :key="index"
      :content="action.label"
      :data="data"
      :icon="action.icon"
      :disabled="isDisabled(action)"
      :to="action.to || action.href"
      v-on="action.on"
    />
    <slot :data="data" />
  </div>
</template>
<script>
import { Tooltip } from 'element-ui'
import TableActionButton from '@/components/Tables/TableActionButton'

export default {
  name: 'TableActions',
  components: {
    TableActionButton,
    [Tooltip.name]: Tooltip
  },
  provide () {
    return {
      data: this.data
    }
  },
  props: {
    actions: {
      type: Array,
      required: false,
      default: () => []
    },
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    isDisabled (action) {
      return typeof action.disabled === 'boolean' ||
      (typeof action.disabled === 'function' && typeof action.disabled(this.data) === 'boolean' && action.disabled(this.data))
    }
  }
}
</script>
