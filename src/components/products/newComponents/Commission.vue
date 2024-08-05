<template>
  <q-form class="q-gutter-md q-my-lg" ref="validatedForm">
    <q-list bordered dark v-if="loaded">
      <q-expansion-item v-for="(plan, index) in props.productObj.pricing_plans" :key="plan.name" group="pricingPlans"
        icon="explore" :label="plan.name" header-class="text-yellow" expand-icon-class="text-yellow" dark
        expand-separator>
        <q-card class="bg-transparent q-pa-md">
          <q-card-section>
            <q-select v-model="formObj[index].type" color="red" :options="commissionTypes" label="Commission Type" dark
              class="q-my-lg" :rules="[rules.required]" lazy-rules="ondemand"
              @update:model-value="commissionTypeChange(index)" />

            <!-- based on commission type fixed -->
            <div v-if="(formObj[index].type?.value || formObj[index].type) === 'fixed'">
              <q-input v-model="formObj[index].percentage" label="Percentage %" color="red" dense dark type="number"
                class="q-my-lg" :rules="[rules.required]" lazy-rules="ondemand" />
              <q-input v-if="plan.type === 'split_pay'" v-model="formObj[index].ar" label="AR %" color="red" dense dark
                type="number" class="q-my-lg" :rules="[rules.required]" lazy-rules="ondemand" />
            </div>
            <!-- based on commission type fixed -->

            <!-- based on commission type sliding -->
            <div v-if="(formObj[index].type?.value || formObj[index].type) === 'sliding'">
              <q-input v-if="plan.type === 'split_pay'" v-model="formObj[index].ar" label="AR %" color="red" dense dark
                type="number" class="q-my-lg" :rules="[rules.required]" lazy-rules="ondemand" />
              <div class="row">
                <q-input v-model="formObj[index].percentage" label="Percentage %" color="red" dense dark type="number"
                  class="q-mb-lg col-6 q-pr-sm" :rules="[rules.required]" lazy-rules="ondemand" />
                <q-input v-model="formObj[index].up_to" label="Up to $" color="red" dense dark type="number"
                  class="q-mb-lg col-6 q-pr-sm" :rules="[rules.required]" lazy-rules="ondemand">
                  <template v-slot:append>
                    <q-btn round dense flat icon="add" @click="addPercentage(index)" />
                  </template>
                </q-input>
                <div v-for="(slide, slideIndex) in formObj[index].percentages" :key="slideIndex" class="row col-12">
                  <q-input v-model="slide.percentage" label="Percentage %" color="red" dense dark type="number"
                    class="q-mb-lg col-6 q-pr-sm" :rules="[rules.required]" lazy-rules="ondemand" />
                  <q-input v-model="slide.between" label="Between $" color="red" dense dark type="number"
                    class="q-mb-lg col-6 q-pr-sm" :rules="[rules.required]" lazy-rules="ondemand">
                    <template v-slot:append>
                      <q-btn round dense flat icon="remove" @click="removePercentage(index, slideIndex)" />
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <!-- based on commission type sliding -->
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { rules } from 'src/helper/formRules'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps(['productObj'])
const validatedForm = ref(null)
const loaded = ref(false)
const formObj = ref([])

const commissionTypes = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Sliding', value: 'sliding' },
]

const addPercentage = (index) => {
  const obj = {
    percentage: '',
    between: ''
  }
  if (!formObj.value[index].percentages) {
    formObj.value[index].percentages = [obj]
  } else {
    formObj.value[index].percentages.push(obj)
  }
}

const removePercentage = (index, slideIndex) => {
  formObj.value[index].percentages.splice(slideIndex, 1)
}

const commissionTypeChange = (index) => {
  if (formObj.value[index].type.value === 'sliding') {
    addPercentage(index)
  }
}

const getCommissions = async () => {
  if (await validatedForm.value.validate(true)) {
    return JSON.parse(JSON.stringify(formObj.value))
  } else {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'You need to fill all the commissions and fields!'
    })
  }
}

const setFormObj = async (plans) => {
  plans.value.forEach(plan => {
    if (plan.commission) {
      formObj.value.push({ ...plan.commission, type: { label: plan.commission.type, value: plan.commission.type } })
    } else {
      formObj.value.push({
        type: null,
      })
    }
  })
  loaded.value = true
}

defineExpose({
  getCommissions,
  setFormObj
})
</script>

<style lang="scss" scoped></style>
