<template>
  <q-card dark flat class="bg-page-color q-pa-md" style="min-width: 50%;">
    <q-card-section>
      <q-form ref="validatedForm">
        <q-input v-for="input in currentForm.inputs" :key="input.label" v-model="input.value" :label="input.label"
          lazy-rules="ondemand" color="red" dense dark :type="input.type" :class="input.classes"
          :rules="input.rules"></q-input>
        <q-select v-for="select in currentForm.selects" :key="select.label" v-model="select.value" color="red"
          :options="select.options" :label="select.label" dark :class="select.classes" dense
          :option-label="select.optionLabel ? select.optionLabel : ''"
          :option-value="select.optionValue ? select.optionValue : ''" :rules="select.rules" lazy-rules="ondemand" />
      </q-form>
    </q-card-section>
    <q-card-section>
      <div class="row">
        <div class="col-6 q-pr-md" v-if="Object.keys(props.currentViewedUser).length">
          <q-btn v-close-popup label="delete" color="grey" outline class="full-width" />
        </div>
        <div class="" :class="Object.keys(props.currentViewedUser).length ? 'col-6' : 'col-12'">
          <q-btn label="Save" color="red" class="full-width" @click="createOrEditRep" :loading="loading" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRepsStore } from 'src/stores/reps'
import { useQuasar } from 'quasar'
import { rules } from 'src/helper/formRules'
const repsStore = useRepsStore()
const $q = useQuasar()
const validatedForm = ref(null)
const currentForm = ref({})
const props = defineProps(['currentViewedUser', 'addingType'])
const emit = defineEmits(['userAdded'])
const loading = ref(false)
const editing = ref(false)
const repTypes = computed(() => repsStore.repTypes)
const inputs = [
  {
    name: 'name',
    label: 'Full Name',
    classes: 'q-my-lg',
    type: 'text',
    value: '',
    rules: [rules.required]
  },
  {
    name: 'email',
    label: 'Email Address',
    classes: 'q-my-lg',
    type: 'text',
    value: '',
    rules: [rules.required, rules.email]
  },
]
const selects = []
const userRole = {
  label: 'User Role',
  classes: 'q-my-lg',
  value: '',
  options: ['Manager', 'Rep'],
  rules: [rules.required],
}
const userTypes = {
  label: 'User Type',
  classes: 'q-my-lg',
  value: '',
  options: computed(() => repsStore.repTypes),
  rules: [rules.required],
  optionLabel: 'name',
  optionValue: 'id',
}

const createOrEditRep = async () => {
  if (await validatedForm.value.validate(true)) {
    loading.value = true
    const data = {
      name: inputs[0].value,
      email: inputs[1].value
    }
    data.is_manager = userRole.value === 'manager' ? 1 : 0
    data.is_rep = userRole.value === 'rep' ? 1 : 0
    data.user_type = userTypes.value.id
    data.user_id = props.currentViewedUser.id

    let response
    try {
      if (editing.value)
        response = await repsStore.updateRep(data)
      else
        response = await repsStore.addRep(data)
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'thumb_up',
        position: 'top-right',
        message: 'Rep Added!'
      })
      loading.value = false
      emit('userAdded', response.data.data || response.data.user)
    }
    catch (error) {
      loading.value = false
      $q.notify({
        color: 'red',
        textColor: 'white',
        icon: 'thumb_down',
        position: 'top-right',
        message: 'Something Went Wrong!'
      })
    }
  }
}
onMounted(() => {
  currentForm.value.inputs = inputs
  currentForm.value.selects = selects
  if (Object.keys(props.currentViewedUser).length) {
    editing.value = true
    const { name, email } = props.currentViewedUser
    currentForm.value.inputs[0].value = name
    currentForm.value.inputs[1].value = email
  }
  repsStore.getRepTypes()
  currentForm.value.selects.push(userRole)
  currentForm.value.selects.push(userTypes)
  if (props.addingType && props.addingType.length) {
    const type = repTypes.value.filter((type) => type.name === props.addingType)
    userTypes.value = type[0]
  }

})
</script>

<style lang="scss" scoped></style>
