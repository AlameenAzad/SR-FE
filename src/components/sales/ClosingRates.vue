<template>
  <q-card square class="q-pa-sm" style="background-color: #212121">
    <q-card-section horizontal class="bg-light-gradient cut--3 q-py-xs q-mb-md justify-center">
      <div class="col-auto">Closing Rates</div>
    </q-card-section>

    <q-card-section horizontal class="q-card__content q-col-gutter-x-md">
      <div class="col-12 col-md-4" v-for="(unit, index) in units" :key="index">
        <div class="full-height column justify-between q-pa-sm cut--4 text-center" style="background: #2f2f2f">
          <q-separator inset class="q-card__separator" />
          <h2 class="text-amber-3 text-weight-bold">
            {{ unit.quantity }}
          </h2>
          <q-separator inset class="q-card__separator" />
          <p class="text-white q-my-none">{{ unit.name }}</p>
          <q-separator inset class="q-card__separator" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const units = [
  {
    quantity: '%27',
    name: 'Product 1',
  },
  {
    quantity: '%27',

    name: 'Product 1',
  },
  {
    quantity: '%27',

    name: 'Product 1',
  },
]
</script>

<style scoped lang="scss">
.q-card {
  &__content {
    height: 240px;
  }

  &__separator {
    background: rgb(255, 255, 255);
    background: linear-gradient(90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 1) 50%,
        rgba(255, 255, 255, 0) 100%);
  }
}
</style>
