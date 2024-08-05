<template>
  <q-page padding class="flex-center flex full-width">
    <div class="full-width q-mb-xl">
      <div class="text-white separator-with-title q-my-lg font-16"><span>Closers</span></div>
    </div>
    <div class="row reverse no-wrap q-px-lg"
      style="min-width: 100vw; max-width:100vw; overflow-x: scroll; overflow-y: hidden;">
      <div class="col-2 flex flex-center">
        <q-btn outline size="40px" class="q-pa-lg rotate-135 add__button reveal" color="white"
          style="animation-delay: 0.2s">
          <q-icon class="rotate-45" name="add"
            @click="userDialog = true; revealNewCloser = false; addingRepType = 'Closer';" />
        </q-btn>
      </div>
      <div class="col-2 new-rep-card q-ml-xl " :class="revealNewCloser ? 'revealpls' : ''">
        <userCard :user-stats="cardStats" :user-name="newRep.name" />
      </div>
      <div v-for="(rep, index) in closers" :key="rep.email" class="col-2 q-mx-xl" :class="index < 6 ? 'reveal-left' : ''">
        <userCard :user-stats="cardStats" :user-name="rep.name" :rep-data="rep" :settings="true" />
      </div>
    </div>
    <div class="full-width q-my-xl">
      <div class="text-white separator-with-title q-my-lg font-16"><span>Setters</span></div>
    </div>
    <div class="row no-wrap reverse q-px-lg a-mt-xl"
      style="min-width: 100vw; max-width:100vw; overflow-x: scroll; overflow-y: hidden;">
      <div class="col-2 flex flex-center">
        <q-btn outline size="40px" class="q-pa-lg rotate-135 add__button reveal" color="white"
          style="animation-delay: 0.2s">
          <q-icon class="rotate-45" name="add"
            @click="userDialog = true; revealNewSetter = false; addingRepType = 'Setter';" />
        </q-btn>
      </div>
      <div class="col-2 new-rep-card q-ml-xl" :class="revealNewSetter ? 'revealpls' : ''">
        <userCard :user-stats="cardStats" :user-name="newRep.name" />
      </div>
      <div v-for="(rep, index) in setters" :key="rep.email" class="col-2 q-mx-xl" :class="index < 6 ? 'reveal-left' : ''">
        <userCard :user-stats="cardStats" :user-name="rep.name" :rep-data="rep" />
      </div>
    </div>
  </q-page>
  <q-dialog v-model="userDialog">
    <userCreation :currentViewedUser="{}" @user-added="revealNewRepFunc" :adding-type="addingRepType" />
  </q-dialog>
</template>

<script setup>
import userCard from 'components/reps/UserCard.vue'
import userCreation from 'components/reps/manage/Creation.vue'
import confetti from 'canvas-confetti'
import { ref, onMounted, computed } from 'vue'
import { useRepsStore } from 'src/stores/reps'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const repsStore = useRepsStore()
const newRep = ref({})
const cardStats = [
  {
    title: 'Cash',
    value: 1240000
  },
  {
    title: 'Cash Outbound',
    value: 11567
  },
  {
    title: 'Inbound Calls',
    value: 30
  },
  {
    title: 'Offers',
    value: 16
  },
  {
    title: 'Offer Outbound',
    value: 5
  },
  {
    title: 'Outbound Calls',
    value: 10
  },
  {
    title: 'Sales',
    value: 10
  },
  {
    title: 'Surveys',
    value: 10
  },
]
const revealNewCloser = ref(false)
const revealNewSetter = ref(false)
const addingRepType = ref(null)
const userDialog = ref(false)
const closers = computed(() => repsStore.closers)
const setters = computed(() => repsStore.setters)
let end

const frame = () => {
  const colors = ['#bb0000', '#ffffff']
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  })
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  })
  if (Date.now() < end) {
    requestAnimationFrame(frame)
  }
}
const revealNewRepFunc = (newRepAdded) => {
  getReps()
  newRep.value = newRepAdded
  userDialog.value = false
  if (addingRepType.value === 'Closer')
    revealNewCloser.value = true
  else
    revealNewSetter.value = true
  end = Date.now() + (5 * 1000)
  frame()
}

const getReps = async () => {
  try {
    await repsStore.getClosers()
    await repsStore.getSetters()
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'got All Reps!'
    })
  }
  catch (error) {
    $q.notify({
      color: 'red',
      textColor: 'white',
      icon: 'thumb_down',
      position: 'top-right',
      message: 'Something Went Wrong!'
    })
  }
}

onMounted(() => {
  getReps()
})

</script>

<style lang="scss" scoped></style>
