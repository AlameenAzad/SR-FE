<template>
  <div class="row justify-center full-width">
    <div class="col-4">
      <div class="text-center">
        <p class="font-32">Ready to Score Big?</p>
        <p class="q-px-lg">Complete your registration now to turbocharge your experience and dive headfirst into the world
          of Sales Rank.
          Just like in your favorite games, where every piece of gear counts, your information is the key to
          unlocking a treasure trove of features.</p>
      </div>
      <div class="q-mt-xl q-px-xl">
        <q-card class="bordered-card-red bg-transparent q-pa-md">
          <p class="bordered-card-label">{{ currentForm.label }}</p>
          <q-card-section>
            <div class="text-center q-mb-xl" v-if="currentForm.withImage">
              <q-img class="border-square-cut" src="/icons/person.png" spinner-color="white"
                style="height: 140px; max-width: 150px" />
            </div>
            <div class="text-center row q-gutter-md q-my-lg" v-if="currentForm.factions">
              <div class="col">
                <q-img class="border-square-cut img-grey-hover-color cursor-pointer" src="/identity/closer.jpeg"
                  spinner-color="white" style="height: 140px; max-width: 150px"
                  :style="choice === 1 ? 'filter : grayscale(0)' : ''" @click="choice = 1" />
                <p class="q-mt-md q-mb-none">Closer</p>
              </div>
              <div class="col">
                <q-img class="border-square-cut img-grey-hover-color cursor-pointer" src="/identity/setter.png"
                  spinner-color="white" style="height: 140px; max-width: 150px"
                  :style="choice === 2 ? 'filter : grayscale(0)' : ''" @click="choice = 2" />
                <p class="q-mt-md q-mb-none">Setter</p>
              </div>
            </div>
            <q-input v-for="inputs in currentForm.inputs" :key="inputs.label" v-model="inputs.value" :label="inputs.label"
              lazy-rules color="red" dense dark :type="inputs.type" :class="inputs.classes" />
            <q-btn square :label="currentForm.last ? 'Submit' : 'Next'" :color="currentForm.last ? 'red' : 'yellow'"
              class="full-width q-mt-lg skew-btn animated-btn-hover q-py-sm"
              :class="currentForm.last ? 'animated-btn-hover-yellow' : 'animated-btn-hover-red text-black'"
              @click="currentForm.buttonMethod" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const choice = ref(null)
const currentForm = ref({})
const form = [
  {
    label: 'Profile',
    inputs: [
      {
        label: 'Full Name',
        classes: 'q-my-lg',
        type: 'text',
        value: ''
      },
      {
        label: 'Email Address',
        classes: 'q-my-lg',
        type: 'text',
        value: ''
      },
      {
        label: 'Password',
        classes: 'q-my-lg',
        type: 'password',
        value: ''
      },
      {
        label: 'Confirm Password',
        classes: 'q-my-lg',
        type: 'password',
        value: ''
      }
    ],
    buttonMethod: () => {
      currentForm.value = form[1]
    }
  },
  {
    label: 'Representation',
    withImage: true,
    inputs: [
      {
        label: 'Display Name',
        classes: 'q-my-lg',
        type: 'text',
        value: ''
      }
    ],
    buttonMethod: () => {
      currentForm.value = form[2]
    }
  },
  {
    label: 'Profile Type',
    withImage: false,
    factions: true,
    last: true,
    inputs: [
    ],
    buttonMethod: () => {
      router.push({ name: 'login' })
    }
  },
]


onMounted(() => {
  currentForm.value = form[0]
})

</script>

<style lang="scss">
.border-square-cut {
  clip-path: polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px);
}

.img-grey-hover-color {
  filter: grayscale(100%);
  transition: all 200ms ease-in-out;

  &:hover {
    filter: grayscale(0%);
    transition: all 200ms ease-in-out;
  }
}
</style>
