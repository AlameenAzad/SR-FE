<template>
  <q-card square class="q-pa-sm" style="background-color: #212121">
    <q-card-section horizontal class="bg-light-gradient cut--3 q-py-xs q-mb-md justify-center">
      <div class="col-auto">Month to Date Cash</div>
    </q-card-section>

    <q-card-section horizontal class="q-card__content q-col-gutter-x-md">
      <div class="col-12 col-md-4 q-pa-sm" v-for="(unit, index) in units" :key="index">
        <div class="full-height column justify-end q-pa-sm cut--4 text-center">
          <coin-stack :money="unit.price" :text="unit.name" />
        </div>
        <q-separator inset class="q-card__separator" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import CoinStack from 'components/common/CoinStack.vue'

const units = [
  {
    price: 10000,
    name: 'Product 1',
  },
  {
    price: 50000,
    name: 'Product 1',
  },
  {
    price: 100000,
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

<!--
<template>
  <q-card square class="bg-black my-card q-pa-sm cut--2--large">
    <q-card-section
      horizontal
      class="bg-light-gradient cut--2 q-py-xs q-mb-md justify-center"
    >
      <div class="col-auto">Month to Date Cash</div>
    </q-card-section>

    <q-card-section horizontal class="q-col-gutter-md items-end">
      <div class="col-12 col-md-3">
        <div class="q-pa-sm cut--4 text-center">
          <coin-stack :money="10000" text="Cash" />
        </div>
      </div>
      <div class="col-12 col-md-3 q-mx-lg">
        <div class="q-pa-sm cut--4 text-center">
          <coin-stack :money="50000" text="Cash Outbound" />
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="q-pa-sm cut--4 text-center">
          <coin-stack :money="100000" text="Total Cash" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template> -->
