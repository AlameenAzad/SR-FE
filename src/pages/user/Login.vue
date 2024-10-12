<template>
  <q-page padding class="flex flex-center">
    <div class="full-width">
      <div class="row justify-center">
        <div class="col-md-3">
          <q-form @submit.prevent.stop="onSubmit"
            class="text-white q-px-xl q-py-md border-red-neon-3 relative-position bg-page-color" ref="formValidate">
            <q-img src="/identity/logo.png" class="form-logo" />
            <br />
            <br />
            <br />
            <p class="text-uppercase text-center font-24 q-my-xl">Login</p>
            <div class="row q-col-gutter-md">
              <div class="col-12">
                <q-input v-model="email" label="E-mail" lazy-rules color="red" dense dark :rules="[rules.email]" />
              </div>
              <div class="col-12">
                <q-input :type="showPassword == true ? 'text' : 'password'" v-model="password" label="Password" color="red"
                  lazy-rules dense dark :rules="[rules.required]">
                  <template v-slot:append>
                    <q-icon :name="showPassword == true ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'" size="xs"
                      @click="showPassword = !showPassword" class="cursor-pointer"></q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 justify-end">
                <q-btn square label="Sign in" color="red"
                  class="full-width q-mt-lg skew-btn animated-btn-hover animated-btn-hover-yellow q-py-sm" type="submit"
                  :loading="loading" />
                <q-btn square label="Forgot Password" color="white" class="full-width q-mt-sm skew-btn" flat />
              </div>
            </div>
          </q-form>
          <q-card class="border-color-red bg-red  q-mt-lg" v-if="errors.length">
            <q-card-section>
              <p class="q-mb-none q-mt-sm col">Oopps...</p>
              <div class="row" v-for="error in errors" :key="error[0]">
                <p class="q-mb-none q-mt-sm col">{{ error }}</p>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from 'stores/auth'
import { rules } from 'src/helper/formRules'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const showPassword = ref(false)
let email = ref('')
let password = ref('')
if (process.env.DEV) {
  email = ref('david@salesrank.io')
  password = ref('Password123@')
}
const loading = ref(false)
const errors = ref([])
const formValidate = ref(null)

async function onSubmit() {
  const valid = await formValidate.value.validate(true)
  errors.value = []
  if (valid) {
    loading.value = true
    const response = await authStore.login(email.value, password.value)
    if (response && response.status === 400) {
      loading.value = false
      errors.value.push(response.data.message)
    } else {
      const firstLogin = computed(() => authStore.firstLogin)
      if (firstLogin.value)
        router.push({ name: 'Edit Account' })
      else
        router.push({ name: 'sales' })
    }
  }
}
</script>

<style lang="scss"></style>
