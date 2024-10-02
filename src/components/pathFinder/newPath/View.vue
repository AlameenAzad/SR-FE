<template>
  <div>
    <q-btn square :label="chargingAccount ? 'Charge Amount' : 'Log'" color="red"
      :class="chargingAccount ? 'full-width cut-with-hover-button q-py-sm no-border-radius' : 'full-width q-mt-lg animated-btn-hover animated-btn-hover-yellow q-py-sm font-20 text-weight-bold'"
      @click="reset" :disable="disableLog" />
    <q-dialog v-model="dialogs.mainLog" ref="dialog">
      <div class="row justify-center" style="max-width: 700px">
        <div style="width:820px" ref="nodesContainer">
          <h1 class="text-h6 bg-red text-center q-py-md q-mb-none">Log Path</h1>
          <q-scroll-area dark
            :horizontal-bar-style="{ bottom: '-4px', borderRadius: '5px', background: 'red', height: '0px', opacity: 1 }"
            :thumb-style="{ borderRadius: '5px', background: 'red', height: '0px', opacity: 1 }"
            class="bg-black q-pt-xl hide-scrollbar" style="height: 540px; max-width: inherit;" ref="scrollAreaRef">
            <div class="row justify-around scrollable-container no-wrap" :class="nodeContainerClass" :style="{
              '--start-margin': startMargin,
              '--start-node-width': initialNodeWidth,
              'margin-left': initialContainerWidth + 'px'
            }" style="margin-right:50vw">
              <div v-for="(column, index) in groupedMetrics" :key="index" class="column col-2-5 q-mb-md" ref="nodeRef">
                <div v-for="node in column.metrics" :key="node.name" class="text-center q-mb-xl"
                  :class="{ 'circle-node-first': firstStage && index != 0, 'circle-node-center': selectedNodeNames.includes(node.name), 'circle-node-hidden': node.hidden }"
                  @click="saveLog(node, column, index)" style="transition: all .6s ease .1s" ref="nodeCircleRef">
                  <div class="circle-node"
                    :class="[index > 0 && !node.done ? 'circle-node-normal' : '', selectedNodeNames.includes(node.name) ? 'circle-node-selected' : '']"
                    :style="index > 0 ? `opacity:${currentStep >= index ? '1' : '0.2'}` : ''"
                    style="transition: all .3s ease">
                    <q-icon class="full-width text-center" size="md" name="phone" />
                  </div>
                  <div class="title" :style="index > 0 ? `opacity:${currentStep >= index ? '1' : '0.2'}` : ''">{{
                    node.name
                  }}</div>
                </div>
              </div>
            </div>
          </q-scroll-area>
        </div>

        <q-dialog v-model="dialogs.assignSetter" persistent>
          <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 50%;">
            <q-card-section>
              <div class="col-6 q-mb-xl">
                <div class="text-white separator-with-title q-mb-md font-16"><span>Choose Rep</span></div>
              </div>
              <q-form class="q-gutter-md q-mt-lg" ref="assignSetterValidatedForm">
                <q-select v-model="inputsData.assignSetter.selectedRep" color="red" :options="reps"
                  label="Assign Setter" dark dense option-label="name" option-value="id" :rules="[rules.required]"
                  lazy-rules="ondemand" />
              </q-form>
            </q-card-section>
            <q-card-section>
              <q-btn label="Save" color="red" class="full-width" @click="closeSetterDialog" />
            </q-card-section>
          </q-card>
        </q-dialog>

        <q-dialog v-model="dialogs.products" persistent>
          <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 50%;">
            <q-card-section>
              <div class="col-6 q-mb-xl">
                <div class="text-white separator-with-title q-mb-md font-16"><span>Choose Product</span></div>
              </div>
              <q-form class="q-gutter-md q-mt-lg" ref="productsValidatedForm">
                <q-select v-model="inputsData.products.selectedProduct" color="red" :options="products" label="Product"
                  dark dense option-label="name" option-value="id" :rules="[rules.required]" lazy-rules="ondemand" />
              </q-form>
            </q-card-section>
            <q-card-section>
              <q-btn label="Save" color="red" class="full-width" @click="closeProductsDialog" />
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="dialogs.cashPlans" persistent>
          <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 50%;">
            <q-card-section>
              <div class="col-6 q-mb-xl">
                <div class="text-white separator-with-title q-mb-md font-16"><span>Choose Cash Plan</span></div>
              </div>
              <q-form class="q-gutter-md q-mt-lg" ref="cashPlanValidatedForm">
                <q-select v-model="inputsData.cashPlans.selectedCashPlan" color="red"
                  :options="inputsData.products.selectedProduct.cashPlans" label="Cash Plan" dark dense
                  option-label="name" option-value="id" :rules="[rules.required]" lazy-rules="ondemand" />
              </q-form>
            </q-card-section>
            <q-card-section>
              <q-btn label="Save" color="red" class="full-width" @click="closeCashPlanDialog" />
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-dialog v-model="createAccount" persistent>
          <createAccountDialog @closeDialogAndSaveLog="createLog" :skipProductWithData="skipProductWithData"
            @close-dialog="createAccount = false" :log="true" :payment-type="paymentType" />
        </q-dialog>
      </div>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import createAccountDialog from 'components/accounts/Creation.vue'
