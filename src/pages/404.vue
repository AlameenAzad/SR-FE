<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <Vue3Lottie :animationData="notFoundAnimation" :height="400" :width="600" />

      <div class="text-h2 q-mt-none" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn class="q-mt-xl" color="red" text-color="white" unelevated to="/" label="Go Home" no-caps />
    </div>
  </div>
</template>

<script setup>
import { Vue3Lottie } from 'vue3-lottie'
import notFoundAnimation from 'src/assets/lottie/404.json'
</script>
<style scoped></style>
