<template>
  <el-tooltip :content="content" :effect="effect" :placement="placement">
    <nuxt-link
      v-if="isLink && getLink()"
      :to="getLink()"
      class="btn el-tooltip btn-link btn-icon btn-fab btn-neutral btn-sm"
      :class="{'text-muted':isDisabled}"
    >
      <i :class="icon" />
    </nuxt-link>
    <button
      v-else
      :class="buttonClass"
      :disabled="isDisabled"
      class="btn el-tooltip btn-link btn-icon btn-fab btn-neutral btn-sm"
      type="button"
      v-on="$attrs.on"
      @click="$emit('click', data)"
    >
      <i :class="icon" />
    </button>
  </el-tooltip>
</template>

<script>
import { Tooltip } from 'element-ui'

export default {
  name: 'TableActionButton',
  components: {
    [Tooltip.name]: Tooltip
  },
  props: {
    data: {
      type: [Object, null],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      required: false,
      default: 'top'
    },
    effect: {
      type: String,
      required: false,
      default: 'light'
    },
    icon: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: [String, Object, Function, Boolean],
      required: false,
      default: null,
      validator: (p) => {
        return ['string', 'object', 'function', 'boolean'].includes(typeof p) || p === null
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    isLink () {
      return typeof this.to === 'string' ||
          (typeof this.to === 'function' && typeof this.to(this.data) === 'string') ||
          (typeof this.to === 'function' && this.to(this.data) === null)
    },
    isDisabled () {
      return this.disabled === true
    }
  },
  methods: {
    getLink () {
      if (typeof this.to === 'function') {
        return this.to(this.data)
      } else if (typeof this.to === 'string') {
        return {
          path: this.to
        }
      } else {
        return this.to
      }
    }
  }
}
</script>