import { usePathStore } from 'src/stores/path'
import { useDashboardStore } from 'src/stores/dashboard'
import { useProductsStore } from 'src/stores/products'
import { rules } from 'src/helper/formRules'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import { useAccountsStore } from 'src/stores/accounts'

const scrollAreaRef = ref(null)
const nodeCircleRef = ref(null)
const nodesContainer = ref(null)
const nodeRef = ref(null)
const nodeContainerStyle = ref(null)
const nodeContainerClass = ref(null)
const pathStore = usePathStore()
const firstStage = ref(true)
const initialContainerWidth = ref(null)
const initialNodeWidth = ref(null)
const startMargin = ref(null)
const currentStep = ref(0)
const selectedNodeNames = ref(['Log'])
const assignSetterValidatedForm = ref(null)
const productsValidatedForm = ref(null)
const cashPlanValidatedForm = ref(null)
const createAccount = ref(false)
const skipProductWithData = ref(null)
const paymentType = ref(null)
const props = defineProps(['chargingAccount'])
const $q = useQuasar()
const accountsStore = useAccountsStore()
const emit = defineEmits(['closeDialog'])
const disableLog = computed(() => !props.chargingAccount && dashboardStore.selectedMeeting === null)
const dialog = ref(null)

const dialogs = ref({
  assignSetter: false,
  products: false,
  cashPlans: false,
  mainLog: false
})
const inputsData = ref({
  assignSetter: {
    selectedRep: null,
  },
  products: {
    selectedProduct: null,
  },
  cashPlans: {
    selectedCashPlan: null,
  },
})
const dashboardStore = useDashboardStore()
const productsStore = useProductsStore()

const reps = computed(() => dashboardStore.reps)
const products = computed(() => productsStore.productNamesAndPlans)

let metrics = ref([])

const metricOptions = [
  { label: 'Log Type', value: 'log_type' },
  { label: 'Call Type', value: 'call_type' },
  { label: 'Call Sequence', value: 'call_sequence' },
  { label: 'Call Result', value: 'call_result' },
  { label: 'Offer Result', value: 'offer_result' },
  { label: 'Assign or Product', value: 'assign_or_product' },
  { label: 'Product or Cash', value: 'product_or_cash' },
  { label: 'Cash Plan', value: 'cash_plan' },
  { label: 'Payment Type', value: 'payment_type' },
  { label: 'Done', value: 'done' },
]

const pathEnds = ['second call booked', 'no show', 'lost']

const groupedMetrics = computed(() => metricOptions.map(option => {
  if (option.value === 'done') {
    return {
      category: option.label,
      metrics: [
        {
          name: 'Done',
          category: option.value,
          done: true
        }
      ]
    }
  }
  if (option.value === 'assign_or_product') {
    return {
      category: option.label,
      metrics: [
        {
          name: 'Assign Setter',
          category: option.value,
          type: 'outbound'
        },
        {
          name: 'Assign Self',
          category: option.value,
          type: 'outbound'
        },
        {
          name: 'Product Select',
          category: option.value,
          type: 'inbound'
        }
      ]
    }
  }
  if (option.value === 'product_or_cash') {
    return {
      category: option.label,
      metrics: [
        {
          name: 'Product Select',
          category: option.value,
          type: 'outbound'
        },
        {
          name: 'Cash Plan',
          category: option.value,
          type: 'inbound'
        }
      ]
    }
  }
  if (option.value === 'cash_plan') {
    return {
      category: option.label,
      metrics: [
        {
          name: 'Cash Plan',
          category: option.value,
          type: 'outbound'
        }
      ]
    }
  }
  return {
    category: option.label,
    metrics: metrics.value.filter(metric => metric.category === option.value)
  }
}
))

