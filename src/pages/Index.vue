<template>
  <q-page padding class="flex flex-center">
    <div v-if="reveal">
      <h1 class="q-mb-md text-center">
        <span>
          <span v-for="(letter, index) in splitTitle" :key="index" :style="`animation-delay: ${(13 + index) / 10}s`">{{
            letter
          }}</span>
        </span>
      </h1>
      <div class="text-center">
        <p class="q-px-xl login-btn-animation font-48">Prove it.</p>
        <p class="q-px-xl login-btn-animation font-18" style="animation-delay: 4.5s;">Coming Soon</p>
        <!-- <q-btn color="red" label="Login" class="q-px-xl login-btn-animation" :to="{ name: 'login' }" /> -->
      </div>
      <q-page-sticky position="top-right" :offset="[20, 25]">
        <q-btn round flat :icon="playing ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark'" color="secondary"
          @click=" playing ? pauseAudio() : playAudio()" />
      </q-page-sticky>
    </div>
    <div v-else class="text-center">
      <q-btn color="red" label="Lets GO!" class="q-px-xl q-mt-lg login-btn-animation" style="animation-delay: .5s"
        @click="playAudio(); reveal = true" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
const title = 'Sales Rank.io'
const splitTitle = title.split('')
const reveal = ref(false)
const playing = ref(false)
const audioPlayer = new Audio('/audio/intro.mp3')
function playAudio() {
  audioPlayer.play()
  playing.value = true
}
function pauseAudio() {
  audioPlayer.pause()
  playing.value = false
}

</script>
<style scoped>
h1 {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  line-height: 5.9rem;
}

h1 span span {
  position: relative;
  opacity: 0;
  bottom: -115px;
  animation: move-text 0.75s forwards;
}

@keyframes move-text {
  0% {
    bottom: -115px;
    opacity: 0;
  }

  100% {
    bottom: 0;
    opacity: 1;
  }
}

@keyframes fade-text {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}


.login-btn-animation {
  position: relative;
  opacity: 0;
  animation: fade-text 2s 3.5s forwards;
  /* bottom: -50px; */
}
</style>
