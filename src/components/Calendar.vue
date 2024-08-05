<template>
  <div>
    <q-btn outline class="full-width date-btn q-pa-md" text-color="white">
      <q-popup-proxy transition-show="scale" transition-hide="scale">
        <q-date v-model="formattedDate" dark color="yellow" text-color="black">
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="yellow" flat />
          </div>
        </q-date>
      </q-popup-proxy>
      {{ currentMonthName }} {{ currentYear }} <span>{{ currentDayName }}, {{ currentDayNumber }} <q-icon size='xs'
          name="fa-solid fa-calendar-days" class="q-ml-sm" /></span>
    </q-btn>
    <div>
      <OverlayScrollbarsComponent defer :options="scrollbarOptions"
        class="q-mt-lg q-pa-md border-color-grey meetings-card">
        <p class="font-16">Upcoming Schedule</p>
        <div v-if="calendlyIntegrated">
          <div v-for="schedule in schedules" :key="schedule.date">
            <p class="opacity-60 q-mb-lg">{{ schedule.date }}</p>
            <div class="row q-gutter-sm q-mb-lg selected-meeting" v-for="(meeting, index) in schedule.meetings"
              :class="selectedMeeting?.id === meeting.id ? 'selected-meeting-clicked' : ''" :key="meeting.uri"
              @click="selectMeeting(meeting)" @mouseenter="meetingData = meeting.id">

              <div class="col-2">{{ meeting.startTime }}</div>
              <div class="col-9 q-pl-md" :class="index % 2 == 0 ? 'meeting-border-important' : 'meeting-border-normal'">
                <p class="q-mb-none">{{ meeting.name }}</p>
                <p class="q-mb-none opacity-80">{{ meeting.invitees.name }}</p>
              </div>
              <q-tooltip anchor="center right" :offset="[30, 20]" self="center left" class="bg-black">
                <div v-if="meetingData == meeting.id && meeting.invitees">
                  <p class="font-16">{{ meeting.invitees.name }}</p>
                  <p class="font-14"><strong>Email:</strong> {{ meeting.invitees.email }}</p>
                  <p class="font-14"><strong>Timezone:</strong> {{ meeting.invitees.timezone }}</p>
                  <p class="font-14"><strong>Status:</strong> {{ meeting.invitees.status }}</p>
                  <p class="font-14"><strong>Rescheduled:</strong> {{ meeting.invitees.rescheduled }}</p>
                  <!-- Add more fields as needed -->
                  <p class="font-16">Questions and Answers:</p>
                  <ul>
                    <li v-for="qa in meeting.invitees.questions_and_answers" :key="qa.question" class="font-14">
                      <strong>{{ qa.question }}</strong>:
                      <br />
                      {{ qa.answer }}
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p class="font-16">Loading meeting data...</p>
                </div>
              </q-tooltip>
            </div>
          </div>
        </div>
        <div v-else>
          <q-btn @click="integrateCalendly" label="Integrate with Calendly" color="yellow" class="text-black" />
        </div>
      </OverlayScrollbarsComponent>
    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
import { useAuthStore } from 'src/stores/auth'
import { useDashboardStore } from 'src/stores/dashboard'
import { date } from 'quasar'

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const scrollbarOptions = {
  scrollbars: {
    theme: 'os-theme-dark',
    autoHide: 'scroll'
  },
}
const schedules = ref([])
const calendlyIntegrated = authStore.calendlyIntegrated
const selectedMeeting = ref(null)
const meetingData = ref(null)
// button and calendar date format
const currentDate = new Date()
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const currentMonthNumber = ref(currentDate.getMonth() + 1)
const currentMonthName = ref(monthNames[currentDate.getMonth()])
const currentDayName = ref(dayNames[currentDate.getDay()])
const currentDayNumber = ref(currentDate.getDate())
const currentYear = ref(currentDate.getFullYear())
const formattedDate = ref(`${currentYear.value}/${currentMonthNumber.value < 10 ? '0' + currentMonthNumber.value : currentMonthNumber}/${currentDayNumber.value}`)

watch(formattedDate, (newFormattedDate) => {
  const dateParts = newFormattedDate.split('/')
  currentYear.value = parseInt(dateParts[0])
  currentMonthNumber.value = parseInt(dateParts[1])
  currentDayNumber.value = parseInt(dateParts[2])
  currentMonthName.value = monthNames[currentMonthNumber.value - 1]
  currentDayName.value = dayNames[new Date(newFormattedDate).getDay()]
  if (calendlyIntegrated) {
    getSchedules(newFormattedDate)
  }
})
// End button and calendar date format


