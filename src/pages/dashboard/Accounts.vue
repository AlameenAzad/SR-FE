<template>
  <div class="q-mt-xl" padding>
    <div class="row">
      <div class="col-3 q-pa-md">
        <filters />
      </div>
      <div class="col-9 q-pa-md">
        <userTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import filters from 'components/accounts/Filters.vue'
import userTable from 'components/accounts/Table.vue'

</script>

<style lang="scss"></style>
