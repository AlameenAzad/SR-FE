<template>
  <q-card class="bordered-card-white bg-transparent q-pa-md">
    <div>
      <p class="bordered-card-label text-red">{{ currentForm.label }}</p>
    </div>
    <q-card-section>
      <q-form class="q-gutter-md q-mt-lg" ref="validatedForm">
        <q-input v-for="input in currentForm.inputs" :key="input.label" v-model="input.value" :label="input.label"
          color="red" dense dark :type="input.type" :class="input.classes" :rules="input.rules"
          lazy-rules="ondemand"></q-input>
        <q-select v-for="select in currentForm.selects" :key="select.label" v-model="select.value" color="red"
          :options="select.options" :label="select.label" dark @update:model-value="select.onSelect"
          :class="select.classes" :rules="select.rules" lazy-rules="ondemand"
          :option-label="select.optionLabel ? select.optionLabel : ''"
          :option-value="select.optionValue ? select.optionValue : ''" />
        <commission-comp ref="commissionCompRef" v-if="showCommission" :pricingPlans="pricingPlans"
          :editingPricingPlan="editingProduct" />
        <div class="row q-gutter-md justify-center q-ma-none">
          <div v-if="currentForm.backMethod" :class="currentForm.hasAddBtn ? 'col-3' : 'col-5'">
            <q-btn square label="back" color="grey" outline class="q-mt-lg skew-btn q-py-sm full-width"
              @click="currentForm.backMethod" />
          </div>
          <div v-if="currentForm.hasAddBtn" class="col-4">
            <q-btn square label="Add" color="accent" class="full-width q-mt-lg skew-btn q-py-sm"
              @click="currentForm.addMethod" />
          </div>
          <div
            :class="currentForm.backMethod && currentForm.hasAddBtn ? 'col-4' : currentForm.backMethod ? 'col-6' : 'col-11'">
            <q-btn square :label="currentForm.last ? 'Submit' : 'Next'" :color="currentForm.last ? 'red' : 'yellow'"
              class="full-width q-mt-lg skew-btn q-py-sm"
              :class="currentForm.last ? 'animated-btn-hover animated-btn-hover-yellow' : 'text-black'"
              @click="currentForm.buttonMethod" />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
  <pricing-plans-comp v-if="currentForm.hasAddBtn" :pricingPlans="pricingPlans"
    @removePricingPlan="(index) => currentForm.removeMethod(index)" />
</template>

<script setup>
import { ref, computed } from 'vue'
import { rules } from 'src/helper/formRules'
import { useQuasar } from 'quasar'
import { useProductsStore } from 'src/stores/products'
import pricingPlansComp from './components/PricingPlans.vue'
import commissionComp from './components/Commission.vue'

const $q = useQuasar()
const productsStore = useProductsStore()
const emit = defineEmits(['closeDialog'])
const editing = ref(false)
const editingProduct = computed(() => productsStore.product)
const currentForm = ref(null)
const validatedForm = ref(null)
const showCommission = ref(false)
const commissionCompRef = ref(null)
let commissionPlan = null

