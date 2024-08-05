<template>
  <q-form class="q-gutter-md q-mt-lg" ref="validatedForm">
    <q-input v-model="formObj.name" label="Product Name" color="red" dense dark type="text" class="q-my-lg"
      :rules="[rules.required]" lazy-rules="ondemand"></q-input>
    <q-input v-model="formObj.description" label="Product Description" color="red" dense dark type="textarea"
      class="q-my-lg" :rules="[rules.required]" lazy-rules="ondemand"></q-input>
    <q-select v-model="formObj.tuition" color="red" :options="tuitions" label="Tuition" dark class="q-my-lg"
      :rules="[rules.required]" lazy-rules="ondemand" />
    <q-input v-if="formObj.tuition?.value === 'custom'" v-model="formObj.custom" label="Custom Tuition" color="red" dense
      dark type="text" class="q-my-lg" :rules="[rules.required]" lazy-rules="ondemand"></q-input>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { rules } from 'src/helper/formRules'

const validatedForm = ref(null)
// const props = defineProps(['productObj'])

const formObj = ref({
  name: '',
  description: '',
  tuition: null
})

const tuitions = [
  { label: 'Annual', value: 'annual' },
  { label: 'Life Time', value: 'lifetime' },
  { label: 'Custom', value: 'custom' },
]

const getProductDetails = async () => {
  if (await validatedForm.value.validate(true)) {
    const { name, description, tuition, custom } = formObj.value
    const product = {
      name,
      description,
      tuition: tuition.value
    }

    if (tuition.value === 'custom') product.custom = custom

    return product
  }
}
// watchEffect(() => formObj.value = props.editProductDetails)
// onMounted(() => {
//   if (props.editProductDetails) {
//     formObj.value = props.editProductDetails
//   }
// })

defineExpose({
  getProductDetails,
  formObj
})
</script>

<style lang="scss" scoped></style>
