<template>
  <p class="small font-italic" :class="{'text-muted': !hasError, 'text-danger' : hasError}">
    <template v-if="hasError">
      <slot name="errors" :error="inputError" :errors="inputErrors">
        {{ inputError }}
      </slot>
    </template>
    <template v-else>
      <slot />
    </template>
  </p>
</template>

<script>
export default {
  name: 'InputDescription',
  props: {
    errors: {
      type: [String, Array, null],
      required: false
    }
  },
  computed: {
    inputErrors () {
      if (!this.errors) {
        return []
      } else if (!Array.isArray(this.errors)) {
        return [this.errors]
      }

      return this.errors
    },
    inputError () {
      if (this.inputErrors.length !== 0) {
        return this.inputErrors[0]
      }

      return null
    },
    hasError () {
      return this.inputError !== null
    }
  }
}
</script>

<style scoped>
p {
  margin-top: -1em;
}
</style>
