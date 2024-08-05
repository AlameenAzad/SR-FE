<template>
  <q-page padding>
    <top-cards :data="data" class="q-mb-xl" />
    <leadTable :data="data" class="q-mx-lg q-mb-lg" />
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import topCards from 'components/leaderboard/TopCards.vue'
import leadTable from 'components/leaderboard/Table.vue'
import { useLeaderboardStore } from 'src/stores/leaderboard'
const leaderboardStore = useLeaderboardStore()
const data = computed(() => leaderboardStore.leaderboard)

onMounted(() => { leaderboardStore.getLeaderboards() })
</script>

<style lang="scss"></style>
