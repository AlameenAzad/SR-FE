<template>
  <div class="row q-col-gutter-md">
    <div class="col-4" v-for="(card, index) in cards" :key="index">
      <q-card square class="bg-transparent q-pa-lg no-shadow full-height text-center relative-position bordered-card"
        style="min-height: 17vh;">
        <span class="text-white bordered-card-label">{{ card.title }}</span>
        <q-card-section class="q-pb-none q-px-none font-32 text-weight-bold full-height relative-position">
          <div class="text-yellow text-center vertical-text">{{ card.num }}%</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs, watchEffect } from 'vue'
const props = defineProps(['closingRates'])
const { closingRates } = toRefs(props)

const cards = ref([
  {
    title: 'Call To Close',
    num: 27
  },
  {
    title: 'Call To Close',
    num: 5
  },
  {
    title: 'Call To Close',
    num: 100
  },
])

watchEffect(() => {
  const { calls_to_close: callsToClose, calls_to_offers: callsToOffers, offers_to_close: offersToClose } = closingRates.value
  cards.value = [
    {
      title: 'Calls To Close',
      num: callsToClose
    },
    {
      title: 'Calls To Offers',
      num: callsToOffers
    },
    {
      title: 'Offers To Close',
      num: offersToClose
    }
  ]
})
onMounted(() => {
  const { calls_to_close: callsToClose, calls_to_offers: callsToOffers, offers_to_close: offersToClose } = closingRates.value
  cards.value = [
    {
      title: 'Calls To Close',
      num: callsToClose
    },
    {
      title: 'Calls To Offers',
      num: callsToOffers
    },
    {
      title: 'Offers To Close',
      num: offersToClose
    }
  ]
})
</script>

<style lang="scss" scoped></style>
