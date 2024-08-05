<template>
  <div class="row justify-center full-width">
    <div class="col-3">
      <div class="text-center">
        <p class="font-48">Welcome!</p>
        <p>To finish setup and secure your app, please create the first user (root admin) by entering the necessary
          information below.</p>
      </div>
      <div class="q-mt-xl">
        <q-card class="bordered-card-red bg-transparent q-pa-md">
          <p class="bordered-card-label">{{ currentForm.label }}</p>
          <q-card-section>
            <q-form ref="formValidate">
              <q-select v-for="select in currentForm.selects" :key="select.label" v-model="select.value" color="red"
                :options="select.options" :label="select.label" dark @update:model-value="select.onSelect"
                :class="select.classes" />

              <q-input v-for="inputs in currentForm.inputs" :key="inputs.label" v-model="inputs.value"
                :label="inputs.label" lazy-rules color="red" dense dark :type="inputs.type" :class="inputs.classes"
                :rules="inputs.rules" hide-bottom-space>
                <template v-slot:append v-if="currentForm.bottomCard.active">
                  <q-btn round dense flat icon="add" @click="currentForm.bottomCard.addMethod(inputs.value)" />
                </template>
              </q-input>
            </q-form>

            <q-btn square :label="currentForm.last ? 'Submit' : 'Next'" :color="currentForm.last ? 'red' : 'yellow'"
              class="full-width q-mt-lg skew-btn animated-btn-hover q-py-sm"
              :class="currentForm.last ? 'animated-btn-hover-yellow' : 'animated-btn-hover-red text-black'"
              @click="currentForm.buttonMethod" :loading="loading" />

            <q-btn v-if="currentForm.backMethod" square label="back" color="grey" outline
              class="full-width q-mt-lg skew-btn q-py-sm" @click="currentForm.backMethod" />

          </q-card-section>
        </q-card>
        <q-card class="border-color-grey bg-transparent  q-mt-lg"
          v-if="currentForm.label && currentForm.bottomCard.active && currentForm.bottomCard.values.length">
          <p class="bordered-card-label">Reps</p>
          <q-card-section>
            <div class="row" v-for="(value, index) in currentForm.bottomCard.values" :key="value">
              <p class="q-mb-none q-mt-sm col">{{ value }}</p>
              <q-btn class="col-1" round dense flat icon="close" @click="currentForm.bottomCard.removeMethod(index)" />
            </div>
          </q-card-section>
        </q-card>
        <q-card class="border-color-red bg-red  q-mt-lg" v-if="errors">
          <q-card-section>
            <p class="q-mb-none q-mt-sm col">Oopps... Some errors happened</p>
            <!-- <p class="q-mb-none q-mt-sm col">Main message: {{ errors.message }}</p> -->
            <div class="row" v-for="error in errors.errors" :key="error[0]">
              <p class="q-mb-none q-mt-sm col">{{ error[0] }}</p>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="border-color-red bg-positive  q-mt-lg" v-if="success">
          <q-card-section>
            <p class="q-mb-none q-mt-sm col">{{ success.message }}</p>
            <p class="q-mb-none q-mt-sm col">You can follow the link to visit the tenant:</p>
            <a :href="success.redirect_to">{{ success.redirect_to }}</a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO: refactor this file
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
const $q = useQuasar()
// import { useRouter } from 'vue-router'
import axios from 'axios'
// const router = useRouter()
const currentForm = ref({})
const formValidate = ref(null)
let errors = ref(null)
let success = ref(null)
let loading = ref(false)
const rules = {
  required: (val) => !!val || 'Field is required.',
  email: (val) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRegex.test(val) ? true : 'Invalid Email Address.'
  },
  noSpace: (val) => {
    const noSpaceRegex = /^\S*$/
    return noSpaceRegex.test(val) ? true : 'No spaces allowed.'
  }
}
const form = [
  {
    label: 'validation',
    inputs: [
      {
        label: 'Admin validation',
        classes: 'q-my-lg',
        type: 'password',
        value: '',
        rules: [rules.required],
        key: 'pass_phrase'
      }
    ],
    bottomCard: {
      active: false,
    },
    buttonMethod: async () => {
      const valid = await formValidate.value.validate(true)
      if (valid) {
        currentForm.value = form[1]
      }
    }
  },
  {
    label: 'Register',
    last: true,
    inputs: [
      {
        label: 'Full Name',
        classes: 'q-my-lg',
        type: 'text',
        value: '',
        rules: [rules.required],
        key: 'name'
      },
      {
        label: 'Email Address',
        classes: 'q-my-lg',
        type: 'text',
        value: '',
        rules: [rules.required, rules.email],
        key: 'email'
      },
      {
        label: 'Password',
        classes: 'q-my-lg',
        type: 'password',
        value: '',
        rules: [rules.required],
        key: 'password'
      },
      {
        label: 'Tenant ( Sub-Domain Name )',
        classes: 'q-my-lg',
        type: 'text',
        value: '',
        rules: [rules.required, rules.noSpace],
        key: 'domain'
      },
    ],
    bottomCard: {
      active: false,
    },
    buttonMethod: async () => {
      const valid = await formValidate.value.validate(true)
      if (valid) {
        loading.value = true
        errors.value = null
        success.value = null
        // eslint-disable-next-line no-use-before-define
        const data = prepData()
        // eslint-disable-next-line no-use-before-define
        const formData = prepFormData(data)
        // eslint-disable-next-line no-use-before-define
        const response = await sendRequest(formData)
        loading.value = false
        if (response && response.data.status === 'success') {
          success.value = response.data
          $q.notify({
            color: 'positive',
            textColor: 'white',
            icon: 'thumb_up',
            position: 'top-right',
            message: response.data.message
          })
        }
      }
    },
    backMethod: async () => {
      currentForm.value = form[0]
    }
  },
  // {
  //   label: 'Add Reps Email',
  //   inputs: [
  //     {
  //       label: 'Email Address',
  //       classes: 'q-my-lg',
  //       type: 'text',
  //       value: ''
  //     },
  //   ],
  //   bottomCard: {
  //     active: true,
  //     key: 'reps_emails',
  //     values: [
  //     ],
  //     addMethod: (val) => {
  //       if (!!val && !currentForm.value.bottomCard.values.includes(val) && rules.email(val) === true) {
  //         currentForm.value.bottomCard.values.push(val)
  //       }
  //       currentForm.value.inputs[0].value = ''
  //     },
  //     removeMethod: (index) => {
  //       currentForm.value.bottomCard.values.splice(index, 1)
  //     }
  //   },
  //   buttonMethod: async () => {
  //     currentForm.value = form[3]
  //   },
  //   backMethod: async () => {
  //     currentForm.value = form[1]
  //   }
  // },
  // {
  //   label: 'Products',
  //   inputs: [
  //     {
  //       label: 'Product',
  //       classes: 'q-my-lg',
  //       type: 'text',
  //       value: ''
  //     },
  //   ],
  //   bottomCard: {
  //     active: true,
  //     key: 'products',
  //     values: [
  //     ],
  //     addMethod: (val) => {
  //       if (!!val && !currentForm.value.bottomCard.values.includes(val)) {
  //         currentForm.value.bottomCard.values.push(val)
  //       }
  //       currentForm.value.inputs[0].value = ''
  //     },
  //     removeMethod: (index) => {
  //       currentForm.value.bottomCard.values.splice(index, 1)
  //     }
  //   },
  //   buttonMethod: () => {
  //     currentForm.value = form[4]
  //   },
  //   backMethod: async () => {
  //     currentForm.value = form[2]
  //   }
  // },
  // {
  //   label: 'Niche & Pricing',
  //   inputs: [],
  //   selects: [
  //     {
  //       label: 'Niche',
  //       classes: 'q-my-lg',
  //       value: '',
  //       key: 'niche',
  //       options: [
  //         'B2B Software Sales',
  //         'Luxury Item Sales',
  //         'Subscription Box Sales',
  //         'Enterprise IT Solutions',
  //         'Green Energy Solutions Sales',
  //         'Medical Equipment Sales',
  //         'Event Planning Services',
  //         'Online Course Sales',
  //         'Real Estate Niche Sales',
  //         'Customized Promotional Products',
  //         'other'
  //       ],
  //       rules: [rules.required],
  //       onSelect: (val) => {
  //         const inputs = currentForm.value.inputs
  //         if (val === 'other') {
  //           inputs.push({
  //             label: 'Description',
  //             classes: 'q-my-lg',
  //             type: 'text',
  //             value: '',
  //             key: 'niche'
  //           })
  //         }
  //         else if (inputs.length) {
  //           inputs.splice(0, 1)
  //         }
  //       }
  //     },
  //     {
  //       label: 'Pricing',
  //       classes: 'q-my-lg',
  //       value: '',
  //       key: 'pricing',
  //       options: [
  //         'Flat Rate Pricing',
  //         'Tiered Pricing',
  //         'Pay-As-You-Go Pricing',
  //         'Freemium Pricing',
  //         'Subscription Pricing',
  //         'Dynamic Pricing',
  //         'Value-Based Pricing',
  //         'Bundle Pricing',
  //         'One-Time Purchase Pricing',
  //         'Usage-Based Pricing'
  //       ],
  //       rules: [rules.required],
  //       // eslint-disable-next-line arrow-body-style
  //       onSelect: () => { return },
  //     }
  //   ],
  //   bottomCard: {
  //     active: false
  //   },
  //   buttonMethod: async () => {
  //     const valid = await formValidate.value.validate(true)
  //     if (valid) {
  //       loading.value = true
  //       errors.value = null
  //       success.value = null
  //       // eslint-disable-next-line no-use-before-define
  //       const data = prepData()
  //       // eslint-disable-next-line no-use-before-define
  //       const formData = prepFormData(data)
  //       // eslint-disable-next-line no-use-before-define
  //       const response = await sendRequest(formData)
  //       loading.value = false
  //       if (response && response.data.status === 'success') {
  //         success.value = response.data
  //         $q.notify({
  //           color: 'positive',
  //           textColor: 'white',
  //           icon: 'thumb_up',
  //           position: 'top-right',
  //           message: response.data.message
  //         })
  //       }
  //     }
  //   },
  //   backMethod: async () => {
  //     currentForm.value = form[3]
  //   },
  //   last: true
  // }
]
const prepData = () => {
  const data = {}
  form.forEach(obj => {
    //If bottomCard Active
    if (obj.bottomCard.active) {
      const key = obj.bottomCard.key
      obj.bottomCard.values.forEach(value => {
        data[key] ? data[key].push(value) : data[key] = [value]
      })
    }
    else {
      //Foreach Input
      obj.inputs.forEach(input => {
        data[input.key] = input.value
        if (input.key === 'password')
          data.password_confirmation = input.value
      })
      //Foreach Selects
      if (obj.selects)
        obj.selects.forEach(select => {
          //skip getting from select if 'Other' is chosen
          if (select.value === 'other')
            return
          data[select.key] = select.value
        })
    }
  })
  return data
}

const prepFormData = (data) => {
  // Create a FormData instance
  const formDataInstance = new FormData()

  // Append form data properties to FormData
  for (const key in data) {
    if (Array.isArray(data[key])) {
      data[key].forEach((value, index) => {
        formDataInstance.append(`${key}[${index}]`, value)
      })
    } else {
      formDataInstance.append(key, data[key])
    }
  }
  return formDataInstance
}

const sendRequest = async (formData) => axios.post('http://salesrank.io/api/gf7aqvc8ek/register-tenant', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}).then(res => res).catch((e) => {
  errors.value = e.response.data
  $q.notify({
    color: 'red',
    textColor: 'white',
    icon: 'warning',
    position: 'top-right',
    message: e.response.data.message
  })
})


onMounted(() => {
  currentForm.value = form[0]
})

</script>

<style lang="scss" scoped></style>
