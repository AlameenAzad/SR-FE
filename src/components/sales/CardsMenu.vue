<script setup>
import { defineEmits, defineProps, onMounted, ref, watch, computed } from 'vue'
const props = defineProps(['data', 'type'])
const emit = defineEmits(['itemsToshow'])
const items = ref([])
function setSummaryItems() {
    const { calls, offers, sales } = props.data
    const filteredItems = { calls, offers, sales }
    let tempItems = []
    Object.keys(filteredItems).forEach((key) => {
        tempItems.push({
            label: key,
            value: true
        })
    })
    items.value = tempItems

}

function setMonthToDateItems() {
    const cards = [
        {
            label: 'New Cash',
            value: true
        },
        {
            label: 'New Rev',
            value: true
        },
        {
            label: 'Total Cash',
            value: true
        },
        {
            label: 'Total Revenue',
            value: true
        },
        {
            label: 'AR Due',
            value: true
        },
        {
            label: 'AR Collected',
            value: true
        }
    ]
    items.value = cards

}
function setClosingRatesItems() {
    const cards = [{
        label: 'Calls To Close',
        value: true
    },
    {
        label: 'Calls To Offers',
        value: true
    },
    {
        label: 'Offers To Close',
        value: true
    },]
    items.value = cards
}
function setTotalUnitsItems() {
    const cards = [{
        label: 'STA',
        value: true
    },
    ]
    items.value = cards
}
onMounted(() => {
    switch (props.type) {
        case 'summary':
            setSummaryItems()
            break
        case 'monthToDate':
            setMonthToDateItems()
            break
        case 'closingRates':
            setClosingRatesItems()
            break
        case 'totalUnits':
            setTotalUnitsItems()
            break
        default:
            break
    }
})
watch(items,
    (newVal) => {
        if (newVal.length > 0) {
            emit('itemsToshow', newVal)
        }
    },
    {
        deep: true,
        immediate: true
    }
)
const disableCheckBox = computed(() => items.value.filter(item => item.value).length == 1)
</script>

<template>
    <div class="separator-icon-container">
        <q-icon name="settings" class="separator-icon"></q-icon>
        <q-menu class="bg-accent text-white" transition-show="jump-down" transition-hide="jump-up" fit
            v-if="items.length > 0">
            <q-list style="min-width: 100px">
                <q-item class="q-pl-sm" tag="label" v-ripple v-for="item in items" :key="'homeMenuItem' + item.label">
                    <q-item-section side top>
                        <q-checkbox v-model="item.value" color="red-10" :disable="disableCheckBox && item.value" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class="non-selectable	">{{ item.label }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-separator />
            </q-list>
        </q-menu>
    </div>
</template>

<style lang="scss"></style>
