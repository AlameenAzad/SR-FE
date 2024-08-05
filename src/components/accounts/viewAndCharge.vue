<template>
  <q-card dark flat class="bg-page-color q-pa-md q-mt-md" style="min-width: 50%;">
    <q-card-section>
      <div class="">
        <div class="col-6 q-mb-xl">
          <div class="text-white separator-with-title q-mb-md font-16"><span>Charge Account</span></div>
        </div>
        <q-form ref="paymentForm">
          <q-input dark v-model="payment.amount" label="Amount" color="red" dense class="q-mb-sm"
            :rules="[rules.required]" lazy-rules />
          <q-select dark v-model="payment.confirm" :options="confirmOptions" label="Pay Now?" color="red" dense
            class="q-mb-lg" :rules="[rules.required]" lazy-rules />
        </q-form>
        <pathLogger :charging-account="accountId" @close-dialog="chargeAccount" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import { useAccountsStore } from 'src/stores/accounts'
import { useQuasar } from 'quasar'
import { rules } from 'src/helper/formRules'
import pathLogger from 'components/pathFinder/PathLogger.vue'
const emit = defineEmits(['closeDialog'])

const $q = useQuasar()
const accountsStore = useAccountsStore()
const props = defineProps(['accountId'])
const paymentForm = ref()
const payment = ref({
  amount: null,
  confirm: null,
})
const confirmOptions = [
  {
    label: 'Yes',
    value: 1,
  },
  {
    label: 'No',
    value: 0,
  },
]

const chargeAccount = async (productId, logId) => {
  if (await paymentForm.value.validate()) {
    const data = {
      amount: payment.value.amount,
      confirm: payment.value.confirm.value,
      product_id: productId,
      log_id: logId,
    }
    await accountsStore.chargeAccount(props.accountId, data)
    emit('closeDialog')
    $q.notify({
      message: 'Account Charged Successfully',
      color: 'green-5',
      position: 'top-right',
    })
  }
}
</script>
