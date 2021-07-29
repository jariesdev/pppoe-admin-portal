<template>
  <div
    class="form-group"
    :class="{
      'input-group-focus': focused,
      'has-danger': error,
      'has-success': !error && touched,
      'has-label': label,
      'has-icon': hasIcon,
    }"
  >
    <slot name="label">
      <label v-if="label"> {{ label }} {{ required ? '*' : '' }} </label>
    </slot>
    <div class="mb-0" :class="{'input-group': hasIcon}">
      <slot name="addonLeft">
        <span v-if="addonLeftIcon" class="input-group-prepend">
          <div class="input-group-text"><i :class="addonLeftIcon" /></div>
        </span>
      </slot>
      <slot>
        <input
          :value="value"
          v-bind="$attrs"
          :type="inputType"
          class="form-control"
          aria-describedby="addon-right addon-left"
          v-on="listeners"
        >
      </slot>
      <template v-if="showPassword">
        <div class="input-group-append">
          <a
            class="show-password input-group-btn d-flex align-items-center "
            type="button"
            href=""
            @click.prevent="togglePassword()"
          >
            <i class="far" :class="{'fa-eye' : plainPasswordText, 'fa-eye-slash' : !plainPasswordText}" />
          </a>
        </div>
      </template>
      <slot name="addonRight">
        <span v-if="addonRightIcon" class="input-group-append">
          <div class="input-group-text"><i :class="addonRightIcon" /></div>
        </span>
      </slot>
    </div>

    <slot v-if="error || $slots.error" name="error">
      <label class="error">{{ error }}</label>
    </slot>
    <slot name="helperText" />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    required: Boolean,
    label: {
      type: String,
      description: 'Input label',
      default: ''
    },
    error: {
      type: String,
      description: 'Input error',
      default: ''
    },
    value: {
      type: [String, Number],
      description: 'Input value',
      default: ''
    },
    addonRightIcon: {
      type: String,
      description: 'Input icon on the right',
      default: ''
    },
    addonLeftIcon: {
      type: String,
      description: 'Input icon on the left',
      default: ''
    },
    showPassword: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      focused: false,
      touched: false,
      plainPasswordText: false
    }
  },
  computed: {
    hasIcon () {
      return this.hasLeftAddon || this.hasRightAddon
    },
    hasLeftAddon () {
      const { addonLeft } = this.$slots
      return (
        addonLeft !== undefined ||
        this.addonLeftIcon !== undefined
      )
    },
    hasRightAddon () {
      const { addonRight } = this.$slots
      return (
        addonRight !== undefined ||
        this.addonRightIcon !== undefined
      )
    },
    listeners () {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      }
    },
    inputType () {
      if (this.showPassword && !this.plainPasswordText) {
        return 'password'
      }

      return this.$attrs.type
    }
  },
  methods: {
    onInput (evt) {
      if (!this.touched) {
        this.touched = true
      }
      this.$emit('input', evt.target.value)
    },
    onFocus (evt) {
      this.focused = true
      this.$emit('focus', evt)
    },
    onBlur (evt) {
      this.focused = false
      this.$emit('blur', evt)
    },
    togglePassword () {
      this.plainPasswordText = !this.plainPasswordText
    }
  }
}
</script>

<style lang="scss" scoped>
.form-group {
  ::v-deep .input-group-btn {
    border-top: 1px;
    border-bottom: 1px;
    border-style: solid;
    border-left: 0 none;
    border-right-width: 1px;
    border-color: #2b3553;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    color: rgba(255, 255, 255, 0.8);
  }

  .card.card-white & {
    ::v-deep .input-group-append {
      .input-group-btn {
        border-color: rgba(29, 37, 59, 0.2);
        color: #1d253b;
      }
    }
  }
}
</style>
