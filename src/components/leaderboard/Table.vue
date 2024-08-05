<template>
  <q-table :filter="filter" :rows="rows" :columns="columns" row-key="name" dark flat color="red"
    :pagination="paginationObj" bordered card-class="table-class">
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          {{ col.value }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps(['data'])
const paginationObj = {
  rowsPerPage: 15,
  sortBy: 'regDate',
  descending: true
}
const filter = ref('')
const columns = ref([
  // {
  //   name: 'position',
  //   field: 'position',
  //   required: true,
  //   label: 'Position',
  //   align: 'left',
  //   sortable: true
  // },
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'left',
    sortable: true
  },
  {
    name: 'cash',
    field: 'cash',
    label: 'Cash',
    align: 'left',
    sortable: true
  },
  {
    name: 'inbound',
    field: 'cash_inbound',
    label: 'Inbound',
    align: 'left',
    sortable: true
  },
  {
    name: 'outbound',
    field: 'cash_outbound',
    label: 'Outbound',
    align: 'left',
    sortable: true
  },
  {
    name: 'inboundCalls',
    field: 'inbound_calls',
    label: 'Inbound Calls',
    align: 'left',
    sortable: true
  },
  {
    name: 'outboundCalls',
    field: 'outbound_calls',
    label: 'Outbound Calls',
    align: 'left',
    sortable: true
  },
  {
    name: 'offers',
    field: 'offers',
    label: 'Offers',
    align: 'left',
    sortable: true
  },
  {
    name: 'offerOutbound',
    field: 'offer_outbound',
    label: 'Offer Outbound',
    align: 'left',
    sortable: true
  },
  {
    name: 'sales',
    field: 'sales',
    label: 'Sales',
    align: 'left',
    sortable: true
  },
])

const rows = ref(props.data)

</script>

<style lang="scss" scoped>
.table-class {
  border: 1px solid white;
  background-color: $page-color;
}
</style>
