<script setup>
import { onMounted, ref } from 'vue'
import { usePathStore } from 'src/stores/path'
import { rules } from 'src/helper/formRules'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const emit = defineEmits(['submited'])
const pathStore = usePathStore()
const metrics = ref([])
const form = ref({
    name: '',
    metric_from: [],
    metric_to: [],
})
const loading = ref(false)
const getMetrics = async () => {
    if (pathStore.$state.metrics == null)
        metrics.value = await pathStore.getMetrics()
    else metrics.value = pathStore.$state.metrics
}
async function submit() {
    loading.value = true
    api.post('/api/closing-rates', form.value).then((res) => {
        if (res.status >= 200 && res.status < 300) {
            emit('submited')
        }
        loading.value = false
    }).catch(() => {
        $q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'thumb_down',
            position: 'top-right',
            message: 'Something Went Wrong!'
        })
        loading.value = false
    })
}
onMounted(() => {
    getMetrics()
})
</script>

<template>
    <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 60%">
        <q-card-section class="row justify-end">
            <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-form @submit="submit">
            <q-card-section>
                <div class="row q-col-gutter-lg">
                    <q-input v-model="form.name" label="Name" lazy-rules="ondemand" color="red" dense dark type="text"
                        class="col-12" :rules="[rules.required]"></q-input>

                    <q-select v-model="form.metric_from" multiple color="red" :options="metrics" label="Metric From" dark
                        dense option-label="name" option-value="id" map-options emit-value :rules="[rules.requiredArray]"
                        class="col-6" />

                    <q-select v-model="form.metric_to" multiple color="red" :options="metrics" label="Metric To" dark dense
                        option-label="name" option-value="id" map-options emit-value :rules="[rules.requiredArray]"
                        class="col-6" />
                </div>
            </q-card-section>

            <q-card-section>
                <q-btn color="red" label="Create" class="full-width" type="submit" :loading="loading"></q-btn>
            </q-card-section>
        </q-form>
    </q-card>
</template>

<style></style>
