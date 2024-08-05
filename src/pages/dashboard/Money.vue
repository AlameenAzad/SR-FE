<template>
  <q-page padding>
    <div class="row q-col-gutter-md q-mb-lg justify-between">
      <div class="col-3">
        <q-btn outline class="full-width date-btn q-pa-md" text-color="white">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date landscape range v-model="formattedDate" dark color="yellow" text-color="black" style="width: 100px"
              @update:model-value="dateRangeChange">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="yellow" flat />
              </div>
            </q-date>
          </q-popup-proxy>
          {{ currentMonthName }} {{ currentYear }} <span>{{ currentDayName }}, {{ currentDayNumber }} <q-icon size='xs'
              name="fa-solid fa-calendar-days" class="q-ml-sm" /></span>
        </q-btn>
      </div>
      <div class="col-auto text-right">
        <q-btn-toggle unelevated class="full-height" v-model="model" color="grey-8" toggle-color="red"
          :options="dateShortcutOptions" @update:model-value="getDateRangeString" />
      </div>
      <div class="col-12">
        <div class="text-white separator-with-title q-my-lg font-16"></div>
      </div>
    </div>
    <div>
      <MoneyCard />
      <div class="col-12">
        <div class="text-white separator-with-title q-my-lg font-16"><span>Reps</span></div>
      </div>
      <RepCard />
    </div>
  </q-page>
</template>

<script setup>
import MoneyCard from 'src/components/money/MoneyCard.vue'
import RepCard from 'src/components/money/RepsCard.vue'
import { useDashboardStore } from 'src/stores/dashboard'
import { onMounted, watchEffect, ref } from 'vue'
import { date } from 'quasar'
const dashboardStore = useDashboardStore()
const model = ref('today')
const dateShortcutOptions = [
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Last 2 Weeks', value: 'last2Week' },
  { label: 'Last Week', value: 'lastWeek' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Today', value: 'today' }
]
// button and calendar date format
const currentDate = new Date()
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonthNumber = ref(currentDate.getMonth() + 1)
const currentMonthName = ref(monthNames[currentDate.getMonth()])
const currentDayName = ref(dayNames[currentDate.getDay()])
const currentDayNumber = ref(currentDate.getDate())
const currentYear = ref(currentDate.getFullYear())
const formattedDate = ref({
  from: date.formatDate(currentDate, 'YYYY/MM/DD'),
  to: date.formatDate(currentDate, 'YYYY/MM/DD')
})

watchEffect(() => {
  const fromDate = formattedDate.value?.from || formattedDate.value
  // const toDate = formattedDate.value?.to || '';

  const fromDateParts = fromDate.split('/')
  // const toDateParts = toDate.split('/');

  currentYear.value = parseInt(fromDateParts[0])
  currentMonthNumber.value = parseInt(fromDateParts[1])
  currentDayNumber.value = parseInt(fromDateParts[2])
  currentMonthName.value = monthNames[currentMonthNumber.value - 1]
  currentDayName.value = dayNames[new Date(fromDate).getDay()]
})
// End button and calendar date format

const dateRangeChange = (value) => {
  let dateParam
  if (value.from) {
    dateParam = `date_from=${date.formatDate(value.from, 'YYYY-MM-DD')}&date_to=${date.formatDate(value.to, 'YYYY-MM-DD')}`
  }
  else {
    dateParam = `date_from=${date.formatDate(value, 'YYYY-MM-DD')}&date_to=${date.formatDate(value, 'YYYY-MM-DD')}`
  }
  dashboardStore.getDashboardData(dateParam)
}

const getDateRangeString = (shortcutValue) => {
  let dateFrom, dateTo

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  switch (shortcutValue) {
    case 'lastMonth':
      // Set dateFrom to the first day of the previous month
      dateFrom = date.formatDate(new Date(currentYear, currentMonth - 1, 1), 'YYYY-MM-DD')
      // Set dateTo to the last day of the previous month
      dateTo = date.formatDate(new Date(currentYear, currentMonth, 0), 'YYYY-MM-DD')
      break
    case 'last2Week':
      dateFrom = date.formatDate(date.subtractFromDate(new Date(), { days: 14 }), 'YYYY-MM-DD')
      dateTo = date.formatDate(new Date(), 'YYYY-MM-DD')
      break
    case 'lastWeek':
      dateFrom = date.formatDate(date.subtractFromDate(new Date(), { days: 7 }), 'YYYY-MM-DD')
      dateTo = date.formatDate(new Date(), 'YYYY-MM-DD')
      break
    case 'yesterday':
      dateFrom = date.formatDate(date.subtractFromDate(new Date(), { days: 1 }), 'YYYY-MM-DD')
      dateTo = dateFrom
      break
    case 'today':
      dateFrom = date.formatDate(new Date(), 'YYYY-MM-DD')
      dateTo = dateFrom
      break
    default:
      dateFrom = ''
      dateTo = ''
  }
  formattedDate.value = {
    from: date.formatDate(dateFrom, 'YYYY/MM/DD'),
    to: date.formatDate(dateTo, 'YYYY/MM/DD')
  }
  dashboardStore.getDashboardData(`date_from=${dateFrom}&date_to=${dateTo}`)
}

onMounted(() => {
  dashboardStore.getDashboardData()
})
</script>

<style lang="scss"></style>
