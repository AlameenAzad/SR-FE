<template>
  <div>
    <q-btn square :label="chargingAccount ? 'Charge Amount' : 'Log'" color="red"
      :class="chargingAccount ? 'full-width cut-with-hover-button q-py-sm no-border-radius' : 'full-width q-mt-lg animated-btn-hover animated-btn-hover-yellow q-py-sm font-20 text-weight-bold'"
      @click="reset" :disable="disableLog" />
    <q-dialog v-model="mainLog" ref="dialog">
      <q-card class="bg-page-color" style="width: 1000px; max-width: 80vw;">
        <q-card-section>
          <div class="pathway__creator__wrapper relative-position col-10 bg-black cut--2--large flex flex-center"
            style="height: 500px">
            <GraphlyD3 class="absolute horse" ref="graphly" :draggableNodes="true" :zoom-scale-extent="[1, 1]"
              :zoomEnabled="true" />
          </div>
        </q-card-section>
        <q-card-actions class="q-mt-lg" v-if="!end">
          <div class="q-px-md" :class="'col-' + 12 / currentOptions.length" v-for="option in currentOptions"
            :key="option.title">
            <div v-if="option.class === 'hidden'" class="q-mb-xl q-pa-sm"></div>
            <q-select outlined class="q-mb-md" v-if="option.hasInput" v-model="optionsInput[option.hasInput].value"
              :label="optionsInput[option.hasInput].label" :options="optionsInput[option.hasInput].options" color="red"
              dense dark
              :option-label="optionsInput[option.hasInput].optionLabel ? optionsInput[option.hasInput].optionLabel : ''"
              :option-value="optionsInput[option.hasInput].optionValue ? optionsInput[option.hasInput].optionValue : ''"
              @update:model-value="onSelectProduct" />
            <q-btn square :label="option.title" color="red"
              class="full-width cut-with-hover-button q-py-sm font-20 text-weight-bold"
              @click="setCurrentOptions(option.title, option.index, option)"
              :disable="option.hasInput && optionsInput[option.hasInput].value == ''" />
          </div>
        </q-card-actions>
        <q-card-actions class="q-my-lg justify-center" v-if="end">
          <q-spinner color="red" size="3em" class="q-mr-md" />
          Saving
        </q-card-actions>
      </q-card>
      <q-dialog v-model="createAccount" persistent>
        <createAccountDialog @closeDialogAndSaveLog="saveLog" :skipProductWithData="skipProductWithData"
          @close-dialog="createAccount = false" :log="true" :payment-type="paymentType" />
      </q-dialog>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GraphlyD3 from '@livereader/graphly-d3/component/vue3'
import '@livereader/graphly-d3/style.css'
import createAccountDialog from 'components/accounts/Creation.vue'
import { useQuasar } from 'quasar'
import { useDashboardStore } from 'src/stores/dashboard'
import { useProductsStore } from 'src/stores/products'
import { useAccountsStore } from 'src/stores/accounts'
const $q = useQuasar()
const props = defineProps(['chargingAccount'])
// shapes
import LogShape from 'components/pathFinder/svgShapes/Log'
import StartingLevel from 'components/pathFinder/svgShapes/StartingLevel'
import MidLevel from 'components/pathFinder/svgShapes/MidLevel'
import EndLevel from 'components/pathFinder/svgShapes/EndLevel'
import Blank from 'components/pathFinder/svgShapes/Blank'
// paths
import { logPath, logChoices } from './paths/log'
import { api } from 'boot/axios'

const productsStore = useProductsStore()
const dashboardStore = useDashboardStore()
const accountsStore = useAccountsStore()
const mainLog = ref(false)
const createAccount = ref(false)
const graphly = ref(null)
const dialog = ref(null)
const paymentType = ref(null)
const currentOptions = ref([])
const disableLog = computed(() => !props.chargingAccount && dashboardStore.selectedMeeting === null)
const emit = defineEmits(['closeDialog'])
let choicesToSubmit = [
  'log'
]
let currentType = ref(null)
let logGraph
let optionsInput = ref(null)
let end = ref(false)
let skipProductWithData = ref(null)
let choices = [
  'log'
]
const simulation = computed(() => graphly.value.simulation)
const inputs = ref({
  productSelect: {
    label: 'Product Select',
    value: '',
    options: computed(() => productsStore.productNamesAndPlans),
    optionLabel: 'name',
    optionValue: 'id',
  },
  cashPlan: {
    label: 'Cash Plan',
    value: '',
    options: [],
    optionLabel: 'name',
    optionValue: 'id',
  },
  assignSetter: {
    label: 'Assign Setter',
    value: '',
    options: computed(() => dashboardStore.reps),
    optionLabel: 'name',
    optionValue: 'id',
  }
})

