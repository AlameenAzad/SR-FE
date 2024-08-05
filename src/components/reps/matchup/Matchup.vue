<template>
  <div class="text-center" v-if="selectStage">
    <p class="font-32 reveal">Choose your Reps</p>
    <q-select outlined v-model="firstRep" :options="options" label="Choose Rep" dark color="red" class="reveal"
      style="animation-delay: .7s" option-label="name" option-value="id" />
    <p class="font-20 q-mt-md" :class="firstRep ? 'reveal' : 'invisible'">Versus ( Compares to )</p>
    <q-select outlined v-model="secondRep" :options="options" label="Choose Rep" dark color="red"
      style="animation-delay: .7s" :class="firstRep ? 'reveal' : 'invisible'" option-label="name" option-value="id" />
    <q-btn color="red" label="Compare" class="full-width login-btn-animation q-mt-md"
      :class="firstRep && secondRep ? 'reveal' : 'invisible'" @click="matchup" :loading="loading" />
  </div>
  <div class="row q-gutter-md" v-else>
    <userCard :userStats="response.data.first_user" :userName="response.data.first_user.name" class="reveal"
      style="animation-delay: 0.7s" :settings="false" />
    <userCard :userStats="response.data.second_user" :userName="response.data.second_user.name" class="reveal"
      style="animation-delay: 1.4s" :settings="false" />
    <userCard :userStats="response.data.difference" userName="Difference" class="reveal" style="animation-delay: 1.7s"
      :settings="false" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import userCard from '../UserCard.vue'
import { useRepsStore } from 'src/stores/reps'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const repsStore = useRepsStore()

const options = computed(() => repsStore.allReps)
const firstRep = ref(null)
const secondRep = ref(null)
const selectStage = ref(true)
const loading = ref(false)
const response = ref({})
const matchup = async () => {
  loading.value = true
  response.value = await repsStore.matchup(firstRep.value.id, secondRep.value.id)
  if (response.value && response.value.status === 200) {
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'fetched!'
    })
    selectStage.value = false
  } else {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
  loading.value = false
}

onMounted(() => {
  repsStore.getAllReps()
})
</script>

<style lang="scss" scoped></style>
