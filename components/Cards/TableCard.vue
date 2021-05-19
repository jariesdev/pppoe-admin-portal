<template>
  <card>
    <template #header>
      <div class="pt-2">
        <slot name="header">
          <h2 class="card-title font-weight-500">{{ title }}</h2>
          <p v-if="subTitle" class="card-category">{{ subTitle }}</p>
        </slot>
      </div>
    </template>
    <slot></slot>
  </card>
</template>
<script>
import Card from "~/components/Cards/Card";

export default {
  name: 'TableCard',
  extends: Card
}
</script>
