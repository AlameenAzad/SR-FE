<template>
  <q-table :filter="filter" :rows="rows" :columns="columns" row-key="name" dark flat color="red"
    :pagination="paginationObj" bordered card-class="table-class">
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
        <q-th auto-width>Options</q-th>
      </q-tr>
    </template>

    <template v-slot:top>
      <q-btn square color="yellow" class="font-16 text-black" label="New Account"
        @click="currentViewedUser = {}; accountDialog = true" />
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
          <q-badge v-if="col.name === 'status'" :color="col.value ? 'red' : 'green'">
            {{ col.value ? 'OverDue' : 'Paid' }}
          </q-badge>
          <span v-else>
            {{ col.value }}
          </span>
        </q-td>
        <q-td auto-width>
          <q-btn flat color="yellow" class="font-16 text-black" label="View"
            @click="currentViewedUser = props.row; accountDialog = true;" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog v-model="accountDialog">
    <viewAccount :currentViewedUser="currentViewedUser" @close-dialog="accountDialog = false" />
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { useQuasar } from 'quasar'
import { useAccountsStore } from 'src/stores/accounts'
import viewAccount from './view.vue'

const $q = useQuasar()
const accountsStore = useAccountsStore()

const paginationObj = {
  rowsPerPage: 15,
  sortBy: 'regDate',
  descending: true
}
let accountDialog = ref(false)
let currentViewedUser = reactive({})
const filter = ref('')
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
    name: 'name',
    field: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    sortable: true
  },
  {
    name: 'email',
    field: 'email',
    label: 'Email',
    align: 'left',
    sortable: true
  },
  {
    name: 'regDate',
    field: 'regDate',
    label: 'Join Date',
    align: 'left',
    sortable: true
  },
  {
    name: 'status',
    field: 'hasOverDue',
    label: 'Status',
    align: 'left',
    sortable: true
  },
])

const rows = ref(computed(() => accountsStore.accountsSimplified))

const getAccounts = async () => {
  try {
    await accountsStore.getAccounts()
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

onMounted(async () => {
  await getAccounts()

})
</script>

<style lang="scss" scoped>
.table-class {
  border: 1px solid white;
  background-color: $page-color;
}
</style>
