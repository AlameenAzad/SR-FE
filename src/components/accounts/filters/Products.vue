
<template>
  <div class="text-red separator-with-title q-mb-md font-16 q-my-lg"><span>Products</span></div>
  <div v-for="product in productValues" :key="product.title">
    <q-checkbox dark v-model="product.value" :label="product.title" color="yellow" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const products = [
  'Product 1',
  'Product 2',
  'Product 3',
  'Product 4',
  'Product 5',
  'Product 6',
]
const productValues = ref([])
onMounted(() => {
  products.forEach(product => {
    productValues.value.push({
      title: product,
      value: false
    })
  })
})
</script>

<style lang="scss" scoped></style>
