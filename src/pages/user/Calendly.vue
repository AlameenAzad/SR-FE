<template>
  <q-page padding class="flex flex-center">
    <div class="fullscreen text-white text-center q-pa-md flex flex-center">
      <div>
        <Vue3Lottie :animationData="calendarAnimation" :height="200" :width="400" />

        <div class="text-h2 q-mt-none" style="opacity: 0.4">Integrating...</div>

      </div>
    </div>
  </q-page>
</template>
<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import calendarAnimation from 'src/assets/lottie/calendar.json'
import { useAuthStore } from 'src/stores/auth'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const authStore = useAuthStore()

const { query } = useRoute()

if (query.code) {
  authStore.integrateCalendly(query.code).then((response) => {
    if (response.data.message === 'Calendly integrated successfully') {
      $q.notify({
        message: 'Stripe integration successful',
        color: 'green',
        position: 'top'
      })
      setTimeout(() => {
        window.location.href = 'https://sales-rank-fe-sand.vercel.app/dashboard/sales'
      }, 2000)
    } else {
      $q.notify({
        message: 'Stripe integration failed',
        color: 'red',
        position: 'top'
      })

    }
  })
}

</script>
<style scoped></style>
