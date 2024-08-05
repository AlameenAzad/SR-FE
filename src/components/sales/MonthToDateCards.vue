<template>
  <div class="row q-col-gutter-md">
    <div class="col-2" v-for="(card, index) in cards" :key="index">
      <q-card square class="bg-transparent q-pa-lg no-shadow full-height text-center relative-position"
        :class="index < 3 ? 'bordered-card-red' : 'bordered-card'" style="min-height: 220px;">
        <span class="text-white bordered-card-label" :class="index < 3 ? 'text-red' : ''">{{ card.title }}</span>
        <div class="img-class" :style="'background-image: url(\'/icons/coins/' + getImg(card.num).src + '\');'">
        </div>
        <q-card-section class="absolute q-pb-none" style="bottom:15px; left: 0; right: 0;">
          <div class="text-white text-center">{{ Math.floor(card.num) }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRefs, watchEffect } from 'vue'
const props = defineProps(['monthToDate'])
const { monthToDate } = toRefs(props)
const cards = ref([
  {
    title: 'New Cash',
    num: 3000
  },
  {
    title: 'New Rev',
    num: 6000
  },
  {
    title: 'Total Cash',
    num: 6000
  },
  {
    title: 'Total Revenue',
    num: 90000
  },
  {
    title: 'AR Due',
    num: 0
  },
  {
    title: 'AR Collected',
    num: 6000
  },

])

const imgSelection = ref({
  small: {
    src: 'tiny-coin.png',
    condition: 0
  },
  mid: {
    src: 'mid-coin.png',
    condition: 20000
  },
  big: {
    src: 'big-coin.png',
    condition: 40000
  },
  bigger: {
    src: 'bigger-coin.png',
    condition: 60000
  },
  bank: {
    src: 'cash-bank-coin.png',
    condition: 80000
  },
})

const getImg = (num) => {
  const objectsArray = Object.values(imgSelection.value)

  return objectsArray.reduce((prev, current) => num >= current.condition ? current : prev, objectsArray[0]) // Initialize with the first object (small in this case)
}

watchEffect(() => {
  const { new_cash, new_revenue, total_cash, total_revenue, ar_due, ar_collected } = monthToDate.value
  cards.value[0].num = new_cash
  cards.value[1].num = new_revenue
  cards.value[2].num = total_cash
  cards.value[3].num = total_revenue
  cards.value[4].num = ar_due
  cards.value[5].num = ar_collected
})
onMounted(() => {
  const { new_cash, new_revenue, total_cash, total_revenue, ar_due, ar_collected } = props.monthToDate
  cards.value[0].num = new_cash
  cards.value[1].num = new_revenue
  cards.value[2].num = total_cash
  cards.value[3].num = total_revenue
  cards.value[4].num = ar_due
  cards.value[5].num = ar_collected
})
</script>

<style lang="scss" scoped>
.img-class {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 140px;
  overflow: hidden;
}
</style>
