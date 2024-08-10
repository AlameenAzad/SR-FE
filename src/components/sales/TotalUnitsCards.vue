<template>
  <div>
    <div>
      <grid-layout :prevent-collision="true" :is-bounded="true" :layout="layout" :col-num="3" :max-rows="1" is-draggable
        :is-resizable="false" :row-height="216">

        <grid-item v-for="item in layout" :static="item.static" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
          :i="item.i" :key="item.i" @move="moveEvent">

          <q-card square class="bg-transparent q-pa-lg no-shadow full-height text-center relative-position bordered-card"
            style="min-height: 17vh;">
            <span class="text-white bordered-card-label">{{ item.data.product.substr(0, 13) }}...</span>
            <q-card-section class="q-pb-none q-px-none font-60 text-weight-bold full-height relative-position">
              <div class="text-yellow text-center vertical-text">{{ item.data.count }}</div>
            </q-card-section>
          </q-card>
        </grid-item>
      </grid-layout>
    </div>
    <!-- <div class="row q-col-gutter-md">
      <div class="col-4" v-for="(card, index) in totalUnits" :key="index">
        <q-card square class="bg-transparent q-pa-lg no-shadow full-height text-center relative-position bordered-card"
          style="min-height: 17vh;">
          <span class="text-white bordered-card-label">{{ card.product.substr(0, 13) }}...</span>
          <q-card-section class="q-pb-none q-px-none font-60 text-weight-bold full-height relative-position">
            <div class="text-yellow text-center vertical-text">{{ card.count }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { GridLayout, GridItem } from 'grid-layout-plus'

import { watch, computed, ref, defineProps } from 'vue'
import { useDashboardStore } from 'src/stores/dashboard'
const props = defineProps(['itemsToShow'])
const dashboardStore = useDashboardStore()
const totalUnits = computed(() => dashboardStore.totalUnits)
const layout = ref([])
function setLayout() {
  let cards = Object.keys(totalUnits.value)
  let tempCards = cards.filter((card) => {

    let item = props.itemsToShow.find((item) => item.label === totalUnits.value[card].product)
    return item.value == true
  })
  let temp = []
  let startX = 0

  tempCards.forEach((key, index) => {
    let obj = {
      x: startX,
      y: 0,
      w: 1,
      h: 1,
      i: index,
      data: totalUnits.value[key]
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
watch(
  () => props.itemsToShow,  // Watch the prop directly
  () => {
    setLayout()
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.vertical-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
