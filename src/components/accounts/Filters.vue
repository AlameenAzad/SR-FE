<template>
  <q-btn outline disable square label="Reset" class="full-width q-mb-lg font-16" />
  <calendar />
  <products />
  <status />
</template>

<script setup>
import calendar from './filters/Calendar.vue'
import products from './filters/Products.vue'
import status from './filters/Status.vue'
</script>

<style lang="scss" scoped></style>
