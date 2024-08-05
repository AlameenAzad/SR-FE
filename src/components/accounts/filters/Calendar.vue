<template>
  <div class="text-red separator-with-title q-mb-md font-16 q-mb-lg"><span>Date Range</span></div>
  <q-btn outline class="full-width date-btn q-pa-md" text-color="white">
    <q-popup-proxy transition-show="scale" transition-hide="scale">
      <q-date v-model="dateRange" dark color="yellow" text-color="black" range>
        <div class="row items-center justify-end">
          <q-btn v-close-popup label="Close" color="yellow" flat />
        </div>
      </q-date>
    </q-popup-proxy>
    {{ formattedDate }} <span> <q-icon size='xs' name="fa-solid fa-calendar-days" class="q-ml-sm" /></span>
  </q-btn>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
const dateRange = ref(null)
const formattedDate = ref('All')

watchEffect(dateRange, (newDateRange) => {
  formattedDate.value = `${newDateRange.from} - ${newDateRange.to}`
})
</script>

<style lang="scss"></style>
