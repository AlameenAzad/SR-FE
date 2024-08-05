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
      <q-btn square color="yellow" class="font-16 text-black" label="New Rep"
        @click="currentViewedUser = {}; userCreationDialog = true" />
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
        <q-td auto-width>
          <q-btn flat color="yellow" class="font-16 text-black" label="Edit"
            @click="currentViewedUser = props.row; userCreationDialog = true" />
        </q-td>
      </q-tr>
    </template>
  </q-table>
  <q-dialog v-model="userCreationDialog">
    <userCreation :currentViewedUser="currentViewedUser" @userAdded="userCreationDialog = false" />
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import userCreation from './Creation.vue'
import { useRepsStore } from 'src/stores/reps'
const repsStore = useRepsStore()
const $q = useQuasar()

const paginationObj = {
  rowsPerPage: 15,
  sortBy: 'regDate',
  descending: true
}
const userCreationDialog = ref(false)
const currentViewedUser = ref({})
const filter = ref('')
const columns = ref([
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
    name: 'createdAtt',
    field: 'created_at',
    label: 'Join Date',
    align: 'left',
    sortable: true,
    format: (val) => `${val.split(' ')[0]}`
  },
  {
    name: 'userType',
    field: 'user_type',
    label: 'Type',
    align: 'left',
    sortable: true
  },
])

const rows = ref(computed(() => repsStore.allReps))

const getAllReps = async () => {
  try {
    await repsStore.getAllReps()
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
  await getAllReps()

})
</script>

<style lang="scss" scoped>
.table-class {
  border: 1px solid white;
  background-color: $page-color;
}
</style>
