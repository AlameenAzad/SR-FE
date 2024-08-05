<template>
  <div>
    <q-card dark flat class="bg-page-color" style="min-width: 550px;">
      <q-card-section>
        <div class="col-6 q-mb-xl">
          <div class="text-white separator-with-title q-mb-md font-16"><span>Add Credit Card Details</span></div>
        </div>
        <div id="card-element"></div>

        <q-btn class="full-width cut-with-hover-button q-py-sm q-mt-lg no-border-radius" color="red" @click="saveCard"
          :loading="loading">Save
          Payment Information</q-btn>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref, } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const emit = defineEmits(['paymentComplete'])
const props = defineProps(['clientSecret', 'accountId'])
const authStore = useAuthStore()

let stripe, elements, cardElement
const loading = ref(false)
const saveCard = async () => {
  loading.value = true
  // Create a PaymentMethod using the card element and the billing details
  const result = await stripe.confirmCardSetup(props.clientSecret, {
    payment_method: {
      card: cardElement
    }
  })
  console.log('🚀 ~ saveCard ~ result:', result)

  if (result.error) {
    loading.value = false

  } else {
    loading.value = false
    emit('paymentComplete', props.accountId)
    // Send paymentMethod.id to your server (see Step 3)
  }
}

onMounted(() => {
  stripe = window.Stripe('pk_test_51OhYUSHqXzgWrptJ8ZntmfCUyaZOB2xBN183tFOEa9bmL0rI56QVF1UZaGs5rwfNTr3bHvaLVkkVaJVpitgCSSQ500YKMmkOt1',
    {
      stripeAccount: authStore.stripe?.stripe_account_id
    })

  elements = stripe.elements()
  cardElement = elements.create('card')

  cardElement.mount('#card-element')
})
</script>

<style scoped>
.StripeElement {
  display: block;
  margin: 10px 0 20px 0;
  background-color: #fefefe;
  padding: 10px 14px;
  font-size: 1em;
  font-family: "Source Code Pro", monospace;
  border-bottom: 2px solid transparent;
  outline: 0;
}

.StripeElement--focus {
  border-bottom: 2px solid #D40403;
  -webkit-transition: all 150ms ease;
  transition: all 150ms ease;
}


.StripeElement.IdealBankElement,
.StripeElement.FpxBankElement,
.StripeElement.PaymentRequestButton {
  padding: 0;
}
</style>
