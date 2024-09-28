<script setup>
import { computed, onMounted } from 'vue'
import { gapi } from 'gapi-script'

import { useAuthStore } from 'src/stores/auth'
const authStore = useAuthStore()
const googleIntegrated = computed(() => authStore.googleIntegrated)
const initialScopes = 'https://www.googleapis.com/auth/calendar.readonly'
function googleLogin() {
    gapi.auth2.authorize({
        response_type: 'code', client_id: process.env.GOOGLE_CLIENT_ID,
        scope: initialScopes,
        prompt: 'select_account',
        // redirect_uri: 'http://localhost:9000',
        access_type: 'offline'
    }, onSuccess)
}
function onSuccess(res) {
    if (res.error) {
        return
    }
    // authStore.google = res
    // authStore.googleIntegrated = true
    console.log('google res', JSON.stringify(res))

    authStore.integrateGoogle(res)
}
onMounted(() => {
    gapi.load('client:auth2')
})
</script>

<template>
    <div>
        <q-banner class="text-black" :class="googleIntegrated == true ? 'bg-green ' : 'bg-yellow '">
            {{ googleIntegrated == true ? 'Google integration is enabled.' : 'Google integration is not enabled.' }}
        </q-banner>
        <q-btn v-if="!googleIntegrated" color="red" class="no-border-radius q-px-lg q-mt-md" label="Enable Google"
            @click="googleLogin()" />
    </div>
</template>

<style></style>
