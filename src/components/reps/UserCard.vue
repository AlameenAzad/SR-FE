<template>
  <q-card square class="bg-card-color q-px-md q-py-xl font-16 shadow-0 rep-card">
    <p class="text-weight-bold font-32">
      {{ updatedRepData ? updatedRepData.name : props.userName }}
      <span v-if="props.rank" class="rank-box">{{ props.rank }}</span>
    </p>
    <div v-for="(stat, index) in props.userStats" :key="stat.title">
      <p class="q-mb-none opacity-30">{{ index }}</p>
      <p class="q-mb-none">{{ stat }}</p>
      <q-separator dark color="page-color" class="q-my-sm" size="2px" />
    </div>
    <q-btn v-if="!!settings" round flat color="red" icon="settings" class="rep-settings-btn"
      @click="userCreationDialog = true" />
  </q-card>
  <q-dialog v-model="userCreationDialog">
    <userCreation :currentViewedUser="props.repData" @userAdded="getReps" />
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import userCreation from './manage/Creation.vue'
const props = defineProps(['userStats', 'userName', 'rank', 'rep-data', 'class', 'style', 'settings'])
const userCreationDialog = ref(false)
const updatedRepData = ref(null)
const getReps = async (rep) => {
  userCreationDialog.value = false
  updatedRepData.value = rep
}
</script>

<style lang="scss" scoped>
.rep-settings-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  display: none;
}

.rep-card:hover .rep-settings-btn {
  display: inline-flex;
}
</style>

