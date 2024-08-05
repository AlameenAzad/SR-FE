<template>
  <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 50%;">
    <q-card-section v-if="log">
      <div class="col-6 q-mb-xl">
        <div class="text-white separator-with-title q-mb-md font-16"><span>Choose Account</span></div>
      </div>
      <q-select v-model="selectedAccount" color="red" :options="accounts" label="Accounts" dark dense
        option-label="name" option-value="id" :rules="[rules.required]" lazy-rules="ondemand" />
    </q-card-section>
    <q-card-section>
      <div class="col-6 q-mb-xl" v-if="log">
        <div class="text-white separator-with-title q-mb-md font-16"><span>{{ log ? 'Or' : '' }} Create Account</span>
        </div>
      </div>
      <q-form class="q-gutter-md q-mt-lg" ref="validatedForm">
        <q-input v-for="input in currentForm.inputs" :key="input.label" v-model="input.value" :label="input.label"
          lazy-rules="ondemand" color="red" dense dark :type="input.type" :class="input.classes"
          :rules="input.rules"></q-input>
        <q-select v-for="select in currentForm.selects" :key="select.label" v-model="select.value" color="red"
          :options="select.options" :label="select.label" dark :class="select.classes" dense
          :option-label="select.optionLabel ? select.optionLabel : ''"
          :option-value="select.optionValue ? select.optionValue : ''" :rules="select.rules" lazy-rules="ondemand" />
      </q-form>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-6 q-pr-md" v-if="props.currentViewedUser && Object.keys(props.currentViewedUser).length">
          <q-btn label="delete" color="grey" outline class="full-width" @click="deleteAccount(currentViewedUser.id)"
            :loading="loading" />
        </div>
        <div class=""
          :class="props.currentViewedUser && Object.keys(props.currentViewedUser).length ? 'col-6' : 'col-12'">
          <q-btn label="Save" color="red" class="full-width" @click="saveLog" :loading="loading" />
        </div>
        <div class=" q-mt-md col-12" v-if="log">
          <q-btn outline label="Exit" color="grey" class="full-width" v-close-popup />
        </div>
      </div>
    </q-card-section>
    <q-dialog v-model="addPaymentMethodDialog" persistent>
      <stripeTest :clientSecret="clientSecret" @paymentComplete="closeDialog" :accountId="newAccountId" />
    </q-dialog>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductsStore } from 'src/stores/products'
import { useAccountsStore } from 'src/stores/accounts'
import { useQuasar } from 'quasar'
import { rules } from 'src/helper/formRules'
import stripeTest from './stripetest.vue'
const currentForm = ref({})
const props = defineProps(['currentViewedUser', 'skipProductWithData', 'log', 'paymentType'])
const emit = defineEmits(['closeDialog'])
const productsStore = useProductsStore()
const accountsStore = useAccountsStore()
const accounts = computed(() => accountsStore.accountsSimplified)
const selectedAccount = ref(null)
const $q = useQuasar()
const validatedForm = ref(null)
const loading = ref(false)
const addPaymentMethodDialog = ref(false)
const clientSecret = ref(null)
const newAccountId = ref(null)
const inputs = [
  {
    name: 'name',
    label: 'Full Name',
    classes: 'q-my-lg',
    type: 'text',
    value: '',
    rules: [rules.required],
    key: 'name'
  },
  {
    name: 'email',
    label: 'Email Address',
    classes: 'q-my-lg',
    type: 'text',
    value: '',
    rules: [rules.required, rules.email],
    key: 'email'
  },
  {
    name: 'phone',
    label: 'Phone Number',
    classes: 'q-my-lg',
    type: 'number',
    value: '',
    rules: [rules.required],
    key: 'phone_number'
  },
]

const selects = [
  {
    label: 'Product',
    classes: 'q-my-lg',
    value: '',
    optionLabel: 'name',
    optionValue: 'id',
    options: computed(() => productsStore.productNames),
    rules: [rules.required],
    key: 'product_id'
  },
]
const getProducts = async () => {
  try {
    await productsStore.getProducts()
  } catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}
const prepData = async () => {
  const data = {}
  const obj = currentForm.value
  //Foreach Input
  obj.inputs.forEach(input => {
    data[input.key] = input.value
  })
  //Foreach Selects
  if (obj.selects)
    obj.selects.forEach(async select => {
      let value = select.value.id
      data[select.key] = value
      if (props.currentViewedUser && Object.keys(props.currentViewedUser).length && select.label === 'Product') {
        data[select.key] = props.currentViewedUser.productId
      }
    })
  if (props.currentViewedUser && Object.keys(props.currentViewedUser).length) {
    data._method = 'PUT'
  }
  if (props.paymentType === 'Credit Card')
    data.is_stripe_customer = true


  return data
}

const saveLog = async () => {
  if (selectedAccount.value) {
    closeDialog(selectedAccount.value.id)
    return
  }
  else {
    createAccount()
  }
}

const createAccount = async () => {
  if (await validatedForm.value.validate(true)) {
    loading.value = true
    const data = await prepData()
    const accountId = data._method ? props.currentViewedUser.id : null
    try {
      const response = await accountsStore.addOrUpdateAccounts(data, accountId)
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'thumb_up',
        position: 'top-right',
        message: 'Accounts Added!'
      })
      loading.value = false
      if (props.paymentType === 'Credit Card') {
        getPaymentMethods(response.data.data.id)
        return
      }
      closeDialog(response.data.data.id)
    }
    catch (error) {
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
}

const closeDialog = (id) => {
  emit('closeDialog', true)
  emit('closeDialogAndSaveLog', id)
}

const deleteAccount = async (id) => {
  loading.value = true
  try {
    await accountsStore.deleteAccounts(id)
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Accounts Deleted!'
    })
    loading.value = false
    emit('closeDialog', true)
  }
  catch (error) {
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

const getAccounts = async () => {
  try {
    await accountsStore.getAccounts()
  } catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong Getting Accounts!'
    })
  }
}

const getPaymentMethods = async (id) => {
  try {
    const response = await accountsStore.getAccountPaymentMethods(id)
    const { intent } = response
    newAccountId.value = id
    clientSecret.value = intent.client_secret
    addPaymentMethodDialog.value = true
  } catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}

onMounted(() => {
  if (props.currentViewedUser && Object.keys(props.currentViewedUser).length)
    for (const field in props.currentViewedUser) {
      const fieldName = field
      const value = props.currentViewedUser[fieldName]
      const input = inputs.filter((input) => input.name === fieldName)
      if (input.length)
        input[0].value = value
      if (fieldName === 'product')
        selects[0].value = value
    }
  if (props.skipProductWithData && Object.keys(props.skipProductWithData).length) {
    selects[0].value = { ...props.skipProductWithData }
    selects[0].classes += ' hidden'
  }
  currentForm.value.inputs = inputs
  currentForm.value.selects = selects
  getProducts()
  getAccounts()
})
</script>

<style lang="scss" scoped></style>
