<template>
  <grid-layout is-bounded :layout="layout" :col-num="12" :row-height="30" is-draggable :is-resizable="false"
    use-css-transforms>
    {{ layout }}
    <grid-item v-for="item in layout" :static="item.static" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
      :key="item.i">
      <div class="fit">
        <q-card class="bordered-card bg-page-color q-mb-lg fit">
          <p class="bordered-card-label">{{ item.i === 'cash' ? 'New Cash' : item.i.replace(/_/g, ' ') }}: <span
              class="text-red text-weight-bold"> {{
                Math.floor(moneyCards[item.card].total) ||
                Math.floor(moneyCards[item.card].total_count) || 0
              }} </span></p>
          <q-card-section v-if="moneyCards[item.card].items.length">
            <div class="row" v-for="(cardItem, childIndex) in moneyCards[item.card].items" :key="childIndex">
              <div class="col-6">
                <p class="q-mb-none q-mt-sm q-pl-xs">{{ cardItem.product }}</p>
              </div>
              <div class="col-6 text-right">
                <p class="q-mb-none q-mt-sm q-pr-xs">{{ Math.floor(cardItem[item.i] || cardItem.count) || 0 }}</p>
              </div>
              <!-- <div class="col-12 q-mt-sm" v-if="childIndex !== cardItem.items.length - 1">
                <q-separator dark />
              </div> -->
            </div>
          </q-card-section>
          <q-card-section class="text-center opacity q-mt-lg" v-else>
            <q-icon size='md' name="fa-solid fa-ghost" class="q-ml-sm" />
            <p class="q-mb-none q-mt-md">Start logging data to see them here</p>
          </q-card-section>
        </q-card>
      </div>
    </grid-item>
  </grid-layout>
</template>

<script setup>
import { GridLayout, GridItem } from 'grid-layout-plus'
import { useDashboardStore } from 'src/stores/dashboard'
import { computed, onMounted, reactive } from 'vue'
const dashboardStore = useDashboardStore()
const moneyCards = computed(() => dashboardStore.money)
const layout = reactive([])

const initLayout = () => {
  let colCount = 0
  let rowCount = 0

  for (let key in moneyCards.value) {
    const card = moneyCards.value[key]
    const cardLength = card.items.length ? card.items.length : 3
    layout.push({ 'x': colCount, 'y': rowCount, 'w': 3, 'h': cardLength + 2, 'i': key, card: key })
    if (colCount === 9) {
      if (rowCount > 0)
        rowCount += cardLength + 2
      else
        rowCount = cardLength + 2
      colCount = 0
    }
    else
      colCount += 3
  }
}


// end grid layout

onMounted(() => {
  initLayout()
})

</script>

<style lang="scss">
.vgl-layout {
  --vgl-placeholder-bg: #D40403;
}

// .vgl-layout::before {
//   position: absolute;
//   width: calc(100% - 5px);
//   height: calc(100% - 5px);
//   margin: 5px;
//   content: '';
//   background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
//     linear-gradient(to bottom, lightgrey 1px, transparent 1px);
//   background-repeat: repeat;
//   background-size: calc(calc(100% - 5px) / 12) 40px;
// }

// :deep(.vgl-item:not(.vgl-item--placeholder)) {
//   background-color: #ccc;
//   border: 1px solid black;
// }

// :deep(.vgl-item--resizing) {
//   opacity: 90%;
// }

// :deep(.vgl-item--static) {
//   background-color: #cce;
// }
</style>