const pricingPlans = ref([])
const percentage = {
  label: 'Percentage %',
  key: 'percentage',
  classes: 'q-mb-lg col-12',
  type: 'number',
  value: '',
  rules: [rules.required],
}
const arPercentage = {
  label: 'AR %',
  key: 'ar',
  classes: 'q-mb-lg col-12',
  type: 'number',
  value: '',
  rules: [rules.required],
}
const upTo = {
  label: 'Up to $',
  key: 'up_to',
  classes: 'q-mb-lg col-6 q-pl-sm',
  type: 'number',
  value: '',
  rules: [rules.required],
  addablePercentage: true
}
const productForm = [
  {
    label: 'Product Details',
    inputs: [
      {
        label: 'Product Name',
        classes: 'q-my-lg',
        type: 'text',
        value: '',
        key: 'name',
        rules: [rules.required]
      },
      {
        label: 'Product Description',
        classes: 'q-my-lg',
        type: 'textarea',
        value: '',
        key: 'description',
      },
    ],
    selects: [
      {
        label: 'Tuition',
        key: 'tuition',
        classes: 'q-my-lg',
        value: '',
        rules: [rules.required],
        options: [
          { label: 'Annual', value: 'annual' },
          { label: 'Life Time', value: 'lifetime' },
          { label: 'Custom', value: 'custom' },
        ],
        optionLabel: 'label',
        optionValue: 'value',
        onSelect: (val) => {
          const inputs = currentForm.value.inputs
          if (val.value === 'custom') {
            inputs.push({
              label: 'Custom Tuition',
              classes: 'q-my-lg',
              key: 'tuition',
              type: 'text',
              value: '',
              rules: [rules.required],
            })
          }
          else if (inputs.length > 2) {
            inputs.splice(inputs.length - 1, 1)
          }
        }
      },
    ],
    buttonMethod: async () => {
      if (await validatedForm.value.validate(true)) {
        currentForm.value = productForm[1]
        if (editing.value)
          populatePricingPlans()
      }
    }
  },
  {
    label: 'Pricing Plan',
    hasAddBtn: true,
    inputs: [
      {
        label: 'Name',
        key: 'skip',
        classes: 'q-my-lg',
        type: 'text',
        value: '',
        rules: [rules.required],
      },
      {
        label: 'Amount',
        key: 'skip',
        classes: 'q-my-lg',
        type: 'number',
        value: '',
        rules: [rules.required],
      },
    ],
    selects: [
      {
        label: 'Type',
        key: 'skip',
        classes: 'q-my-lg',
        value: '',
        rules: [rules.required],
        options: [
          { label: 'Full Pay', value: 'full_pay' },
          { label: 'Split Pay', value: 'split_pay' },
        ],
        optionLabel: 'label',
        optionValue: 'value',
        onSelect: (val) => {
          const selects = currentForm.value.selects
          if (val.value === 'split_pay') {
            selects.push({
              label: 'Term',
              key: 'term',
              classes: 'q-my-lg',
              value: '',
              rules: [rules.required],
              options: [
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
              ],
              onSelect: () => ''
            })
          }
          else if (selects.length > 1) {
            selects.splice(selects.length - 1, 1)
          }
        }
      },
    ],
    buttonMethod: async () => {
      if (pricingPlans.value.length) {
        if (currentForm.value.inputs[0].value !== '') {
          $q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'thumb_down',
            position: 'top-right',
            message: 'You have an unsaved plan. Add it first!'
          })
          return
        }
        showCommission.value = true
        currentForm.value = productForm[2]
        if (editing.value) {
          populateCommissions()
        }
      } else {
        $q.notify({
          color: 'red',
          textColor: 'white',
          icon: 'thumb_down',
          position: 'top-right',
          message: 'You need at least one pricing plan!'
        })
      }
    },
    backMethod: async () => {
      currentForm.value = productForm[0]
    },
    addMethod: async () => {
      if (await validatedForm.value.validate(true)) {
        const inputs = currentForm.value.inputs
        const selects = currentForm.value.selects
        const tempObj = {}
        for (const input of inputs) {
          const keyName = input.label.toLowerCase().replace(' ', '')
          tempObj[keyName] = input.value
          input.value = ''
        }
        for (const select of selects) {
          const keyName = select.label.toLowerCase().replace(' ', '')
          tempObj[keyName] = JSON.parse(JSON.stringify(select.value))
          select.value = ''
        }
        pricingPlans.value.push(tempObj)
        if (selects.length > 1)
          selects.splice(selects.length - 1, 1)
      }
    },
    removeMethod: (index) => {
      pricingPlans.value.splice(index, 1)
    }
  },
  {
    label: 'Commission',
    last: true,
    inputs: [
    ],
    selects: [
    ],
    buttonMethod: async () => {
      if (await validatedForm.value.validate(true)) {
        const data = prepData()
        const commissionForm = commissionCompRef.value.exportCommissionForm()
        const addCommission = getCommissions(data, commissionForm)
        if (editing.value) {
          addCommission._method = 'PUT'
          addProduct(addCommission, editingProduct.value.id)
        } else
          addProduct(addCommission)
      }
    },
    backMethod: async () => {
      showCommission.value = false
      currentForm.value = productForm[1]
    },
  },
]