const getMetrics = async () => {
  metrics.value = await pathStore.getMetrics()
}
getMetrics()


const saveLog = async (node, column, index) => {
  const end = pathEnds.includes(node.name.toLowerCase())
  if (currentStep.value !== index || node.hidden) return
  if (end) {
    selectedNodeNames.value.push(node.name)
    endPath(node, column, index)
  }
  if (node.category === 'call_sequence' && node.name.toLowerCase().includes('outbound')) {
    clearInbound(5)
  }
  if (node.category === 'call_sequence' && node.name.toLowerCase().includes('inbound')) {
    clearOutbound(5)
  }
  const nodeWidth = nodeRef.value[0].offsetWidth
  initialNodeWidth.value = nodeWidth + 50
  if (node.category === 'log_type') {
    await nextTick()
    nodeContainerClass.value = 'node-container-transition'
    firstStage.value = false
  } else {
    if (!end)
      scrollAreaRef.value.setScrollPosition('horizontal', (initialNodeWidth.value * index), 300)
    selectedNodeNames.value.push(node.name)

    // Animate the selected node to center and fade others
    groupedMetrics.value[index].metrics.forEach((nodeElement) => {
      if (nodeElement.name !== node.name) {
        nodeElement.hidden = true
      }
    })
    // Center the selected node
    await nextTick()
    const containerHeight = 620
    const columnRef = nodeRef.value[index]
    const nodeElement = Array.from(columnRef.children).find(el => el.innerText.includes(node.name))
    const nodeRect = nodeElement.children[0].getBoundingClientRect()
    const containerRect = nodesContainer.value.getBoundingClientRect()

    // Adjust the calculation for accurate centering
    const offsetY = (containerRect.top + containerHeight / 2) - (nodeRect.top + nodeRect.height / 2)
    nodeElement.style.transform = `translateY(${offsetY}px)`
  }
  if (node.category === 'assign_or_product' && node.name === 'Assign Setter') {
    dialogs.value.assignSetter = true
  }
  if (node.name === 'Product Select') {
    dialogs.value.products = true
  }
  if (node.name === 'Cash Plan') {
    dialogs.value.cashPlans = true
  }
  if (['wire', 'layway', 'credit card'].includes(node.name.toLowerCase())) {
    skipProductWithData.value = inputsData.value.products.selectedProduct
    paymentType.value = selectedNodeNames.value[selectedNodeNames.value.length - 1]
    createAccount.value = true
    return
  }
  currentStep.value++
}

const clearOutbound = (index) => {
  for (let indexL = index; indexL <= index + 3; indexL++) {
    groupedMetrics.value[indexL].metrics.forEach((node) => {
      if (node.type === 'outbound') {
        if (node.name === 'Cash Plan') {
          groupedMetrics.value.splice(indexL, 1)
        }
        node.hidden = true
      }
    })
  }
}

const clearInbound = (index) => {
  for (let indexL = index; indexL <= index + 3; indexL++) {
    groupedMetrics.value[indexL].metrics.forEach((node) => {
      if (node.type === 'inbound') {
        node.hidden = true
      }
    })
  }
}

const endPath = (node, column, index) => {
  const numberOfItemsToRemove = groupedMetrics.value.length - index - 2

  groupedMetrics.value.splice(index + 1, numberOfItemsToRemove)
  createLog()
}

const preventScroll = (event) => {
  event.preventDefault()
}

const onDialogOpen = () => {
  const containerWidth = nodesContainer.value.offsetWidth
  initialContainerWidth.value = (containerWidth - 240) / 2

  startMargin.value = `${initialContainerWidth.value}px`
  nodeContainerStyle.value = `margin-left: ${initialContainerWidth.value}px;`
  const scrollElement = scrollAreaRef.value.$el.querySelector('.q-scrollarea__container')
  scrollElement.addEventListener('wheel', preventScroll, { passive: false })
  scrollElement.addEventListener('touchmove', preventScroll, { passive: false })
}

const onDialogClose = () => {
  const scrollElement = scrollAreaRef.value.$el.querySelector('.q-scrollarea__container')
  scrollElement.removeEventListener('wheel', preventScroll)
  scrollElement.removeEventListener('touchmove', preventScroll)
}

watch(() => dialogs.value.mainLog, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      onDialogOpen()
    }, 100)
  } else {
    onDialogClose()
  }
})
const reset = () => {
  firstStage.value = true
  nodeContainerClass.value = null
  selectedNodeNames.value = ['Log']
  dialogs.value.mainLog = true
}


