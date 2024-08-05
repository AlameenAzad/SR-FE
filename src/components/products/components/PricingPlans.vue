<template>
  <q-card class="bordered-card-white bg-transparent q-pa-md q-mt-xl"
    v-if="props.pricingPlans && props.pricingPlans.length">
    <p class="bordered-card-label text-white">Plans</p>
    <q-card-section>
      <div class="row" v-for="(plan, index) in pricingPlans" :key="plan.name">
        <div class="col-11">
          <p class="q-mb-none q-mt-sm">
            <span class="q-mr-lg">Plan Name: {{ plan.name }}</span>
            <span class="q-mr-lg">Amount: {{ plan.amount }}</span>
            <span class="q-mr-lg">Type: {{ (plan.type.label) }}</span>
            <span class="q-mr-lg" v-if="plan.term">Term: {{ plan.term }}</span>
          </p>
        </div>
        <div class="col-1 text-center">
          <q-btn round dense :ripple="false" flat icon="close" @click="emit('removePricingPlan', index)" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps(['pricingPlans'])
const emit = defineEmits(['removePricingPlan'])
</script>

<style lang="scss" scoped></style>
