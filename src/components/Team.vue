<template>
  <div v-for="(player, index) in team" :key="index" class="col-12 notification-card bg-lighter-dark q-mb-md"
    :class="index < 1 ? 'player-card-online' : ''" style="height: 65px">
    <div class="row full-height">
      <div class="col-3 relative-position player-image" style="">
      </div>
      <div class="col-9 relative-position">
        <span class="font-16 q-pl-md vertical-text full-width q-pr-sm"> {{ player.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
const props = defineProps(['team'])
const { team } = toRefs(props)
</script>

<style lang="scss">
.bg-lighter-dark {
  background-color: $lighter-dark;
}

.player-image {
  background-image: url(/icons/person.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);
}

.player-card {
  &-online {
    border: 2px solid #4CFF0D;
  }
}
</style>
