<template>
  <div padding>
    <q-table :filter="filter" :rows="rows" :columns="columns" row-key="name" dark flat color="red"
      :pagination="paginationObj" bordered card-class="table-class">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.name }}
          </q-th>
          <q-th v-if="type !== 'paid'" auto-width>Actions</q-th>
        </q-tr>
      </template>

      <template v-slot:top>
        <q-space />
        <q-input dark dense debounce="300" color="yellow" v-model="filter" label="Search" style="width: 40%">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
          <q-td auto-width v-if="type !== 'paid'">
            <q-btn flat color="yellow" class="font-16 text-black" label="Mark Paid"
              @click="currentTransaction = props.row; update = true" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="update" persistent>
      <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 550px;">
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="yellow" text-color="dark" />
          <span class="q-ml-sm">Do you want to mark this transaction paid ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="grey" v-close-popup />
          <q-btn :loading="loading" flat label="Mark Paid" color="red" @click="chargeAccount" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { usePaymentsStore } from 'src/stores/payments'
import { useAccountsStore } from 'src/stores/accounts'

defineProps(['rows', 'type'])
const $q = useQuasar()
const paymentsStore = usePaymentsStore()
const accountsStore = useAccountsStore()
const filter = ref('')
const update = ref(false)
const currentTransaction = ref(null)
const loading = ref(false)

const paginationObj = {
  rowsPerPage: 5,
  sortBy: 'regDate',
  descending: true
}

const columns = ref([
  {
    name: 'id',
    field: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    sortable: true
  },
  {
    name: 'amount',
    field: 'amount',
    label: 'Join Date',
    align: 'left',
    sortable: true
  },
  {
    name: 'paymentType',
    field: 'payment_type',
    label: 'Payment Type',
    align: 'left',
    sortable: true
  },
  {
    name: 'status',
    field: 'payment_due_status',
    label: 'Over Due',
    align: 'left',
    sortable: true
  },
])

const markPaid = async () => {
  try {
    await paymentsStore.updatePayment(currentTransaction.value.id)
    await accountsStore.getAccounts()
    update.value = false
    loading.value = false
  } catch (error) {
    loading.value = false
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}

const chargeAccount = async () => {
  if (currentTransaction.value.payment_type !== 'Credit Card') {
    markPaid()
    return
  }
  loading.value = true
  try {
    const data = {
      amount: currentTransaction.value.amount,
      confirm: 1,
      product_id: currentTransaction.value.log.product_id,
      log_id: currentTransaction.value.log.id,
    }
    await accountsStore.chargeAccount(currentTransaction.value.log.account_id, data)
    markPaid()
  } catch (error) {
    loading.value = false
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

<style lang="scss"></style>
