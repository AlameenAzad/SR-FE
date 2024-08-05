<template>
  <div class="row justify-center full-width">
    <div class="col-8">
      <div class="q-mt-xl">
        <q-card class="bordered-card-white bg-transparent q-pa-md">
          <div :class="!toggleForm ? 'bordered-card-btn' : ''">
            <q-btn color="red" label="Create New Metric" @click="prepForm()" v-if="!toggleForm" />
            <p class="bordered-card-label text-red" v-else>{{ currentForm.label }}</p>
          </div>
          <q-card-section v-if="!toggleForm">
            <div class="row" :class="index !== metrics.length - 1 ? 'q-mb-sm' : ''" v-for="(metric, index) in metrics"
              :key="metric">
              <div class="col-6">
                <p class="q-mb-none q-mt-sm"> {{ metric.name }} </p>
              </div>
              <div class="col-6 text-right">
                <q-btn flat color="yellow" label="Edit" @click="prepForm(metric)" />
                <q-btn flat color="red" label="DELETE" @click="deleteMetric(metric)" />
              </div>
              <div class="col-12 q-mt-sm" v-if="index !== metrics.length - 1">
                <q-separator dark />
              </div>
            </div>
          </q-card-section>
          <q-card-section v-else>
            <q-form class="q-gutter-md q-mt-lg" ref="validatedForm">
              <q-input v-for="inputs in currentForm.inputs" :key="inputs.label" v-model="inputs.value"
                :label="inputs.label" color="red" dense dark :type="inputs.type" :class="inputs.classes"
                :rules="inputs.rules" lazy-rules="ondemand" />
              <q-select v-for="select in currentForm.selects" :key="select.label" v-model="select.value" color="red"
                :options="select.options" :label="select.label" dark :class="select.classes" :rules="select.rules"
                lazy-rules="ondemand" :option-label="select.optionLabel ? select.optionLabel : ''"
                :option-value="select.optionValue ? select.optionValue : ''" />
              <div class="row q-gutter-md justify-center">
                <div class="col-12">
                  <q-btn square :label="currentForm.last ? 'Submit' : 'Next'"
                    :color="currentForm.last ? 'red' : 'yellow'" class="full-width q-mt-lg skew-btn q-py-sm"
                    :class="currentForm.last ? 'animated-btn-hover animated-btn-hover-yellow' : 'text-black'"
                    @click="currentForm.buttonMethod" />
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePathStore } from 'src/stores/path'
import { rules } from 'src/helper/formRules'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const pathStore = usePathStore()
const currentForm = ref(null)
let toggleForm = ref(false)
let metrics = ref([])
const validatedForm = ref(null)
let editMetricId = ref(null)
const metricOptions = [
  { label: 'Log Type', value: 'log_type' },
  { label: 'Call Type', value: 'call_type' },
  { label: 'Call Sequence', value: 'call_sequence' },
  { label: 'Call Result', value: 'call_result' },
  { label: 'Offer Result', value: 'offer_result' },
  { label: 'Payment Type', value: 'payment_type' },
]

const metricForm = [
  {
    last: true,
    label: 'Metric Details',
    inputs: [
      {
        label: 'Metric Name',
        classes: 'q-my-lg',
        type: 'text',
        value: '',
        rules: [rules.required],
      },
      {
        label: 'Metric Description',
        classes: 'q-my-lg',
        type: 'textarea',
        value: '',
        rules: [],
      },
    ],
    selects: [
      {
        label: 'Metric Type',
        classes: 'q-my-lg',
        value: '',
        rules: [rules.required],
        options: metricOptions,
        optionLabel: 'label',
        optionValue: 'value',
      },
    ],
    buttonMethod: async () => {
      console.log('buttonMethod')
      if (await validatedForm.value.validate(true)) {
        addMetric()
      }
    }
  },
]

const getMetrics = async () => {
  metrics.value = await pathStore.getMetrics()
}

const addMetric = async () => {
  try {
    await pathStore.addMetric(
      {
        name: currentForm.value.inputs[0].value,
        description: currentForm.value.inputs[1].value,
        category: currentForm.value.selects[0].value.value,
        id: editMetricId.value,
      })
    currentForm.value.inputs[0].value = ''
    currentForm.value.inputs[1].value = ''
    currentForm.value.selects[0].value = ''
    getMetrics()
    toggleForm.value = false
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Metric Added!'
    })
  }
  catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}

const deleteMetric = async (metric) => {
  try {
    await pathStore.deleteMetric(metric.id)
    getMetrics()
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Metric Deleted!'
    })
  }
  catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}

const editMetric = (metric) => {
  currentForm.value.inputs[0].value = metric.name
  currentForm.value.inputs[1].value = metric.description
  currentForm.value.selects[0].value = metricOptions.find(option => option.value === metric.category)
  editMetricId.value = metric.id
  toggleForm.value = true
}

const prepForm = (metric) => {
  currentForm.value = metricForm[0]
  if (metric)
    editMetric(metric)
  toggleForm.value = true
}

getMetrics()
</script>

<style lang="scss" scoped></style>
