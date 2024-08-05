<template>
  <q-card class="bordered-card-white bg-transparent q-pa-md" style="height: fit-content;">
    <div>
      <p class="bordered-card-label text-red">{{ currentStep }}</p>
    </div>
    <q-card-section class="q-pb-none">
      <productDetailsComp ref="productDetails" :class="currentStep === 'Product Details' ? '' : 'hidden'" />
      <pricingPlansComp ref="pricingPlans" :class="currentStep === 'Pricing Plans' ? '' : 'hidden'" />
      <commissionsComp ref="commissions" :class="currentStep === 'Commissions' ? '' : 'hidden'"
        :productObj="productObj" />
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div v-if="currentStepIndex !== 0" class="col-6">
          <q-btn square label="back" color="grey" outline class="skew-btn q-py-sm full-width" @click="lastStep" />
        </div>
        <div v-if="currentStepIndex !== 2" :class="currentStepIndex > 0 ? 'col-6' : 'col-12'">
          <q-btn square label="Next" color="yellow" class="full-width skew-btn q-py-sm text-black" @click="nextStep" />
        </div>
        <div v-if="currentStepIndex === 2" :class="currentStepIndex > 0 ? 'col-6' : 'col-12'">
          <q-btn square label="Submit" color="red" class="full-width skew-btn q-py-sm" @click="submit" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'
import productDetailsComp from './newComponents/Details.vue'
import pricingPlansComp from './newComponents/PricingPlans.vue'
import commissionsComp from './newComponents/Commission.vue'
import { useProductsStore } from 'src/stores/products'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const productsStore = useProductsStore()
const productSteps = [
  'Product Details',
  'Pricing Plans',
  'Commissions'
]
const emit = defineEmits(['closeDialog'])
const productDetails = ref(null)
const pricingPlans = ref(null)
const commissions = ref(null)
const currentStep = ref(productSteps[0])
const currentStepIndex = ref(0)
const productObj = ref({})
const editing = ref(false)
const editingId = ref(null)

const nextStep = async () => {
  if (currentStepIndex.value === 0) {
    const productDetailsObj = await productDetails.value.getProductDetails()
    if (!productDetailsObj) return
    productObj.value = { ...productDetailsObj }
  }
  if (currentStepIndex.value === 1) {
    const pricingPlansArr = await pricingPlans.value.getPricingPlans()
    if (!pricingPlansArr) return
    await commissions.value.setFormObj(pricingPlansArr)
    productObj.value.pricing_plans = pricingPlansArr
  }

  currentStep.value = productSteps[++currentStepIndex.value]
}

const submit = async () => {
  const commissionArr = await commissions.value.getCommissions()
  if (!commissionArr) return
  let index = 0
  productObj.value.pricing_plans.forEach(plan => {
    plan.commission = commissionArr[index++]
    plan.commission.type = plan.commission.type.value
  })
  if (editing.value) {
    productObj.value._method = 'PUT'
    addProduct(productObj.value, editingId.value)
  } else
    addProduct(productObj.value)
}

const addProduct = async (data, id) => {
  try {
    await productsStore.addOrUpdateProducts(data, id)
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Products Added!'
    })
    emit('closeDialog', true)
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

const lastStep = () => {
  currentStep.value = productSteps[--currentStepIndex.value]
}

const loadData = async (id) => {
  try {
    const response = await productsStore.getProduct(id)
    editing.value = true
    editingId.value = id
    productDetails.value.formObj = { ...response, tuition: { label: response.tuition, value: response.tuition } }
    pricingPlans.value.pricingPlans = [...response.pricing_plans.map(plan => {
      // eslint-disable-next-line no-unused-vars
      const { name, amount, type, term, commission } = plan
      const obj = {
        name,
        amount,
        type,
        commission
      }
      if (term) obj.term = term
      return obj
    })]

    // commissions.value.formObj = [...response.pricing_plans.map((plan) => ({ ...plan.commission, type: { label: plan.commission.type, value: plan.commission.type } }))]

    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Products Loaded!'
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

defineExpose({
  loadData
})

</script>

<style lang="scss" scoped></style>
