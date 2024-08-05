<template>
  <div class="main-nav row justify-between" id="mainNav">
    <div class="col relative-position" v-for="(route, index) in routes" :key="index">
      <q-btn v-if="route.meta" square flat stretch :label="route.meta.title as string ?? ''"
        class="col q-py-md full-width q-px-lg">
        <RouterLink class="absolute full-width full-height" :to="{ path: route.path }" />
      </q-btn>
      <div class="text-center absolute indicator-wrapper">
        <p v-for="(child, index) in route.children" :key="index" class="nav-indicator q-ml-xs q-mb-none"
          :class="child.path === '' ? 'hidden' : ''"></p>
      </div>
    </div>
    <div class="mini-nav" :class="routeChildren.length < 1 ? 'hidden' : ''">
      <q-toolbar class="full-height justify-center q-px-none">
        <hr class="q-mr-lg q-ml-sm" style="flex: 2;">
        <div class="full-height row justify-center">
          <q-btn v-for="(child, index) in routeChildren" :key="index" square flat dense no-wrap
            :label="child.name as string ?? ''" class="q-px-lg col q-py-none">
            <RouterLink class="absolute full-width full-height" :to="{ name: child.name }" />
          </q-btn>
        </div>
        <hr class="q-ml-lg q-mr-sm" style="flex: 2;">
      </q-toolbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'
const router = useRouter()
const routes = router.options.routes.filter((route) => route.meta && route.meta.title)
const routeChildren = computed(() => router.currentRoute.value.matched[0].children.filter((child) => child.path !== ''))
</script>

<style lang="scss">
.main-nav {
  button:has(a.router-link-active) {
    span.block {
      color: $red;
      z-index: 1;
    }
  }

  position: relative;
}

.mini-nav {
  position: absolute;
  bottom: -56px;
  left: 0;
  right: 0;
  width: 100%;

  &::after {
    content: "";
    height: 69px;
    width: 2px;
    background-color: white;
    position: absolute;
    right: -8px;
    bottom: 40%;
    transform: rotate(29deg);
  }

  &::before {
    content: "";
    height: 69px;
    width: 2px;
    background-color: white;
    position: absolute;
    left: -8px;
    bottom: 40%;
    transform: rotate(-29deg);
  }
}

.indicator-wrapper {
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}
</style>
