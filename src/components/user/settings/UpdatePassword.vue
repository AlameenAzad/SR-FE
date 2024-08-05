<template>
  <q-btn outline color="yellow" class="text-black no-border-radius" label="Change Password"
    @click="changePasswordDialog = true" />
  <q-dialog v-model="changePasswordDialog" persistent ref="dialog">
    <q-card class="bg-page-color" style="min-width: 550px">
      <q-card-section>
        <div class="text-h6">Change your password</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form class="q-gutter-md q-mt-lg" ref="validatedForm">
          <q-input v-for="input in inputs" :key="input.label" v-model="input.value" :label="input.label" lazy-rules
            color="red" dense dark :type="input.type" :class="input.classes" :rules="input.rules"></q-input>
        </q-form>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat color="yellow" label="Cancel" @click="reset" />
        <q-btn color="red" label="Update Password" @click="updatePassword" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { rules } from 'src/helper/formRules'
import { useAuthStore } from 'src/stores/auth'
import { useQuasar } from 'quasar'
const $q = useQuasar()
const authStore = useAuthStore()
const changePasswordDialog = ref(false)
const validatedForm = ref(null)
const loading = ref(false)
const dialog = ref(null)

const inputs = ref([
  {
    label: 'Current Password',
    classes: 'q-my-md',
    type: 'password',
    key: 'current_password',
    value: '',
    rules: [rules.required]
  },
  {
    label: 'New Password',
    classes: 'q-my-md',
    type: 'password',
    key: 'password',
    value: '',
    rules: [rules.required]
  },
  {
    label: 'Confirm New Password',
    classes: 'q-my-md',
    type: 'password',
    key: 'password_confirmation',
    value: '',
    rules: [rules.required, () => inputs.value[1].value === inputs.value[2].value || 'Password confirmation and password are different.'
    ]
  },
])
const gatherData = () => inputs.value.reduce((obj, input) => {
  obj[input.key] = input.value
  return obj
}, {})

const reset = () => {
  dialog.value.hide()
  inputs.value.forEach(input => {
    input.value = ''
  })
}

const updatePassword = async () => {
  if (await validatedForm.value.validate(true)) {
    loading.value = true
    const data = gatherData()
    const response = await authStore.updateUserPassword(data)
    if (response && response.status === 200) {
      reset()
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'thumb_up',
        position: 'top-right',
        message: 'Password Updated!'
      })
    } else {
      $q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'thumb_down',
        position: 'top-right',
        message: response.response.data.message
      })
    }

    loading.value = false
  }
}

</script>

<style lang="scss" scoped></style>
