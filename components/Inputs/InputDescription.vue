<template>
  <p class="small text-muted font-italic">
    <slot />
  </p>
</template>

<script>
export default {
  name: 'InputDescription'
}
</script>

<style scoped>
p {
  margin-top: -1em;
}
</style>
