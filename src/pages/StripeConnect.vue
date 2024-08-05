<template>
  <q-page padding class="flex flex-center">
    <div class="text-center">
      <h4>Preparing your account for payments.</h4>
      <h5>Please hold on for a minute.</h5>
      <Vue3Lottie :animationData="creditCard" :height="400" :width="400" />
    </div>
    <q-dialog v-model="showDialog">
      <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 550px;">
        <q-card-section v-if="!failed">
          <div class="text-center">
            <h4 class="q-mt-md">Success!</h4>
            <Vue3Lottie :animationData="successAnimation" :height="200" :width="200" />
            <p class="q-mt-md">Redirecting you back to the dashboard...</p>
          </div>
        </q-card-section>
        <q-card-section v-if="failed">
          <div class="text-center">
            <h4 class="q-mt-md">bummer!</h4>
            <Vue3Lottie :animationData="warningAnimation" :height="200" :width="200" />
            <p class="q-mt-md">Something went wrong and we are working on it.</p>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'
import { Vue3Lottie } from 'vue3-lottie'
import creditCard from 'src/assets/lottie/creditCard.json'
import successAnimation from 'src/assets/lottie/success.json'
import warningAnimation from 'src/assets/lottie/warning.json'

const showDialog = ref(false)
const failed = ref(false)

const connect = () => {
  const $q = useQuasar()
  const authStore = useAuthStore()
  const { query } = useRoute()
  const code = query.code
  const state = query.state
  const redirected = query.redirected
  if (!code || !state) {
    $q.notify({
      message: 'Invalid request',
      color: 'red',
      position: 'top'
    })
    setTimeout(() => {
      window.location.href = 'https://salesrank.io'
    }, 5000)
  }
  else if (!redirected) {
    window.location.href = `https://sales-rank-fe-sand.vercel.app/stripe?code=${code}&state=${state}&redirected=true`
  }
  else {
    authStore.integrateStripe({ code }).then((response) => {
      showDialog.value = true
      if (response.data.message === 'Stripe integration failed') {
        failed.value = true
        $q.notify({
          message: 'Stripe integration failed',
          color: 'red',
          position: 'top'
        })
      } else {
        $q.notify({
          message: 'Stripe integration successful',
          color: 'green',
          position: 'top'
        })
        setTimeout(() => {
          window.location.href = 'https://sales-rank-fe-sand.vercel.app/settings/userSettings?stripe=true'
        }, 5000)
      }
    })
  }
}

onMounted(() => {
  connect()
})
</script>
<style scoped></style>
