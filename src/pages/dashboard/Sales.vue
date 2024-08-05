<template>
  <q-page padding class="">
    <div class="row q-col-gutter-md q-mb-md">
      <!-- Left Side -->
      <div class="col-2">
        <Calendar />
        <PathLogger />
      </div>
      <!-- End Left Side -->
      <div class="col-8">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <div class="text-white separator-with-title q-mb-lg font-16"><span>Summary</span></div>
          </div>
          <div class="col-4">
            <Gauge :value="summary.calls" :key-value="1" :title="'calls'" :forecasted="summary.forecast.calls" />
          </div>
          <div class="col-4">
            <Gauge :value="summary.offers" :key-value="2" :title="'offers'" :forecasted="summary.forecast.offers" />
          </div>
          <div class="col-4">
            <Gauge :value="summary.sales" :key-value="3" :title="'sales'" :forecasted="summary.forecast.sales" />
          </div>
          <div class="col-12">
            <div class="text-white separator-with-title q-my-lg font-16"><span>Month To Date</span></div>
          </div>
          <div class="col-12">
            <MonthToDateCards :monthToDate="monthToDate" />
          </div>
          <div class="col-6 q-my-lg">
            <div class="text-white separator-with-title q-mb-md font-16"><span>Closing Rates</span></div>
          </div>
          <div class="col-6 q-my-lg">
            <div class="text-white separator-with-title q-mb-md font-16"><span>Total Units</span></div>
          </div>
          <div class="col-6">
            <CloseRatesCards :closingRates="closingRates" />
          </div>
          <div class="col-6">
            <TotalUnitsCards />
          </div>
        </div>
      </div>
      <!-- Right side -->
      <div class="col-2">
        <Notifications :activity="activity" />
        <div class="text-white separator-with-title q-my-34 font-16"><span>Team</span></div>
        <div>
          <OverlayScrollbarsComponent element="div" defer :options="scrollbarOptions" class="team-wrapper">
            <Team :team="team" />
          </OverlayScrollbarsComponent>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import Gauge from 'components/charts/Gauge.vue'
import MonthToDateCards from 'components/sales/MonthToDateCards.vue'
import CloseRatesCards from 'components/sales/CloseRatesCards.vue'
import TotalUnitsCards from 'components/sales/TotalUnitsCards.vue'
import Notifications from 'components/Notifications.vue'
import Calendar from 'components/Calendar.vue'
import Team from 'components/Team.vue'
import PathLogger from 'components/pathFinder/newPath/View.vue'
import { useDashboardStore } from 'src/stores/dashboard'
import { computed } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
const scrollbarOptions = {
  scrollbars: {
    theme: 'os-theme-dark',
    autoHide: 'scroll'
  },
}
const dashboardStore = useDashboardStore()
const activity = computed(() => dashboardStore.activity)
const team = computed(() => dashboardStore.team)
const summary = computed(() => dashboardStore.summary)
const monthToDate = computed(() => dashboardStore.monthToDate)
const closingRates = computed(() => dashboardStore.closingRates)
</script>

<style lang="scss">
.team-wrapper {
  max-height: 42vh;
  overflow: scroll;
}
</style>
