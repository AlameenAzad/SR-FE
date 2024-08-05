<template>
  <grid-layout is-bounded :layout="layout" :col-num="12" :row-height="30" is-draggable :is-resizable="false"
    use-css-transforms>
    <grid-item v-for="item in layout" :static="item.static" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
      :key="item.i">
      <div class="fit">
        <q-card class="bordered-card bg-transparent q-mb-lg">
          <p class="bordered-card-label">{{ repsCards[item.rep].rep }}</p>
          <q-card-section>
            <div class="row" v-for="(attribute, attrIndex) in repsCards[item.rep]" :key="attrIndex">
              <div class="col-12 row" v-if="attrIndex !== 'rep'">
                <div class="col-6">
                  <p class="q-mb-none q-mt-sm q-pl-xs">{{ attrIndex === 'avg_price' ? 'AOV' : attrIndex }}</p>
                </div>
                <div class="col-6 text-right">
                  <p class="q-mb-none q-mt-sm q-pr-xs">{{ attribute }}</p>
                </div>
                <div class="col-12 q-mt-sm">
                  <q-separator dark />
                </div>
              </div>
            </div>
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
const repsCards = computed(() => dashboardStore.moneyReps)
const layout = reactive([])

const initLayout = () => {
  let colCount = 0
  let rowCount = 0

  for (let key in repsCards.value) {
    const cardLength = 5
    layout.push({ 'x': colCount, 'y': rowCount, 'w': 3, 'h': cardLength + 2, 'i': key, rep: key })
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
