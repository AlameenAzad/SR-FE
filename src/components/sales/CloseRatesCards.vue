<template>
  <div>
    <div>
      <grid-layout :prevent-collision="true" :is-bounded="true" :layout="layout" :col-num="layout.length" :max-rows="1"
        is-draggable :is-resizable="false" :row-height="216">

        <grid-item v-for="item in layout" :static="item.static" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
          :i="item.i" :key="item.i" @move="moveEvent">

          <q-card square class="bg-transparent q-pa-lg no-shadow full-height text-center relative-position bordered-card"
            style="min-height: 17vh;">
            <span class="text-white bordered-card-label">{{ item.data.title }}</span>
            <q-card-section class="q-pb-none q-px-none font-32 text-weight-bold full-height relative-position">
              <div class="text-yellow text-center vertical-text">{{ item.data.num }}%</div>
            </q-card-section>
          </q-card>
        </grid-item>
      </grid-layout>
    </div>
    <!-- <div class="row q-col-gutter-md">
      <div class="col-4" v-for="(card, index) in cards" :key="index">
        <q-card square class="bg-transparent q-pa-lg no-shadow full-height text-center relative-position bordered-card"
          style="min-height: 17vh;">
          <span class="text-white bordered-card-label">{{ card.title }}</span>
          <q-card-section class="q-pb-none q-px-none font-32 text-weight-bold full-height relative-position">
            <div class="text-yellow text-center vertical-text">{{ card.num }}%</div>
          </q-card-section>
        </q-card>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { GridLayout, GridItem } from 'grid-layout-plus'
import { onMounted, ref, toRefs, watchEffect, watch } from 'vue'
const props = defineProps(['closingRates', 'itemsToShow'])
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
watch(
  () => props.itemsToShow,  // Watch the prop directly
  () => {
    setLayout()
  },
  { deep: true }
)
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
  // setLayout()
})
const layout = ref([])
function setLayout() {
  let temp = []
  let startX = 0
  let tempCards = cards.value.filter((card) => {
    let item = props.itemsToShow.find((item) => item.label === card.title)
    return item.value == true
  })
  tempCards.forEach((card, index) => {
    let obj = {
      x: startX,
      y: 0,
      w: 1,
      h: 1,
      i: index,
      data: card
    }
    temp.push(obj)
    startX = startX + 1

  })
  layout.value = temp
}
function moveEvent(i, newX, newY) {

  var p
  for (p = 0; p < layout.value.length; p++) {

    //Horizontal swapping
    if (
      newX >= layout.value[p]['x'] &&
      newX < layout.value[p]['x'] + layout.value[p]['w'] &&
      layout.value[i]['y'] == layout.value[p]['y'] &&
      i != layout.value[p]['i']
    ) {
      let initialX = layout.value[i]['x']
      let finalX = layout.value[p]['x']
      layout.value[i]['x'] = finalX
      layout.value[p]['x'] = initialX
    }
    //Vertical swapping
    if (
      newY >= layout.value[p]['y'] &&
      newY < layout.value[p]['y'] + 1 &&
      layout.value[i]['x'] == layout.value[p]['x'] &&
      i != layout.value[p]['i']
    ) {
      let initialY = layout.value[i]['y']
      let finalY = layout.value[p]['y']
      layout.value[i]['y'] = finalY
      layout.value[p]['y'] = initialY
    }
  }
}
</script>

<style lang="scss" scoped></style>
