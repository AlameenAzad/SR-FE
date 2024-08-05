<template>
  <div>
    <q-form class="q-gutter-md q-mt-lg" ref="validatedForm">
      <q-input v-model="formObj.name" label="Plan Name" color="red" dense dark type="text" class="q-my-lg"
        :rules="[rules.required]" lazy-rules="ondemand"></q-input>
      <q-input v-model="formObj.amount" label="Plan Amount" color="red" dense dark type="number" class="q-my-lg"
        :rules="[rules.required]" lazy-rules="ondemand"></q-input>
      <q-select v-model="formObj.type" color="red" :options="planTypes" label="Plan Type" dark class="q-my-lg"
        :rules="[rules.required]" lazy-rules="ondemand" />
      <q-select v-if="formObj.type?.value === 'split_pay'" v-model="formObj.term" color="red" :options="planTerms"
        label="Plan Term" dark class="q-my-lg" :rules="[rules.required]" lazy-rules="ondemand" />
      <div class="q-px-sm">
        <q-btn square label="Add Plan" color="accent" class="full-width skew-btn q-py-sm" @click="addPlan" />
      </div>
    </q-form>
    <q-card class="bordered-card-white bg-transparent q-pa-md q-my-xl" v-if="pricingPlans.length">
      <p class="bordered-card-label text-white">Plans</p>
      <q-card-section>
        <div class="row" v-for="(plan, index) in pricingPlans" :key="plan.name">
          <div class="col-11">
            <p class="q-mb-none q-mt-sm">
              <span class="q-mr-lg">Plan Name: {{ plan.name }}</span>
              <span class="q-mr-lg">Amount: {{ plan.amount }}</span>
              <span class="q-mr-lg">Type: {{ plan.type }}</span>
              <span class="q-mr-lg" v-if="plan.term">Term: {{ plan.term }}</span>
            </p>
          </div>
          <div class="col-1 text-center">
            <q-btn round dense :ripple="false" flat icon="close" @click="pricingPlans.splice(index, 1)" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { rules } from 'src/helper/formRules'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const validatedForm = ref(null)
const pricingPlans = ref([])

const formObj = ref({
  name: '',
  amount: '',
  type: null
})

const planTypes = [
  { label: 'Full Pay', value: 'full_pay' },
  { label: 'Split Pay', value: 'split_pay' },
]

const planTerms = [
  '1 month',
  '2 month',
  '3 month',
  '4 month',
  '5 month',
  '6 month',
  '7 month',
  '8 month',
  '9 month',
  '10 month',
  '11 month',
  '12 month',
]

const addPlan = async () => {
  if (await validatedForm.value.validate(true)) {
    let { name, amount, type, term } = formObj.value

    const plan = {
      name,
      amount,
      type: type.value
    }

    if (type.value === 'split_pay' && term) plan.term = term

    pricingPlans.value.push(plan)
    formObj.value = {
      name: '',
      amount: '',
      type: null
    }
  }
}

const getPricingPlans = () => {
  if (pricingPlans.value.length) {
    return pricingPlans
  } else {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'You need at least one pricing plan!'
    })
  }

}

defineExpose({
  getPricingPlans,
  formObj,
  pricingPlans
})
</script>

<style lang="scss" scoped></style>
