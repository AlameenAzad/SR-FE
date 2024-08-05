<template>
  <div class="row q-mb-md" v-for="(notif, index) in activity" :key="index">
    <div class="col-12 notification-card bg-lighter-dark" style="height: 65px">
      <div class="row full-height">
        <div class="col-2 relative-position text-center">
          <span class="font-14 font-helvetica vertical-text full-width">{{ notif.time }}</span>
        </div>
        <div class="col-1 notification-line"></div>
        <div class="col-9 q-py-sm relative-position">
          <span class="font-14 font-helvetica vertical-text full-width q-pr-sm">
            {{ notif.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs } from 'vue'
const props = defineProps(['activity'])
const { activity } = toRefs(props)

</script>

<style lang="scss">
.bg-lighter-dark {
  background-color: $lighter-dark;
}

.notification-line {
  position: relative;

  &:after {
    content: '';
    position: absolute;
    height: 100%;
    width: 3px;
    right: 20px;
    top: 0;
    bottom: -5px;
    background: $page-color;
    transform: skew(-23deg);
  }
}
</style>