const initSimulation = (type) => {
  currentType.value = type
  setTimeout(() => {
    simulation.value.templateStore.add('log', LogShape)
    simulation.value.templateStore.add('startingLevel', StartingLevel)
    simulation.value.templateStore.add('midLevel', MidLevel)
    simulation.value.templateStore.add('endLevel', EndLevel)
    simulation.value.templateStore.add('blank', Blank)
    simulation.value.render(logGraph)
  }, 500)
}
const reset = () => {
  logGraph = JSON.parse(JSON.stringify(logPath))
  optionsInput.value = JSON.parse(JSON.stringify(inputs.value))
  optionsInput.value.productSelect.onSelect = onSelectProduct
  mainLog.value = true
  currentOptions.value = logChoices[0]
  choices = [
    'log'
  ]
  choicesToSubmit = [
    'log'
  ]
  end.value = false
  initSimulation('log')
  getProducts()
}
const lightPath = async ({ route }, lastChoice) => {
  const traceRoute = route[lastChoice]
  const searchGraph = logGraph
  for (let index = 0; index < traceRoute.length - 1; index++) {
    const target = traceRoute[index]
    const source = traceRoute[index + 1]
    const link =
      searchGraph.links
        .filter((link) =>
          link.target.id === target && link.source.id === source ||
          link.target.id === source && link.source.id === target
        )
    link[0].width = 1
  }
}

const saveLog = async (id) => {
  const { orgStartTime, orgEndTime, name, id: eventId, invitees, eventMemberships } = dashboardStore.selectedMeeting
  end.value = true
  const data = {
    log_type: choicesToSubmit[0],
    call_type: choicesToSubmit[1],
    call_sequence: choicesToSubmit[2],
    call_result: choicesToSubmit[3],
    offer_result: choicesToSubmit[4],
    event: {
      event_id: eventId,
      event_name: `${name} - ${eventMemberships[0].user_name}, ${invitees.name}`,
      event_start_date: orgStartTime,
      event_end_date: orgEndTime
    }
  }
  if (id) {
    createAccount.value = false
    data.product_id = optionsInput.value.productSelect.value.id
    data.cash_plan_id = optionsInput.value.cashPlan.value.id
    data.account_id = id
    data.payment_type = paymentType.value
    if (choicesToSubmit[5] === 'Outbound')
      data.setter_id = optionsInput.value.assignSetter.value.id
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
    if (choices[choices.length - 2] === 'creditCard') {
      chargeAccount(data.product_id, response.data.data.id, id)
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

const setCurrentOptions = async (title, index, option) => {
  const optionArr = logChoices
  const searchGraph = logGraph
  if (choicesToSubmit[choicesToSubmit.length - 1] !== 'Account') {
    const selectedNode = searchGraph.nodes.find((n) => option.id ? n.id === option.id : n.payload.title === title)
    selectedNode.payload.selected = true
    await lightPath(option, choices[choices.length - 1])
    choices.push(selectedNode.id)
    choicesToSubmit.push(option.title)
    simulation.value.render(logGraph)
    simulation.value.moveTo({
      transform: { k: 1.5, x: selectedNode.anchor.x, y: selectedNode.anchor.y },
      duration: 600
    })
  }
  if (option.end) {
    if (props.chargingAccount) {
      paymentType.value = choicesToSubmit[choicesToSubmit.length - 2]
      saveLog(props.chargingAccount)
      return
    }
    if (title === 'Account') {
      skipProductWithData.value = optionsInput.value.productSelect.value
      paymentType.value = choicesToSubmit[choicesToSubmit.length - 2]
      createAccount.value = true
      return
    }
    saveLog()
    return
  }
  if (option.child)
    currentOptions.value = option.child
  else if (index + 1 < optionArr.length)
    currentOptions.value = optionArr[index + 1]
  if (title === 'Sale')
    if (choicesToSubmit[2] === 'Outbound')
      setCurrentOptions(currentOptions.value[1].title, currentOptions.value[1].index, currentOptions.value[1])
    else
      setCurrentOptions(currentOptions.value[0].title, currentOptions.value[0].index, currentOptions.value[0])
  if (['Credit Card', 'Layway', 'Wire'].includes(option.title)) {
    setCurrentOptions(option.child[0].title, option.child[0].index, option.child[0])
  }
}

const onSelectProduct = (value) => {
  if (value.cashPlans)
    optionsInput.value.cashPlan.options = value.cashPlans
}
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

const chargeAccount = async (productId, logId, id) => {
  const { type, amount, term } = optionsInput.value.cashPlan.value.meta
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
//Deprecated but can be used later when we have dynamic paths
// const recursivePathFinder = async (id, targetNodeId, selectedId) => {
//   const searchGraph = log.value ? graph : saleLog
//   let sourceNodeLink = searchGraph.links.filter((link) => link.target.id === id)
//   if (sourceNodeLink.length > 1) {
//     const sourceNodeLinkOptions = sourceNodeLink.filter((link) => link.source.id == targetNodeId)
//     if (sourceNodeLinkOptions.length == 0) {
//       sourceNodeLink.forEach(sourceLink => {
//         const pass = searchGraph.links.filter((link) => link.target.id === sourceLink.source.id)
//         if (pass.length > 0 && pass[0].source.id === targetNodeId) {
//           sourceLink.width = 1
//           sourceNodeLink = pass
//         }
//       });
//     } else {
//       sourceNodeLink = sourceNodeLinkOptions
//     }
//   }

//   sourceNodeLink[0].width = 1
//   if (sourceNodeLink[0].source.id !== targetNodeId)
//     recursivePathFinder(sourceNodeLink[0].source.id, targetNodeId, id)
// }
</script>

<style lang="scss"></style>
