<template>
  <div class="q-mx-auto text-center q-mt-xl" v-if="!account">
    <q-spinner color="red" size="3em" />
  </div>
  <q-card v-else dark flat class="bg-page-color q-pa-sm" style="min-width: 50%;">
    <q-card-section v-if="clientSecret">
      <div class="q-mt-lg">
        <div class="text-white separator-with-button q-mb-md font-16">
          <q-btn color="red" label="Get Billing Portal" @click="getBillingPortal" :loading="loadingPortal" />
        </div>
        <q-input class="q-mt-xl" dark outlined bottom-slots v-model="text" label="Portal Link" readonly>
          <template v-slot:append>
            <q-btn round flat icon="fa-solid fa-copy" @click="copyToClipboard" />
          </template>
        </q-input>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none" v-if="clientSecret">
      <div class="q-mt-lg">
        <stripeTest :clientSecret="clientSecret" @paymentComplete="reset" />
      </div>
    </q-card-section>
    <q-card-section v-else>
      <q-banner class="bg-green text-black q-mt-lg">
        This user account already has a credit card added. Nothing to do here.
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAccountsStore } from 'src/stores/accounts'
import stripeTest from './stripetest.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const props = defineProps(['currentViewedUser'])
const accountsStore = useAccountsStore()
const loadingPortal = ref(false)
const text = ref('')
const account = ref(null)
const clientSecret = computed(() => account.value?.paymentMethods?.intent?.client_secret)

const getBillingPortal = async () => {
  loadingPortal.value = true
  const response = await accountsStore.getBillingPortalLink(props.currentViewedUser.id)
  text.value = response.url
  loadingPortal.value = false
}

const copyToClipboard = () => {
  if (!text.value) return
  navigator.clipboard.writeText(text.value)
  $q.notify({
    message: 'Link Copied to Clipboard',
    color: 'green-5',
    position: 'top-right',
  })
}

const reset = () => {
  account.value = null
  accountsStore.getAccountPaymentMethods(props.currentViewedUser.id).then(response => {
    account.value = response.account
  })
}

onMounted(() => {
  reset()
})
</script>

<style scoped>
/* Your component's styles go here */
</style>
