<template>
  <div class="row justify-center">
    <div class="col-3 text-center">
      <div>
        <q-img src="/icons/person.png" spinner-color="white" class="profile-img" />
      </div>
      <div class="q-mt-md">
        <q-btn flat color="yellow" label="Change Image" />
      </div>
      <div class="q-mt-md">
        <changePassword />
      </div>
      <!-- <div class="q-mt-md">
        <q-btn color="red" class="no-border-radius q-px-lg" label="Delete Account" />
      </div> -->
    </div>
    <div class="col-9">
      <div class="text-white separator-with-title q-my-lg font-16"><span>Profile Information</span></div>
      <q-form class="q-gutter-md q-mt-lg" ref="validatedForm">
        <q-input v-for="input in inputs" :key="input.label" v-model="input.value" :label="input.label" color="red" dense
          dark :type="input.type" :class="input.classes" :rules="input.rules"></q-input>
        <q-btn color="red" class="no-border-radius q-px-lg float-right" label="Save Changes" @click="updateUser"
          :loading="loading" />
      </q-form>
    </div>
    <div class="offset-3 col-9 q-mt-lg">
      <div class="text-white separator-with-title q-my-lg font-16"><span>Calendly Integration</span></div>
      <div class="q-py-md q-gutter-sm" v-if="!calendlyIntegrated">
        <q-banner class="bg-yellow text-black">
          Calendly integration is not enabled. You need to integrate Calendly from the Dashboard - Sales page.
        </q-banner>
      </div>
      <div v-else>
        <q-select v-model="selectedEventType" color="red" :options="calendlyEventTypes" label="Select Event Types" dark
          class="q-mt-xl q-mb-lg" dense option-label="name" option-value="uri" lazy-rules="ondemand"
          @update:model-value="saveEventType" />
      </div>
    </div>
    <div class="offset-3 col-9 q-mt-lg" v-if="isManager">
      <div class="text-white separator-with-title q-my-lg font-16"><span>Stripe Integration</span></div>
      <div class="q-py-md q-gutter-sm" v-if="!stripe.enabled">
        <q-banner class="bg-yellow text-black">
          Stripe integration is not enabled. Your staff will not be able to make payments.
        </q-banner>
        <q-btn color="red" class="no-border-radius q-px-lg q-mt-md" label="Enable Stripe" :href="stripe.oauth_url"
          target="_blank" />
      </div>
      <div v-else>
        <q-banner class="bg-green text-black">
          Stripe integration is enabled. Your staff will be able to make payments.
        </q-banner>
      </div>
    </div>
    <q-dialog v-model="showFirstLogin">
      <q-stepper v-model="stepNumber" vertical color="red" dark animated
        class="bg-pagecolor q-pa-md shadow-0 border-red-neon-1">
        <q-step v-for="(step, index) in steps" :key="step.title" color="yellow" :name="index" :title="step.title"
          icon="settings" :done="step > 1">
          {{ step.description }}
          <q-stepper-navigation>
            <q-btn v-if="stepNumber < 3" @click="stepNumber = (index + 1)" color="red" label="Continue" />
            <q-btn v-else @click="showDialog = false" color="red" label="Got it!" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { rules } from 'src/helper/formRules'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'
import changePassword from './UpdatePassword.vue'
import { useRoute } from 'vue-router'

const $q = useQuasar()
const authStore = useAuthStore()
const username = ref(authStore.user.name)
const userEmail = ref(authStore.user.email)
const validatedForm = ref(null)
const loading = ref(false)
const firstLogin = computed(() => authStore.firstLogin)
const stripe = computed(() => authStore.stripe)
const calendlyIntegrated = computed(() => authStore.calendlyIntegrated)
const calendlyEventTypes = ref([])
const selectedEventType = ref(null)
const showDialog = ref(true)
const showFirstLogin = ref(firstLogin.value && showDialog)
const stepNumber = ref(0)
const isManager = ref(authStore.user.is_manager)
const steps = [
  {
    title: 'Level Up Your Alias',
    description: 'Choose an epic username that befits a legendary adventurer on this digital quest!'
  },
  {
    title: 'Epic Email Evolution',
    description: 'Transform your email into a treasure map leading to secret loot in the realm of the internet.'
  },
  {
    title: 'Forge a Fortified Password',
    description: 'Craft a password shield that\'s as strong as dragon scales to protect your account!'
  },
  {
    title: 'Avatar Alchemy',
    description: 'Summon the spirit of creativity to craft a magical avatar that represents your gaming prowess!'
  },
]

const inputs = ref([
  {
    label: 'Name',
    classes: 'q-my-xl',
    type: 'text',
    value: username,
    rules: [rules.required]
  },
  {
    label: 'Email',
    classes: 'q-mt-xl',
    type: 'text',
    value: userEmail,
    rules: [rules.required, rules.email]
  },
])

const updateUser = async () => {
  if (await validatedForm.value.validate(true)) {
    const response = await authStore.updateUserInformation(inputs.value[0].value, inputs.value[1].value)
    if (response && response.status === 200) {
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'thumb_up',
        position: 'top-right',
        message: 'Profile Updated!'
      })
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
}

const getEventTypes = async () => {
  const response = await authStore.getCalendlyEventTypes()
  if (response && response.status === 200) {
    const { collection } = response.data.data
    calendlyEventTypes.value = collection.map((item) => ({
      name: item.name,
      uri: item.uri
    }))
    if (authStore.calendlyIntegrated && authStore.calendly.eventType.length > 0) {
      const selectedUri = authStore.calendly.eventType[authStore.calendly.eventType.length - 1].uri
      calendlyEventTypes.value.forEach((item) => {
        if (item.uri === selectedUri) {
          selectedEventType.value = item
        }
      })
    }
  }
}

const saveEventType = async () => {
  const response = await authStore.saveCalendlyEventType({ uri: selectedEventType.value.uri })
  if (response && response.status === 200) {
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'thumb_up',
      position: 'top-right',
      message: 'Event Type Saved!'
    })
  } else {
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
  const { query } = useRoute()
  if (query.stripe) {
    authStore.checkStripeIntegration()
  }
  if (calendlyIntegrated.value) {
    getEventTypes()
  }
})

</script>

<style lang="scss" scoped>
.profile-img {
  height: 140px;
  max-width: 150px;
}
</style>
