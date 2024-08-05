<template>
  <OverlayScrollbarsComponent defer :options="scrollbarOptions" style="min-height: calc(100vh - 180px);">
    <div class="card-scene">
      <Container orientation="horizontal" @drop="onColumnDrop($event)" drag-handle-selector=".column-drag-handle"
        @drag-start="dragStart" :drop-placeholder="upperDropPlaceholderOptions">
        <Draggable v-for="column in scene.children" :key="column.id">
          <div :class="column.props.className">
            <div class="card-column-header">
              <span class="column-drag-handle">&#x2630;</span>
              {{ column.name }}
            </div>
            <Container group-name="col" @drop="(e) => onCardDrop(column.id, e)"
              @drag-start="(e) => log('drag start', e)" @drag-end="(e) => log('drag end', e)"
              :get-child-payload="getCardPayload(column.id)" drag-class="card-ghost" drop-class="card-ghost-drop"
              :drop-placeholder="dropPlaceholderOptions">
              <Draggable v-for="card in column.children" :key="card.id">
                <div class="cursor-pointer" :class="card.props.className" :style="card.props.style"
                  @click="showCardDetails(card)">
                  <p>{{ card.data }} <span v-if="card.invitees">- {{ card.invitees.name }}</span></p>
                </div>
              </Draggable>
            </Container>
          </div>
        </Draggable>
      </Container>
    </div>
  </OverlayScrollbarsComponent>
  <q-dialog v-model="viewTicket">
    <q-card dark flat class="bg-page-color" style="min-width: 1050px;">
      <div class="q-px-lg q-py-md">
        <q-timeline color="secondary" v-if="viewedTicketData.steps">
          <q-timeline-entry heading>
            {{ viewedTicketData.data }}
          </q-timeline-entry>
          <q-timeline-entry v-for="step in viewedTicketData.steps" :key="step.key" :title="step.key" color="yellow">
            <div>
              {{ step.value }}
            </div>
          </q-timeline-entry>
        </q-timeline>
        <q-card dark flat class="bg-page-color q-pa-md" v-else>
          <q-card-section>
            <div class="text-h6">Name: {{ viewedTicketData.card.invitees.name }}</div>
            <div>Email: {{ viewedTicketData.card.invitees.email }}</div>
            <div>Status: {{ viewedTicketData.card.invitees.status }}</div>
            <div>Timezone: {{ viewedTicketData.card.invitees.timezone }}</div>
          </q-card-section>
          <q-card-section>
            <q-btn label="Join Meeting" color="primary" />
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted } from 'vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag, generateItems } from './utils'
import { useDashboardStore } from 'src/stores/dashboard'
import { useAuthStore } from 'src/stores/auth'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'

const dashboardStore = useDashboardStore()
const authStore = useAuthStore()

const columnNames = ['Unlogged', 'No Show', 'Second Call Booked', 'Lost', 'Second Call Booked [ Offered ]', 'Won']

const scrollbarOptions = {
  scrollbars: {
    theme: 'os-theme-dark',
    autoHide: 'scroll'
  },
}

export default {
  name: 'Cards',
  components: { Container, Draggable, OverlayScrollbarsComponent },

  data() {
    return {
      scrollbarOptions,
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true
      },
      columnNames,
      viewTicket: false,
      viewedTicketData: {}
    }
  },

  computed: {
    scene() {
      return {
        type: 'container',
        props: {
          orientation: 'horizontal'
        },
        children: generateItems(this.columnNames.length, i => ({
          id: `column${i}`,
          type: 'container',
          name: this.columnNames[i],
          props: {
            orientation: 'vertical',
            className: 'card-container'
          },
          children: dashboardStore.logCards(this.columnNames[i])
        }))
      }
    }
  },

  methods: {
    onColumnDrop(dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },

    onCardDrop(columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)

        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)

        this.scene = scene
      }
    },

    getCardPayload(columnId) {
      return index => this.scene.children.filter(p => p.id === columnId)[0].children[index]
    },

    dragStart() {
      console.log('drag started')
    },

    log(...params) {
      console.log(...params)
    },
    async showCardDetails(card) {
      this.viewedTicketData = {}
      console.log('card', card)
      if (card.log === undefined) {
        const invitees = await authStore.getCalendlyEventInvitees(card.event.uri.split('/').pop())
        card.invitees = invitees.data.data.collection[0]
        console.log('🚀 ~ showCardDetails ~ invitees:', invitees)
        this.viewedTicketData.card = card
      }
      else {
        const steps = []
        const allowed = ['log_type', 'call_type', 'call_sequence', 'call_result', 'offer_result']
        for (let key in card.log) {
          if (allowed.includes(key)) {
            steps.push({ key: key.replaceAll('_', ' '), value: card.log[key] })
          }
          if (key === 'account_id') {
            steps.push({ key: 'Account', value: 'Won' })
          }
          if (key === 'pricing_plan') {
            steps.push({ key: `Pricing Plan - ${card.log[key].name}`, value: card.log[key].amount })
          }
        }
        console.log('🚀 ~ showCardDetails ~ steps:', steps)
        this.viewedTicketData = card
        this.viewedTicketData.steps = steps
      }
      this.viewTicket = true
    }
  },
  // Use the setup function to include onMounted hook
  setup() {
    onMounted(() => {
      dashboardStore.getLogs()
      dashboardStore.getUnloggedEvents()
    })

    // You must return an object from the setup function
    return {}
  }
}
</script>
<style>
.card-scene {
  padding-left: 10px;
}

.card-container {
  width: 20vw;
  padding: 10px;
  margin: 5px;
  margin-right: 10px;
  background-color: #121212;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
}

.card {
  margin: 5px;
  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  padding: 10px;
}

.card-column-header {
  font-size: 18px;
}

.column-drag-handle {
  cursor: move;
  padding: 5px;
}

.card-ghost {
  transition: transform 0.18s ease;
  transform: rotateZ(5deg)
}

.card-ghost-drop {
  transition: transform 0.18s ease-in-out;
  transform: rotateZ(0deg)
}

.opacity-ghost {
  transition: all .18s ease;
  opacity: 0.8;
  background-color: cornflowerblue;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.3);
}

.opacity-ghost-drop {
  opacity: 1;
  background-color: white;
  box-shadow: 3px 3px 10px 3px rgba(0, 0, 0, 0.0);
}

.drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px;
}

.cards-drop-preview {
  background-color: rgba(150, 150, 200, 0.1);
  border: 1px dashed #abc;
  margin: 5px 45px 5px 5px;
}
</style>
