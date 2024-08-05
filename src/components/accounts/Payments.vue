<template>
  <div class="q-my-xl">
    <div class="text-white separator-with-title q-mb-lg font-16"><span>Awaiting Payment</span></div>
    <paymentsTable :rows="overdue" />
    <div class="text-white separator-with-title q-my-lg font-16"><span>Paid</span></div>
    <paymentsTable :rows="paid" type="paid" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import paymentsTable from '../payments/Table.vue'
import { useAccountsStore } from 'src/stores/accounts'
const accountsStore = useAccountsStore()
const props = defineProps(['currentViewedUser'])
const account = computed(() => accountsStore.accountsSimplified.find((account) => account.id === props.currentViewedUser.id))
const overdue = computed(() => account.value.payments.filter((payment) => payment.overdue))
const paid = computed(() => account.value.payments.filter((payment) => payment.is_paid))
</script>

<style scoped>
/* Your component's CSS styles go here */
</style>
