<template>
  <div class="row q-col-gutter-md">
    <div class="col-4" v-for="(card, index) in totalUnits" :key="index">
      <q-card square class="bg-transparent q-pa-lg no-shadow full-height text-center relative-position bordered-card"
        style="min-height: 17vh;">
        <span class="text-white bordered-card-label">{{ card.product.substr(0, 13) }}...</span>
        <q-card-section class="q-pb-none q-px-none font-60 text-weight-bold full-height relative-position">
          <div class="text-yellow text-center vertical-text">{{ card.count }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from 'src/stores/dashboard'
const dashboardStore = useDashboardStore()
const totalUnits = computed(() => dashboardStore.totalUnits)

</script>

<style lang="scss" scoped>
.vertical-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
