<script setup>
const props = defineProps(['type', 'item'])
const emit = defineEmits(['cancel', 'deleted'])
import { computed, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const loading = ref(false)
const msg = computed(() => {
    switch (props.type) {
        case 'ClosingRates':
            return `Are you sure you want to delete '${props.item.label}' card from '${props.type.split(/(?=[A-Z])/).join(' ')}'?`
        default:
            return ''
    }
})
async function deleteClosingRated() {
    try {
        const { data } = await api.get('/api/closing-rates')
        let id = data.data.find((el) => el.name == props.item.label).id
        if (id == undefined) throw new Error('Not Found')
        else {
            api.delete(`/api/closing-rates/${id}`).then(() => {
                $q.notify({
                    color: 'positive',
                    textColor: 'white',
                    icon: 'thumb_up',
                    position: 'top-right',
                    message: 'Deleted Successfully'
                })
                loading.value = false
                emit('deleted')
            }).catch(() => {
                throw new Error()
            })
        }

    } catch (e) {
        loading.value = false
        $q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'thumb_down',
            position: 'top-right',
            message: 'Something Went Wrong!'
        })
    }
}
function deleteItem() {
    loading.value = true
    switch (props.type) {
        case 'Summary':
            break
        case 'MonthToDate':
            break
        case 'ClosingRates':
            deleteClosingRated()
            break
        case 'TotalUnits':
            break
        default:
            break
    }
}
</script>

<template>
    <q-card dark flat class="bg-page-color q-pa-md" style="width: 400px">
        <q-card-section>
            {{ msg }}
        </q-card-section>
        <q-card-section class="row">
            <div class="col-6 q-pr-sm">
                <q-btn label="cancel" class="full-width" color="red" outline @click="emit('cancel')"
                    :loading="loading"></q-btn>
            </div>
            <div class="col-6 q-pl-sm">
                <q-btn label="delete" class="full-width" color="red" @click="deleteItem()" :loading="loading"></q-btn>
            </div>
        </q-card-section>
    </q-card>
</template>
 color="red"
<style></style>
