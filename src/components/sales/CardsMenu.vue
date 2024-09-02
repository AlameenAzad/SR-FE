<script setup>
import { defineEmits, defineProps, onMounted, ref, watch, computed, toRef } from 'vue'
import AddClosingRates from './AddClosingRates.vue'
import DeleteCardItem from './DeleteCardItem.vue'
import { useDashboardStore } from 'src/stores/dashboard'

const dashboardStore = useDashboardStore()
const data = toRef(props, 'data')
const props = defineProps(['data', 'type'])
const emit = defineEmits(['itemsToshow'])
const items = ref([])
const deleteDialog = ref({
    state: false,
    item: null
})
function setSummaryItems() {
    const { calls, offers, sales } = data.value
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
    const cards = []
    Object.keys(data.value).forEach((cardKey) => {
        let obj = {
            label: cardKey,
            value: true
        }
        cards.push(obj)
    })
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
function refresh() {
    dashboardStore.getDashboardData()
    addDialog.value = false
    deleteDialog.value.state = false
    deleteDialog.value.item = null
}

function deleteItem(item) {
    deleteDialog.value.item = item
    deleteDialog.value.state = true
}
const addDialog = ref(false)
function setupMenu() {
    switch (props.type) {
        case 'Summary':
            setSummaryItems()
            break
        case 'MonthToDate':
            setMonthToDateItems()
            break
        case 'ClosingRates':
            setClosingRatesItems()
            break
        case 'TotalUnits':
            setTotalUnitsItems()
            break
        default:
            break
    }
}
onMounted(() => {
    setupMenu()

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

watch(data,
    () => {
        setupMenu()
    },
    {
        deep: true,
    }
)
const disableCheckBox = computed(() => items.value.filter(item => item.value).length == 1)
const deletable = computed(() => props.type == 'ClosingRates')

</script>

<template>
    <div class="separator-icon-container">
        <q-icon name="settings" class="separator-icon"></q-icon>
        <q-menu class="bg-accent text-white" transition-show="jump-down" transition-hide="jump-up" fit
            v-if="items.length > 0">
            <q-list style="min-width: 100px">
                <q-item class="q-pl-sm text-center" :tag="deletable ? 'div' : 'label'" v-ripple="deletable ? true : false"
                    v-for="item in items" :key="'homeMenuItem' + item.label" :clickable="true">
                    <q-item-section side top>
                        <q-checkbox v-model="item.value" color="red-10" :disable="disableCheckBox && item.value" />
                    </q-item-section>

                    <q-item-section>
                        <q-item-label class="non-selectable">{{ item.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side @click.stop="deleteItem(item)" v-if="deletable">
                        <q-icon name="delete_forever" color="white" class="dashboard-menu-item-delete"></q-icon>
                    </q-item-section>
                </q-item>
                <q-separator />
                <q-item class="q-pl-md text-center" clickable @click="addDialog = true">
                    <q-item-section side>
                        <q-icon name="add" color="white"></q-icon>
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="non-selectable">Add More</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-menu>

        <q-dialog v-model="addDialog">
            <AddClosingRates v-if="props.type == 'ClosingRates'" @submited="refresh()" />
        </q-dialog>

        <q-dialog v-model="deleteDialog.state" persistent>
            <DeleteCardItem :type="props.type" :item="deleteDialog.item" @deleted="refresh()"
                @cancel="deleteDialog.state = false" />
        </q-dialog>
    </div>
</template>

<style lang="scss">
.dashboard-menu-item-delete {
    transition-duration: 0.3s;
    cursor: pointer;

    &:hover {
        color: #D40403 !important;
    }
}
</style>
