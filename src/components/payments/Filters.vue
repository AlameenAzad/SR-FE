<template>
  <q-btn outline :disable="!paid && !due" square label="Reset" class="full-width q-mb-lg font-16" @click="reset" />
  <calendar />
  <div class="text-red separator-with-title q-mb-md font-16 q-mb-lg q-mt-lg"><span>Filters</span></div>
  <q-checkbox v-model="paid" label="Paid Transactions" dark @click="buildQuery" />
  <div>
    <q-checkbox v-model="due" label="Over Due Transactions" dark @click="buildQuery" />
  </div>
</template>

<script setup>
import calendar from '../accounts/filters/Calendar.vue'
import { usePaymentsStore } from 'src/stores/payments'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const paymentsStore = usePaymentsStore()
const paid = ref(false)
const due = ref(false)
const $q = useQuasar()

const buildQuery = () => {
  let filters = '?'
  if (paid.value) {
    filters += 'filters[is_paid][$eq]=true'
  }
  if (due.value) {
    paid.value ? filters += '&' : ''
    filters += 'filters[is_due][$eq]=true'
  }
  getPayments(filters)
}

const reset = () => {
  paid.value = false
  due.value = false
  getPayments('')
}

const getPayments = async (filters) => {
  try {
    await paymentsStore.getPayments(filters)
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

</script>

<style lang="scss" scoped></style>
