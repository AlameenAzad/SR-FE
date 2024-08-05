
<template>
  <div class="text-red separator-with-title q-mb-md font-16 q-my-lg"><span>Statuses</span></div>
  <div v-for="status in statusValues" :key="status.title">
    <q-checkbox dark v-model="status.value" :label="status.title" color="yellow" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const statuses = [
  'Active',
  'Suspended: Billing',
  'Suspended: Activity',
  'Suspended: Billing & Activity',
]
const statusValues = ref([])
onMounted(() => {
  statuses.forEach(product => {
    statusValues.value.push({
      title: product,
      value: false
    })
  })
})
</script>

<style lang="scss" scoped></style>