const closeSetterDialog = async () => {
  if (await assignSetterValidatedForm.value.validate(true))
    dialogs.value.assignSetter = false
}
const closeProductsDialog = async () => {
  if (await productsValidatedForm.value.validate(true))
    dialogs.value.products = false
}
const closeCashPlanDialog = async () => {
  if (await cashPlanValidatedForm.value.validate(true))
    dialogs.value.cashPlans = false
}

const getProducts = async () => {
  try {
    await productsStore.getProducts()
  } catch (error) {
    console.log('🚀 ~ getProducts ~ error:', error)
  }
}
const createLog = async (id) => {
  console.log('🚀 ~ createLog ~ id:', id)
  const { orgStartTime, orgEndTime, name, id: eventId, invitees, eventMemberships, isGoogle } = dashboardStore.selectedMeeting
  const product = inputsData.value.products.selectedProduct
  const cashPlan = inputsData.value.cashPlans.selectedCashPlan
  const rep = inputsData.value.assignSetter.selectedRep
  const data = {
    log_type: selectedNodeNames.value[0],
    call_type: selectedNodeNames.value[1],
    call_sequence: selectedNodeNames.value[2],
    call_result: selectedNodeNames.value[3],
    offer_result: selectedNodeNames.value[4],
    event: {
      event_id: eventId,
      event_name: isGoogle == true ? ` ${name} - ${eventMemberships[0].displayName}, ${invitees[0].displayName}` : `${name} - ${eventMemberships[0].user_name}, ${invitees.name}`,
      event_start_date: orgStartTime,
      event_end_date: orgEndTime
    }
  }
  if (id) {
    createAccount.value = false
    data.product_id = product.id
    data.cash_plan_id = cashPlan.id
    data.account_id = id
    data.payment_type = paymentType.value
    if (selectedNodeNames.value[2] === 'Outbound')
      data.setter_id = rep.id
  }
  const response = await api.post('/api/log', data)
  if (response && response.status === 200) {
    dashboardStore.selectedMeeting = null
    if (props.chargingAccount) {
      emit('closeDialog', data.product_id, response.data.data.id)
      dialog.value.hide()
      return
    }
    await dashboardStore.getDashboardData()
    dashboardStore.getLogs()
    if (selectedNodeNames.value[selectedNodeNames.value.length - 1] === 'Credit Card') {
      chargeAccount(data.product_id, response.data.data.id, id, cashPlan)
    }
    dialog.value.hide()
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Log successful!'
    })
  } else {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}

const chargeAccount = async (productId, logId, id, cashPlan) => {
  const { type, amount, term } = cashPlan.meta
  const chargeAmount = type === 'split_pay' ? (Number(amount) / Number(term.split(' ')[0])) : Number(amount)
  const data = {
    amount: chargeAmount.toFixed(2),
    confirm: 1,
    product_id: productId,
    log_id: logId,
  }
  try {
    await accountsStore.chargeAccount(id, data)
    dialog.value.hide()
    $q.notify({
      message: 'Account Charged Successfully',
      color: 'green-5',
      position: 'top-right',
    })
  } catch (error) {
    $q.notify({
      message: `Error: ${error.response.data.error}`,
      color: 'red',
      position: 'top-right',
    })
  }

}

getProducts()
</script>

<style lang="scss" scoped>
.scrollable-container {
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
}

.circle-node {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: auto;
  border-radius: 50%;
  background-color: #D51312;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &-normal {
    background-color: transparent;
    border: 1px solid #727272;
  }

  &:hover {
    opacity: 1 !important
  }

  &-first {
    opacity: 0 !important
  }

  &-selected {
    border: 1px solid red;
  }

  &-center {
    transition: transform 0.6s ease, opacity 0.6s ease;
  }

  &-hidden {
    opacity: 0 !important;
  }
}

.icon {
  font-size: 1.5rem;
}

.title {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
}

.node-container-transition {
  animation: moveRight .3s forwards;
}

.row>.col-2-5,
.row>.col-xs-2-5 {
  height: auto;
  width: 17.6667%;
  min-width: 0;
  max-width: 100%;
  flex: 0 0 auto;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

@keyframes moveRight {
  0% {
    margin-left: var(--start-margin);
  }

  50% {
    margin-left: calc(var(--start-margin) + 20px);
  }

  100% {
    margin-left: 0;
  }
}
</style>
