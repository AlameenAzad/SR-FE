<template>
  <div style="min-height: 90vh; position: relative">
    <!-- <userCard v-for="index in 3" :key="index" :userStats="cardStats" userName="test" class="col-2 " /> -->
    <div class="row q-gutter-md justify-center flying-cards" v-if="topPlayers.top">
      <userCard :userStats="topPlayers.second" :userName="topPlayers.second.name" rank="2" class="col-2 secondary-card"
        :setting="false" />
      <userCard :userStats="topPlayers.top" :userName="topPlayers.top.name" rank="G" class="col-2 top-card"
        :setting="false" />
      <userCard :userStats="topPlayers.third" :userName="topPlayers.third.name" rank="3" class="col-2 secondary-card"
        :setting="false" />
    </div>
  </div>
</template>

<script setup>
import userCard from 'components/reps/UserCard.vue'
import { ref } from 'vue'
const props = defineProps(['data'])
const topPlayers = ref({
  top: props.data[0],
  second: props.data[2],
  third: props.data[3],
})
</script>

<style lang="scss" scoped>
.flying-cards {
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;
  animation: move-card 3s .5s forwards ease;
}

.top-card {
  &:after {
    content: '';
    position: absolute;
    background-image: url('/cardBackground.svg');
    background-position: center;
    background-size: cover;
    height: 100%;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    animation: reveal-top-card 1.5s 3.5s forwards ease;
  }
}

.secondary-card {
  opacity: 0;
  position: relative;
  top: 50px;
  animation: reveal-secondary-card 1s 5s forwards ease;
}

@keyframes move-card {
  0% {
    bottom: -100%;
    // opacity: 0;
  }

  75% {
    bottom: 20%;
    // opacity: 1;
  }

  100% {
    bottom: 15%;
    // opacity: 1;
  }
}

@keyframes reveal-secondary-card {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes reveal-top-card {
  0% {
    bottom: 0;
    opacity: 1;
  }

  80% {
    bottom: 100%;
    opacity: 1;
  }

  100% {
    bottom: 100%;
    opacity: 0;
  }
}
</style>
