<template>
  <div class="row justify-center full-width">
    <div class="col-8">
      <div class="q-mt-xl">
        <q-card class="bordered-card-white bg-transparent q-pa-md" v-if="!toggleForm">
          <div :class="!toggleForm ? 'bordered-card-btn' : ''">
            <q-btn color="red" label="Create New Product" @click="toggleForm = true" />
          </div>
          <q-card-section>
            <div class="row" :class="index !== products.length - 1 ? 'q-mb-sm' : ''" v-for="(product, index) in products"
              :key="product">
              <div class="col-6">
                <p class="q-mb-none q-mt-sm"> {{ product.name }} </p>
              </div>
              <div class="col-6 text-right">
                <q-btn flat color="red" label="Edit" @click="editProduct(product.id)" />
                <q-btn flat color="red" label="Delete" @click="confirmDeleteProduct(product.id)" />
              </div>
              <div class="col-12 q-mt-sm" v-if="index !== products.length - 1">
                <q-separator dark />
              </div>
            </div>
          </q-card-section>
        </q-card>
        <createProduct ref="createProductComp" @closeDialog="toggleForm = false; getProducts()" v-else />
      </div>
    </div>
  </div>
  <q-dialog v-model="confirmDelete" persistent>
    <q-card dark class="bg-pagecolor q-pa-md shadow-0">
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="yellow" text-color="white" />
        <span class="q-ml-sm">Do you want to delete this product?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="red" @click="confirmDeleteId = null; confirmDelete = false" />
        <q-btn label="Delete" color="red" @click="deleteProduct()" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useProductsStore } from 'src/stores/products'
import createProduct from './newCreate.vue'
const $q = useQuasar()
const productsStore = useProductsStore()
let toggleForm = ref(false)
const products = computed(() => productsStore.productNames)
const createProductComp = ref(null)
const confirmDelete = ref(false)
const loading = ref(false)
const confirmDeleteId = ref(null)
const getProducts = async () => {
  try {
    await productsStore.getProducts()
  } catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}
const editProduct = (id) => {
  toggleForm.value = true
  setTimeout(() => { createProductComp.value.loadData(id) }, 100)
}

const confirmDeleteProduct = (id) => {
  confirmDelete.value = true
  confirmDeleteId.value = id
}

const deleteProduct = async () => {
  loading.value = true
  try {
    await productsStore.deleteProducts(confirmDeleteId.value)
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Products Added!'
    })
    loading.value = false
    confirmDelete.value = false
  }
  catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
    loading.value = false
  }
}


onMounted(async () => {
  await getProducts()
})
</script>

<style lang="scss" scoped></style>
