<template>
  <div class="q-pa-md">
    <q-list bordered dark>
      <q-expansion-item v-for="plan in plans" :key="plan.planename || plan.name" group="pricingPlans" icon="explore"
        :label="plan.name || plan.planname" header-class="text-yellow" @show="commissionPlan = plan"
        expand-icon-class="text-yellow" dark expand-separator>
        <q-card class="bg-transparent q-pa-md">
          <q-card-section>
            <q-input v-for="input in plan.inputs" :key="input.label" v-model="input.value" :label="input.label"
              color="red" dense dark :type="input.type" :class="input.classes" :rules="input.rules"
              lazy-rules="ondemand"></q-input>
            <q-select v-for="select in plan.selects" :key="select.label" v-model="select.value" color="red"
              :options="select.options" :label="select.label" dark @update:model-value="onCommissionSelect"
              :class="select.classes" :rules="select.rules" lazy-rules="ondemand"
              :option-label="select.optionLabel ? select.optionLabel : ''"
              :option-value="select.optionValue ? select.optionValue : ''" />
            <div class="row">
              <q-input v-for="(input, index) in plan.belowInputs" :key="input.label" v-model="input.value"
                :label="input.label" lazy-rules="ondemand" color="red" dense dark :type="input.type"
                :class="input.classes" :rules="input.rules">
                <template v-slot:append>
                  <q-btn v-if="input.addablePercentage" round dense flat icon="add" @click="addPercentage()" />
                  <q-btn v-if="input.removablePercentage" round dense flat icon="remove"
                    @click="removePercentage(index)" />
                </template>
              </q-input>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-separator />
    </q-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { rules } from 'src/helper/formRules'
const props = defineProps(['pricingPlans'])
const plans = ref(null)
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
const commissionPlan = ref({})

const currentForm = {
  label: 'Commission',
  inputs: [],
  belowInputs: [],
  last: true,
  selects: [
    {
      label: 'Commission',
      key: 'commission',
      classes: 'q-my-lg',
      value: '',
      rules: [rules.required],
      options: [
        { label: 'Fixed', value: 'fixed' },
        { label: 'Sliding', value: 'sliding' },
      ],
      optionLabel: 'label',
      optionValue: 'value',
    },
  ],
}

const onCommissionSelect = (value) => {
  const val = value.value
  let belowInputs = commissionPlan.value.belowInputs
  belowInputs.splice(0, belowInputs.length)
  if (val === 'fixed') {
    if (commissionPlan.value.type.value === 'full_pay') {
      belowInputs.push({ ...percentage })
    } else {
      belowInputs.push({ ...percentage }, { ...arPercentage })
    }
  }
  else if (val === 'sliding') {
    if (commissionPlan.value.type.value === 'split_pay') {
      belowInputs.push({ ...arPercentage }, { ...percentage, classes: 'q-mb-lg col-6 q-pr-sm' }, { ...upTo })
    } else {
      belowInputs.push({ ...percentage, classes: 'q-mb-lg col-6 q-pr-sm' }, { ...upTo })
    }
  }
}

const addPercentage = () => {
  const belowInputs = commissionPlan.value.belowInputs
  const between = {
    ...upTo,
    label: 'Between $',
    key: 'between',
    addablePercentage: false,
    removablePercentage: true,
    value: ''
  }
  belowInputs.push({ ...percentage, classes: 'q-mb-lg col-6 q-pr-sm' }, between)
}

const removePercentage = (index) => {
  commissionPlan.value.belowInputs.splice(index - 1, 2)
}

const prepedPlans = () => plans.value = props.pricingPlans.map((plan) => ({ ...plan, ...JSON.parse(JSON.stringify(currentForm)) }))
const exportCommissionForm = () => plans.value
onMounted(() => {
  prepedPlans()
})
defineExpose({
  exportCommissionForm
})
</script>

<style lang="scss" scoped></style>