const prepData = () => {
  const data = {}
  productForm.forEach(obj => {
    //Foreach Input
    obj.inputs.forEach(input => {
      if (input.key != 'skip') {
        data[input.key] = input.value
      }
    })
    //Foreach Selects
    if (obj.selects)
      obj.selects.forEach(select => {
        if (select.key === 'tuition' && select.value.value === 'custom' || select.key === 'skip') {
          return
        }
        let value = select.value.value
        data[select.key] = value
      })
  })
  return data
}

// const getPricingPlans = (data) => {
//   const plans = []
//   pricingPlans.value.forEach(plan => {
//     const pricingPlan = {
//       name: plan.name,
//       amount: plan.amount,
//       type: plan.type.value
//     }
//     const determinedPlan = plan.term ? { ...pricingPlan, term: plan.term } : pricingPlan
//     plans.push(determinedPlan)
//   })
//   data.pricing_plans = plans
//   return data
// }

const getCommissions = (data, commissionForm) => {
  const pricing_plans = []
  commissionForm.forEach(form => {
    const { name, amount, type, selects, belowInputs, term } = form
    const commissionType = selects[0].value.value
    const obj = {
      name,
      amount,
      type: type.value,
      term,
      commission: {
        type: commissionType,
        percentage: null
      }
    }
    let percentage = {}
    if (commissionType === 'sliding') {
      obj.commission.percentages = []
    }
    belowInputs.forEach(input => {
      if (commissionType === 'sliding' && ['percentage', 'between'].includes(input.key)) {
        if (input.key === 'percentage' && obj.commission.percentage === null) {
          obj.commission.percentage = input.value
        }
        else if (Object.keys(percentage).length === 1) {
          percentage[input.key] = input.value
          obj.commission.percentages.push(percentage)
          percentage = {}
        }
        else
          percentage[input.key] = input.value
      } else {
        obj.commission[input.key] = input.value
      }
    })
    pricing_plans.push(obj)

  })

  return { ...data, pricing_plans }
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

const loadData = async (id) => {
  editing.value = true
  try {
    await productsStore.getProduct(id)
    populateProductDetails()
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

const populateProductDetails = () => {
  currentForm.value.inputs.forEach(input => {
    input.value = editingProduct.value[input.key]
  })
  currentForm.value.selects.forEach(select => {
    select.value = editingProduct.value[select.key]
  })
}

const populatePricingPlans = () => {
  pricingPlans.value = editingProduct.value.pricing_plans
  pricingPlans.value.forEach((plan) => {
    plan.type = { label: plan.name, value: plan.type }
  })
}

const populateCommissions = () => {
  let commission = null
  currentForm.value.selects.forEach(select => {
    if (select.key === 'commission') {
      commission = editingProduct.value.commissions[0]
      select.value = { label: commission.type, value: commission.type }
    } else {
      select.value = editingProduct.value.pricing_plans.filter((plan) => plan.is_active === 1)[0]
      commissionPlan = select.value
    }
  })
  let belowInputs = currentForm.value.belowInputs
  belowInputs.splice(0, belowInputs.length)
  if (commission.type === 'fixed') {
    if (commissionPlan.type.value === 'full_pay') {
      belowInputs.push({ ...percentage, value: commission.percentage })
    } else {
      belowInputs.push({ ...percentage, value: commission.percentage }, { ...arPercentage, value: commission.ar })
    }
  }
  else if (commission.type === 'sliding') {
    if (commissionPlan.type.value === 'split_pay') {
      belowInputs.push(
        { ...arPercentage, value: commission.ar },
        { ...percentage, classes: 'q-mb-lg col-6 q-pr-sm', value: commission.percentage },
        { ...upTo, value: commission.up_to },
      )
    } else
      belowInputs.push(
        { ...percentage, classes: 'q-mb-lg col-6 q-pr-sm', value: commission.percentage }, { ...upTo, value: commission.up_to })
  }
  if (commission.sliding_percentages.length) {
    const belowInputs = currentForm.value.belowInputs
    commission.sliding_percentages.forEach(sliding => {
      const between = {
        ...upTo,
        label: 'Between $',
        key: 'between',
        addablePercentage: false,
        removablePercentage: true,
        value: sliding.between
      }
      belowInputs.push({ ...percentage, classes: 'q-mb-lg col-6 q-pr-sm', value: sliding.percentage }, between)
    })
  }
}

defineExpose({
  loadData
})

currentForm.value = productForm[0]
</script>

<style lang="scss" scoped></style>
