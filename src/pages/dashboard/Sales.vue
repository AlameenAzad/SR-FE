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
            <div class="text-white separator-with-title q-mb-lg font-16"><span>Summary</span>
              <CardsMenu :data="summary" type="Summary" @items-toshow="(event) => setItemsToShow(event, 'summary')" />
            </div>
          </div>
          <div class="col-12">
            <SummaryCards :summary="summary" :itemsToShow="itemsToShow.summary" />
          </div>

          <div class="col-12">
            <div class="text-white separator-with-title q-my-lg font-16"><span>Month To Date</span>
              <CardsMenu :data="monthToDate" type="MonthToDate"
                @items-toshow="(event) => setItemsToShow(event, 'monthToDate')" />
            </div>
          </div>
          <div class="col-12">
            <MonthToDateCards :monthToDate="monthToDate" :itemsToShow="itemsToShow.monthToDate" />
          </div>
          <div class="col-6 q-my-lg">
            <div class="text-white separator-with-title q-mb-md font-16"><span>Closing Rates</span>
              <CardsMenu :data="closingRates" type="ClosingRates"
                @items-toshow="(event) => setItemsToShow(event, 'closingRates')" />
            </div>
          </div>
          <div class="col-6 q-my-lg">
            <div class="text-white separator-with-title q-mb-md font-16"><span>Total Units</span>
              <CardsMenu type="totalUnits" @items-toshow="(event) => setItemsToShow(event, 'TotalUnits')" />
            </div>
          </div>
          <div class="col-6 q-pa-sm">
            <CloseRatesCards :closingRates="closingRates" :itemsToShow="itemsToShow.closingRates" />
          </div>
          <div class="col-6 q-pa-sm">
            <TotalUnitsCards :itemsToShow="itemsToShow.totalUnits" />
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
import SummaryCards from '../../components/sales/SummaryCards.vue'
import MonthToDateCards from 'components/sales/MonthToDateCards.vue'
import CloseRatesCards from 'components/sales/CloseRatesCards.vue'
import TotalUnitsCards from 'components/sales/TotalUnitsCards.vue'
import Notifications from 'components/Notifications.vue'
import Calendar from 'components/Calendar.vue'
import Team from 'components/Team.vue'
import PathLogger from 'components/pathFinder/newPath/View.vue'
import { useDashboardStore } from 'src/stores/dashboard'
import { computed, ref } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import CardsMenu from 'src/components/sales/CardsMenu.vue'
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
const itemsToShow = ref({
  summary: [],
  monthToDate: [],
  closingRates: [],
  totalUnits: []
})
function setItemsToShow(e, str) {

  itemsToShow.value[str] = e
}
</script>

<style lang="scss">
.team-wrapper {
  max-height: 42vh;
  overflow: scroll;
}
</style>