const integrateCalendly = () => {
  const CLIENT_ID = process.env.CALENDLY_CLIENT_ID
  const CALENDLY_REDIRECT_URI = process.env.CALENDLY_REDIRECT_URI
  window.open(`https://auth.calendly.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${CALENDLY_REDIRECT_URI}`, '_blank')
}

const getSchedules = async (currentDate) => {
  const scheduleDate = new Date(currentDate)
  scheduleDate.setHours(0, 0, 0, 0)
  const nextDayDate = date.addToDate(scheduleDate, { day: 1 })
  nextDayDate.setHours(0, 0, 0, 0)
  const params = {
    from_date: date.formatDate(scheduleDate, 'YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]'),
    to_date: date.formatDate(nextDayDate, 'YYYY-MM-DDTHH:mm:ss.SSSSSS[Z]'),
    count: 100,
    status: 'active'
  }
  const response = await dashboardStore.getCalendlySchedules(params)
  console.log('🚀 ~ getSchedules ~ response:', response)
  if (response.status === 400) {
    await dashboardStore.refreshCalendlyToken()
    getSchedules()
  } else {
    let events = response.data?.collection
    if (events === undefined) events = response
    groupEventsByStartDate(events).then(groupedEvents => {
      schedules.value = groupedEvents
    })
  }
}

const groupEventsByStartDate = async (events) => {
  const groupedEvents = {}
  for (const event of events) {
    console.log('🚀 ~ groupEventsByStartDate ~ event:', event)
    const startDate = date.formatDate(event.start_time, 'MMM DD, YYYY')
    if (!groupedEvents[startDate]) {
      groupedEvents[startDate] = []
    }
    // Creating a new object with selected attributes
    const invitees = await getInvitees(event) // Assuming getInvitees is your async function
    const simplifiedEvent = {
      startTime: date.formatDate(event.start_time, 'HH:mm'),
      endTime: date.formatDate(event.end_time, 'HH:mm'),
      eventGuests: event.event_guests,
      eventMemberships: event.event_memberships,
      name: event.name,
      uri: event.uri,
      id: event.calendar_event.external_id,
      orgStartTime: event.start_time,
      orgEndTime: event.end_time,
      invitees: invitees // Saving the response from getInvitees
    }
    groupedEvents[startDate].push(simplifiedEvent)
  }
  return Object.keys(groupedEvents).map(date => ({ date, meetings: groupedEvents[date] }))
}

const selectMeeting = (meeting) => {
  selectedMeeting.value = meeting
  dashboardStore.selectedMeeting = meeting
  console.log(meeting)
}

const getInvitees = async (meeting) => {
  // meetingData.value = null
  const response = await authStore.getCalendlyEventInvitees(meeting.uri.split('/').pop())
  console.log('🚀 ~ getInvitees ~ response:', response)
  if (response && response.status === 200) {
    return response.data.data.collection[0]
  }
  return null
}

onMounted(() => {
  if (authStore.calendlyIntegrated) {
    getSchedules(new Date())
    dashboardStore.selectedMeeting = null
  }
})
</script>

<style lang="scss">
.meeting-border-important {
  border-left: 1px solid $red;
}

.meeting-border-normal {
  border-left: 1px solid $yellow;
}

.meetings-card {
  max-height: 68vh;
  // overflow: scroll;
}

.selected-meeting {
  position: relative;
  cursor: pointer;
}

.selected-meeting:before {
  content: "";
  position: absolute;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  top: calc(2px/-1);
  left: calc(2px/-1);
  background: linear-gradient(to right, yellow 0%, yellow 100%), linear-gradient(to top, yellow 50%, transparent 50%), linear-gradient(to top, yellow 50%, transparent 50%), linear-gradient(to right, yellow 0%, yellow 100%), linear-gradient(to left, yellow 0%, yellow 100%);
  background-size: 100% 2px, 2px 200%, 2px 200%, 0% 2px, 0% 2px;
  background-position: 50% 100%, 0% 0%, 100% 0%, 100% 0%, 0% 0%;
  background-repeat: no-repeat, no-repeat;
  transition: transform 0.3s ease-in-out, background-position 0.3s ease-in-out, background-size 0.3s ease-in-out;
  transform: scaleX(0) rotate(0deg);
  transition-delay: 0.6s, 0.3s, 0s;
}

.selected-meeting-clicked:before {
  background-size: 200% 2px, 2px 400%, 2px 400%, 55% 2px, 55% 2px;
  background-position: 50% 100%, 0% 100%, 100% 100%, 100% 0%, 0% 0%;
  transform: scaleX(1) rotate(0deg);
  transition-delay: 0s, 0.3s, 0.6s;
}
</style>
