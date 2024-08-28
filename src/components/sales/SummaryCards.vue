<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { GridLayout, GridItem } from 'grid-layout-plus'
import Gauge from 'components/charts/Gauge.vue'
const props = defineProps(['summary', 'itemsToShow'])
const layout = ref([])
const refreshLayout = ref(0)
function setLayout() {

    layout.value = []
    let temp = []
    let startX = 0
    let widthX = 1
    let showCount = 0
    Object.keys(gauges.value).forEach((key) => {
        const showItem = props.itemsToShow.find((item) => item.label == key).value
        if (showItem) {
            temp.push({ 'x': startX, 'y': 0, 'w': widthX, 'h': 1, 'i': showCount, data: { gauge: gauges.value[key], forecast: forecasts.value[key], label: key } })
            startX = startX + widthX
            showCount++
        }
    })

    layout.value = temp

    refreshLayout.value++
}
onMounted(() => {

    // setLayout()
})
const gauges = computed(() => {
    const { calls, offers, sales } = props.summary
    const result = Object.entries({ calls, offers, sales })
        .reduce((acc, [key, value]) => {
            if (value !== undefined) acc[key] = value
            return acc
        }, {})
    return result
})
const forecasts = computed(() => {
    const { calls, offers, sales } = props.summary.forecast
    return { calls, offers, sales }
})
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

<template>
    <div :key="refreshLayout">

        <grid-layout :prevent-collision="true" :is-bounded="true" :layout="layout" :col-num="layout.length"
            :row-height="260" :max-rows="1" is-draggable :is-resizable="false">

            <grid-item v-for="item, index in layout" :static="item.static" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                :i="item.i" :key="item.i" @move="moveEvent">
                <Gauge :value="item.data.gauge" :key-value="index" :title="item.data.label"
                    :forecasted="item.data.forecast" />
            </grid-item>
        </grid-layout>

    </div>
</template>

<style></style>
