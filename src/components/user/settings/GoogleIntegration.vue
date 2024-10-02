<!-- <template>
    <div>
        <p>GCal Integration Demo</p>
        <button id="authorize_button" @click="handleAuthClick">Authorize</button>
        <button id="signout_button" @click="handleSignoutClick">Sign Out</button>

        <pre id="content" style="white-space: pre-wrap;"></pre>
    </div>
</template> -->
<template>
    <div>
        <q-banner class="text-black" :class="googleIntegrated == true ? 'bg-green ' : 'bg-yellow '">
            {{ googleIntegrated == true ? 'Google integration is enabled.' : 'Google integration is not enabled.' }}
        </q-banner>
        <q-btn v-if="!googleIntegrated" color="red" class="no-border-radius q-px-lg q-mt-md" label="Enable Google"
            @click="handleAuthClick()" />
    </div>
</template>
<script>
import { useAuthStore } from 'src/stores/auth'
const store = useAuthStore()
export default {
    data() {
        return {
            CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            API_KEY: 'AIzaSyAd9tx_J1eVG_tXTrsP1dPxrFYYdZxyhjc',
            DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
            SCOPES: 'https://www.googleapis.com/auth/calendar.readonly',
            tokenClient: null,
            gapiInited: false,
            gisInited: false,
        }
    },
    mounted() {
        this.checkParams()
        // Load external scripts
        this.loadScript('https://apis.google.com/js/api.js', this.gapiLoaded)
        this.loadScript('https://accounts.google.com/gsi/client', this.gisLoaded)
    },
    methods: {
        async checkParams() {
            // eslint-disable-next-line no-prototype-builtins
            if (this.$route.query.hasOwnProperty('code')) {
                let code = this.$route.query.code
                await store.integrateGoogle(code)
                this.$router.push(this.$route.path)
            }
        },
        // Dynamically load external scripts
        loadScript(src, callback) {
            const script = document.createElement('script')
            script.src = src
            script.async = true
            script.defer = true
            script.onload = callback
            document.head.appendChild(script)
        },

        gapiLoaded() {
            window.gapi.load('client', this.initializeGapiClient)
        },

        async initializeGapiClient() {
            await window.gapi.client.init({
                apiKey: this.API_KEY,
                discoveryDocs: [this.DISCOVERY_DOC],
            })
            this.gapiInited = true
        },

        gisLoaded() {
            this.tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: this.CLIENT_ID,
                scope: this.SCOPES,
                callback: '' // callback defined later
            })
            this.gisInited = true
        },

        handleAuthClick() {
            const clientId = this.CLIENT_ID
            const redirectUri = 'http://localhost:9000/settings/userSettings'
            const scope = 'https://www.googleapis.com/auth/calendar.readonly'
            const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&access_type=offline`

            window.location.href = url
        },

        handleSignoutClick() {
            const token = window.gapi.client.getToken()
            if (token !== null) {
                window.google.accounts.oauth2.revoke(token.access_token)
                window.gapi.client.setToken('')
                document.getElementById('content').innerText = ''
            }
        },

        async listUpcomingEvents() {
            let response
            try {
                const request = {
                    'calendarId': 'primary',
                    'timeMin': new Date().toISOString(),
                    'showDeleted': false,
                    'singleEvents': true,
                    'maxResults': 10,
                    'orderBy': 'startTime',
                }
                response = await window.gapi.client.calendar.events.list(request)
            } catch (err) {
                document.getElementById('content').innerText = err.message
                return
            }

            const events = response.result.items
            if (!events || events.length === 0) {
                document.getElementById('content').innerText = 'No events found.'
                return
            }
            const output = events.reduce(
                (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
                'Events:\n'
            )
            document.getElementById('content').innerText = output
        },
    },
    computed: {
        googleIntegrated() {
            return store.googleIntegrated
        }
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>
