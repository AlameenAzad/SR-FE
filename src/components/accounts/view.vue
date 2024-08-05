<template>
  <q-card dark flat class="bg-page-color q-pa-md row" style="min-width: 80%; min-height: 50vh">
    <q-card-section class="col-2 q-mt-xl q-pa-none">
      <div class="text-white separator-with-title q-mb-lg font-16"><span>Options</span></div>
      <q-btn :class="tabs !== 'details' ? 'opacity-80' : ''" flat color="yellow" label="Edit Account Details"
        @click="tabs = 'details'" />
      <q-btn :class="tabs !== 'methods' ? 'opacity-80' : ''" flat class="q-my-md" color="yellow"
        label="Add Payment Method" @click="tabs = 'methods'" />
      <q-btn :class="tabs !== 'payments' ? 'opacity-80' : ''" flat color="yellow" label="Check Payments"
        @click="tabs = 'payments'" />
      <q-btn :class="tabs !== 'charge' ? 'opacity-80' : ''" flat color="yellow" class="q-mt-md" label="Charge Account"
        @click="tabs = 'charge'" />
    </q-card-section>
    <q-card-section class="col q-pa-none">
      <q-tab-panels v-model="tabs" animated class="bg-transparent q-pa-none">
        <q-tab-panel class="q-pa-none" name="details">
          <userCreation :currentViewedUser="currentViewedUser" />
        </q-tab-panel>

        <q-tab-panel class="q-pa-none" name="methods">
          <addPaymentMethod :currentViewedUser="currentViewedUser" />
        </q-tab-panel>

        <q-tab-panel class="q-pa-none" name="payments">
          <payments :currentViewedUser="currentViewedUser" />
        </q-tab-panel>

        <q-tab-panel class="q-pa-none" name="charge">
          <viewAndChargeComp :accountId="currentViewedUser.id" />
        </q-tab-panel>
      </q-tab-panels>

    </q-card-section>
  </q-card>
</template>

<script setup>
import userCreation from './Creation.vue'
import addPaymentMethod from './AddPaymentMethods.vue'
import payments from './Payments.vue'
import viewAndChargeComp from './viewAndCharge.vue'
import { ref } from 'vue'

defineProps(['currentViewedUser'])

const tabs = ref('details')

</script>

<style scoped>
/* Your component's CSS styles go here */
.opacity-80 {
  opacity: 0.5;
}
</style>
